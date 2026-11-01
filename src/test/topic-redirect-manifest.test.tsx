import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { readFileSync } from 'node:fs';
import { topicRedirects, isTopicRedirectFile } from '../data/topicRedirects';
import { TOPIC_ROUTES } from '../routes/topicRoutes';
const navigation = vi.hoisted(() => vi.fn());
vi.mock('react-router-dom', async importOriginal => ({ ...await importOriginal<typeof import('react-router-dom')>(), Navigate: (props: unknown) => { navigation(props); return null; } }));
const wrappers = import.meta.glob<{ default: React.ComponentType }>('../pages/topics/Icu*Topic.tsx', { eager: true });
afterEach(() => { cleanup(); navigation.mockClear(); });
describe('explicit legacy topic redirects', () => {
  for (const alias of topicRedirects) {
    it.each(['', '#custom'])(`${alias.file} replaces route, preserves query and hash %s`, hash => {
      const Component = wrappers[`../pages/topics/${alias.file}`]?.default;
      expect(Component, alias.file).toBeDefined(); if (!Component) throw new Error(`Missing ${alias.file}`);
      render(<MemoryRouter initialEntries={[`${alias.path}?query=kept${hash}`]}><Component /></MemoryRouter>);
      expect(navigation).toHaveBeenCalledWith(expect.objectContaining({ replace: true, to: `${alias.target}?query=kept${hash || `#${alias.anchor}`}` }));
    });
    it(`${alias.file} is a route-only alias with a teaching destination`, () => {
      const source = readFileSync(`src/pages/topics/${alias.file}`, 'utf8');
      expect(source).not.toMatch(/<TopicTemplate|<SectionLayout|<p[\s>]/);
      expect(source).toMatch(/<Navigate|<IcuCostLegacyRedirect/);
      expect(TOPIC_ROUTES.some(([path, name]) => path === alias.path && `${name}.tsx` === alias.file)).toBe(true);
      expect(TOPIC_ROUTES.some(([path, name]) => path === alias.target && `${name}.tsx` === alias.canonicalFile)).toBe(true);
      expect(readFileSync(`src/pages/topics/${alias.canonicalFile}`, 'utf8')).toContain('<TopicTemplate');
    });
  }
  it('does not exempt arbitrary teaching pages', () => expect(isTopicRedirectFile('src/pages/topics/NewTeachingTopic.tsx')).toBe(false));
});
