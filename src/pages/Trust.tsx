import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Shield, Lock, Database, Mail, FileText } from "lucide-react";
import { SectionLayout } from "@/components/SectionLayout";

/**
 * Public trust & privacy page — `/trust`.
 *
 * App-owned editable content describing the security, privacy, and content
 * controls in use today. Not a certification and not independent verification.
 */
const Trust = () => {
  return (
    <SectionLayout>
      <Helmet>
        <title>Trust, security & privacy — AnaesthesiaCore</title>
        <meta
          name="description"
          content="How AnaesthesiaCore handles accounts, data, and content accuracy — including authentication, storage, subprocessors, and how to report problems."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/trust" />
      </Helmet>

      <article className="prose dark:prose-invert max-w-3xl mx-auto px-4 py-10">
        <header className="not-prose mb-8">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Shield className="h-4 w-4" />
            <span>Trust &amp; privacy</span>
          </div>
          <h1 className="mt-2 text-3xl font-serif font-semibold">
            Trust, security &amp; privacy
          </h1>
          <p className="mt-3 text-muted-foreground">
            This page is maintained by the AnaesthesiaCore team to answer common
            questions about how the app handles accounts, data, and content
            accuracy. It describes controls that are enabled today and is not a
            certification or independent audit.
          </p>
        </header>

        <h2 className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-primary" /> Accounts &amp; access
        </h2>
        <ul>
          <li>
            Sign-in uses email/password through our managed backend
            (Lovable Cloud, built on Supabase). Passwords are hashed by the auth
            provider — we never see or store them.
          </li>
          <li>
            Administrative tools (content audit, errata triage, analytics) are
            gated by a server-side role check; client-side flags alone do not
            grant access.
          </li>
          <li>
            Most learner-visible features (notes, topic pages, the curriculum
            map, quizzes) are available without an account.
          </li>
        </ul>

        <h2 className="flex items-center gap-2">
          <Database className="h-4 w-4 text-primary" /> Data we store
        </h2>
        <ul>
          <li>
            <strong>Anonymous usage signals</strong> — short-lived visitor IDs
            (random, stored in your browser) so we can measure which notes and
            topics are most useful. No advertising trackers.
          </li>
          <li>
            <strong>Inaccuracy reports</strong> — when you submit one, we store
            your message, the topic context, and any optional email you provide
            so an editor can follow up. Once a report is published to{" "}
            <Link to="/errata">/errata</Link>, the email and user-agent are
            scrubbed automatically.
          </li>
          <li>
            <strong>Saved progress</strong> — if you sign in, your quiz and
            topic-completion state is stored against your user ID and only
            readable by you (enforced by row-level security in the database).
          </li>
        </ul>

        <h2 className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" /> Content accuracy
        </h2>
        <p>
          Every clinical claim on the site is cited to a named source
          (guidelines, textbooks, primary literature). Mistakes are inevitable
          in a curriculum this large — please flag any you find using the
          “Report an inaccuracy” button on the relevant page. Published
          corrections are listed on the public{" "}
          <Link to="/errata">errata page</Link>.
        </p>

        <h2>Subprocessors &amp; integrations</h2>
        <ul>
          <li>
            <strong>Lovable Cloud / Supabase</strong> — managed Postgres
            database, authentication, edge functions, and object storage.
          </li>
          <li>
            <strong>OpenAI</strong> — used server-side to generate the
            optional revision-podcast audio for selected topics.
          </li>
          <li>
            <strong>Resend</strong> — transactional email for editor
            notifications, where configured.
          </li>
        </ul>

        <h2 className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-primary" /> Reporting a problem
        </h2>
        <p>
          For content corrections, use the “Report an inaccuracy” button on the
          relevant topic page. For security concerns, privacy questions, or any
          other issue, please contact the maintainers via the channels listed
          on the homepage.
        </p>

        <p className="text-sm text-muted-foreground mt-10">
          Last reviewed: June 2026. This page is editable site content and may
          change as the app evolves.
        </p>
      </article>
    </SectionLayout>
  );
};

export default Trust;
