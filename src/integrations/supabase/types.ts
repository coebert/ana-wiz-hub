export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_visits: {
        Row: {
          country: string | null
          country_name: string | null
          id: string
          page_path: string | null
          referrer: string | null
          traffic_source: string | null
          user_agent: string | null
          visited_at: string
          visitor_id: string
        }
        Insert: {
          country?: string | null
          country_name?: string | null
          id?: string
          page_path?: string | null
          referrer?: string | null
          traffic_source?: string | null
          user_agent?: string | null
          visited_at?: string
          visitor_id: string
        }
        Update: {
          country?: string | null
          country_name?: string | null
          id?: string
          page_path?: string | null
          referrer?: string | null
          traffic_source?: string | null
          user_agent?: string | null
          visited_at?: string
          visitor_id?: string
        }
        Relationships: []
      }
      ask_qa_library: {
        Row: {
          answer: string
          ask_count: number
          created_at: string
          id: string
          normalized: string
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          ask_count?: number
          created_at?: string
          id?: string
          normalized: string
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          ask_count?: number
          created_at?: string
          id?: string
          normalized?: string
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_content_gaps: {
        Row: {
          created_at: string
          gap_kind: string
          id: string
          rationale: string | null
          resolved_at: string | null
          resolved_by: string | null
          section: string | null
          source_doi: string | null
          source_is_open_access: boolean | null
          source_journal: string | null
          source_pmid: string | null
          source_title: string | null
          source_year: number | null
          status: string
          suggested_addition: string | null
          summary: string
          topic_id: string
          topic_title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          gap_kind?: string
          id?: string
          rationale?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          section?: string | null
          source_doi?: string | null
          source_is_open_access?: boolean | null
          source_journal?: string | null
          source_pmid?: string | null
          source_title?: string | null
          source_year?: number | null
          status?: string
          suggested_addition?: string | null
          summary: string
          topic_id: string
          topic_title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          gap_kind?: string
          id?: string
          rationale?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          section?: string | null
          source_doi?: string | null
          source_is_open_access?: boolean | null
          source_journal?: string | null
          source_pmid?: string | null
          source_title?: string | null
          source_year?: number | null
          status?: string
          suggested_addition?: string | null
          summary?: string
          topic_id?: string
          topic_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_job_state: {
        Row: {
          consecutive_rate_limits: number
          created_at: string
          cursor_topic_id: string | null
          id: string
          last_batch_size: number | null
          last_run_at: string | null
          lease_expires_at: string | null
          lease_owner: string | null
          paused: boolean
          paused_at: string | null
          paused_reason: string | null
          topics_audited_total: number
          updated_at: string
        }
        Insert: {
          consecutive_rate_limits?: number
          created_at?: string
          cursor_topic_id?: string | null
          id?: string
          last_batch_size?: number | null
          last_run_at?: string | null
          lease_expires_at?: string | null
          lease_owner?: string | null
          paused?: boolean
          paused_at?: string | null
          paused_reason?: string | null
          topics_audited_total?: number
          updated_at?: string
        }
        Update: {
          consecutive_rate_limits?: number
          created_at?: string
          cursor_topic_id?: string | null
          id?: string
          last_batch_size?: number | null
          last_run_at?: string | null
          lease_expires_at?: string | null
          lease_owner?: string | null
          paused?: boolean
          paused_at?: string | null
          paused_reason?: string | null
          topics_audited_total?: number
          updated_at?: string
        }
        Relationships: []
      }
      audit_reference_checks: {
        Row: {
          checked_at: string
          citation: string
          created_at: string
          doi: string | null
          has_erratum: boolean
          id: string
          is_retracted: boolean
          pmid: string | null
          problems: Json
          reference_label: string
          resolved_journal: string | null
          resolved_title: string | null
          resolved_year: number | null
          section: string | null
          status: string
          title_similarity: number | null
          topic_id: string
          topic_title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          checked_at?: string
          citation: string
          created_at?: string
          doi?: string | null
          has_erratum?: boolean
          id?: string
          is_retracted?: boolean
          pmid?: string | null
          problems?: Json
          reference_label: string
          resolved_journal?: string | null
          resolved_title?: string | null
          resolved_year?: number | null
          section?: string | null
          status?: string
          title_similarity?: number | null
          topic_id: string
          topic_title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          checked_at?: string
          citation?: string
          created_at?: string
          doi?: string | null
          has_erratum?: boolean
          id?: string
          is_retracted?: boolean
          pmid?: string | null
          problems?: Json
          reference_label?: string
          resolved_journal?: string | null
          resolved_title?: string | null
          resolved_year?: number | null
          section?: string | null
          status?: string
          title_similarity?: number | null
          topic_id?: string
          topic_title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      content_overrides: {
        Row: {
          anchor: string | null
          body: string
          created_at: string
          created_by: string | null
          heading: string | null
          id: string
          kind: string
          original_text: string | null
          position: number
          queued: boolean
          ref_excerpt: string | null
          ref_label: string | null
          ref_pmid: string | null
          ref_url: string | null
          status: string
          topic_id: string
          topic_title: string
          updated_at: string
        }
        Insert: {
          anchor?: string | null
          body?: string
          created_at?: string
          created_by?: string | null
          heading?: string | null
          id?: string
          kind: string
          original_text?: string | null
          position?: number
          queued?: boolean
          ref_excerpt?: string | null
          ref_label?: string | null
          ref_pmid?: string | null
          ref_url?: string | null
          status?: string
          topic_id: string
          topic_title?: string
          updated_at?: string
        }
        Update: {
          anchor?: string | null
          body?: string
          created_at?: string
          created_by?: string | null
          heading?: string | null
          id?: string
          kind?: string
          original_text?: string | null
          position?: number
          queued?: boolean
          ref_excerpt?: string | null
          ref_label?: string | null
          ref_pmid?: string | null
          ref_url?: string | null
          status?: string
          topic_id?: string
          topic_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      discussion_flags: {
        Row: {
          created_at: string
          discussion_id: string
          id: string
          reason: string | null
          reporter_id: string
        }
        Insert: {
          created_at?: string
          discussion_id: string
          id?: string
          reason?: string | null
          reporter_id: string
        }
        Update: {
          created_at?: string
          discussion_id?: string
          id?: string
          reason?: string | null
          reporter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_flags_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "topic_discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_clicks: {
        Row: {
          clicked_at: string
          id: string
          source: string
        }
        Insert: {
          clicked_at?: string
          id?: string
          source?: string
        }
        Update: {
          clicked_at?: string
          id?: string
          source?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          currency: string
          donated_on: string
          donor_name: string | null
          external_id: string | null
          id: string
          method: string
          note: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          created_by?: string | null
          currency?: string
          donated_on?: string
          donor_name?: string | null
          external_id?: string | null
          id?: string
          method?: string
          note?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          currency?: string
          donated_on?: string
          donor_name?: string | null
          external_id?: string | null
          id?: string
          method?: string
          note?: string | null
        }
        Relationships: []
      }
      drug_verification_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          current_drug: string | null
          failed: number
          id: string
          last_error: string | null
          processed: number
          status: string
          succeeded: number
          total: number
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          current_drug?: string | null
          failed?: number
          id?: string
          last_error?: string | null
          processed?: number
          status?: string
          succeeded?: number
          total?: number
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          current_drug?: string | null
          failed?: number
          id?: string
          last_error?: string | null
          processed?: number
          status?: string
          succeeded?: number
          total?: number
          updated_at?: string
        }
        Relationships: []
      }
      drug_verification_log: {
        Row: {
          created_at: string
          drug_name: string
          drug_slug: string
          error: string | null
          fields_changed: string[]
          id: string
          job_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          drug_name: string
          drug_slug: string
          error?: string | null
          fields_changed?: string[]
          id?: string
          job_id?: string | null
          status: string
        }
        Update: {
          created_at?: string
          drug_name?: string
          drug_slug?: string
          error?: string | null
          fields_changed?: string[]
          id?: string
          job_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "drug_verification_log_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "drug_verification_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      drugs: {
        Row: {
          adult_bolus_dose: string
          contraindications: string
          created_at: string
          dilutions: Json
          dosing: string
          drug_class: string
          id: string
          indication_oneliner: string
          infusion_range: string
          infusion_standard: Json
          interactions: string
          key_warning: string
          mechanism_of_action: string
          monitoring: string
          name: string
          pharmacokinetics: string
          preparation: string
          presentation: string
          related_topic_ids: string[]
          requires_tdm: boolean
          side_effects: string
          slug: string
          sources: Json
          synonyms: string[]
          tdm: Json
          updated_at: string
        }
        Insert: {
          adult_bolus_dose?: string
          contraindications?: string
          created_at?: string
          dilutions?: Json
          dosing?: string
          drug_class: string
          id?: string
          indication_oneliner?: string
          infusion_range?: string
          infusion_standard?: Json
          interactions?: string
          key_warning?: string
          mechanism_of_action?: string
          monitoring?: string
          name: string
          pharmacokinetics?: string
          preparation?: string
          presentation?: string
          related_topic_ids?: string[]
          requires_tdm?: boolean
          side_effects?: string
          slug: string
          sources?: Json
          synonyms?: string[]
          tdm?: Json
          updated_at?: string
        }
        Update: {
          adult_bolus_dose?: string
          contraindications?: string
          created_at?: string
          dilutions?: Json
          dosing?: string
          drug_class?: string
          id?: string
          indication_oneliner?: string
          infusion_range?: string
          infusion_standard?: Json
          interactions?: string
          key_warning?: string
          mechanism_of_action?: string
          monitoring?: string
          name?: string
          pharmacokinetics?: string
          preparation?: string
          presentation?: string
          related_topic_ids?: string[]
          requires_tdm?: boolean
          side_effects?: string
          slug?: string
          sources?: Json
          synonyms?: string[]
          tdm?: Json
          updated_at?: string
        }
        Relationships: []
      }
      flagged_domains: {
        Row: {
          anchor_text_sample: string | null
          authority_score: number | null
          created_at: string
          domain: string
          first_seen_at: string
          id: string
          last_seen_at: string
          notes: string | null
          reason: string | null
          source: string
          status: string
          trust_score: number | null
          updated_at: string
        }
        Insert: {
          anchor_text_sample?: string | null
          authority_score?: number | null
          created_at?: string
          domain: string
          first_seen_at?: string
          id?: string
          last_seen_at?: string
          notes?: string | null
          reason?: string | null
          source?: string
          status?: string
          trust_score?: number | null
          updated_at?: string
        }
        Update: {
          anchor_text_sample?: string | null
          authority_score?: number | null
          created_at?: string
          domain?: string
          first_seen_at?: string
          id?: string
          last_seen_at?: string
          notes?: string | null
          reason?: string | null
          source?: string
          status?: string
          trust_score?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      inaccuracy_reports: {
        Row: {
          contact_email: string | null
          created_at: string
          id: string
          message: string
          public_note: string | null
          quoted_text: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          suggested_correction: string | null
          topic_id: string
          topic_title: string
          topic_url: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string
          id?: string
          message: string
          public_note?: string | null
          quoted_text?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          suggested_correction?: string | null
          topic_id: string
          topic_title: string
          topic_url?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string
          id?: string
          message?: string
          public_note?: string | null
          quoted_text?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          suggested_correction?: string | null
          topic_id?: string
          topic_title?: string
          topic_url?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      kb_chunks: {
        Row: {
          chunk_kind: string
          content: string
          content_hash: string
          created_at: string
          embedding: string
          exam_tags: string[]
          id: string
          route: string
          section: string
          topic_id: string
          topic_title: string
        }
        Insert: {
          chunk_kind: string
          content: string
          content_hash: string
          created_at?: string
          embedding: string
          exam_tags?: string[]
          id?: string
          route: string
          section: string
          topic_id: string
          topic_title: string
        }
        Update: {
          chunk_kind?: string
          content?: string
          content_hash?: string
          created_at?: string
          embedding?: string
          exam_tags?: string[]
          id?: string
          route?: string
          section?: string
          topic_id?: string
          topic_title?: string
        }
        Relationships: []
      }
      lighthouse_runs: {
        Row: {
          branch: string | null
          cls: number | null
          commit_sha: string | null
          created_at: string
          id: string
          inp_ms: number | null
          lcp_ms: number | null
          lh_version: string | null
          raw_summary: Json
          report_path: string | null
          score_accessibility: number | null
          score_best_practices: number | null
          score_performance: number | null
          score_seo: number | null
          tbt_ms: number | null
          url: string
        }
        Insert: {
          branch?: string | null
          cls?: number | null
          commit_sha?: string | null
          created_at?: string
          id?: string
          inp_ms?: number | null
          lcp_ms?: number | null
          lh_version?: string | null
          raw_summary?: Json
          report_path?: string | null
          score_accessibility?: number | null
          score_best_practices?: number | null
          score_performance?: number | null
          score_seo?: number | null
          tbt_ms?: number | null
          url: string
        }
        Update: {
          branch?: string | null
          cls?: number | null
          commit_sha?: string | null
          created_at?: string
          id?: string
          inp_ms?: number | null
          lcp_ms?: number | null
          lh_version?: string | null
          raw_summary?: Json
          report_path?: string | null
          score_accessibility?: number | null
          score_best_practices?: number | null
          score_performance?: number | null
          score_seo?: number | null
          tbt_ms?: number | null
          url?: string
        }
        Relationships: []
      }
      note_jump_clicks: {
        Row: {
          clicked_at: string
          id: string
          note_slug: string
          target_label: string | null
          target_path: string
          target_section: string
          visitor_id: string | null
        }
        Insert: {
          clicked_at?: string
          id?: string
          note_slug: string
          target_label?: string | null
          target_path: string
          target_section: string
          visitor_id?: string | null
        }
        Update: {
          clicked_at?: string
          id?: string
          note_slug?: string
          target_label?: string | null
          target_path?: string
          target_section?: string
          visitor_id?: string | null
        }
        Relationships: []
      }
      podcast_rerecord_items: {
        Row: {
          attempts: number
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          job_id: string
          started_at: string | null
          status: string
          topic_id: string
          topic_path: string
          topic_title: string
          updated_at: string
          voice: string
        }
        Insert: {
          attempts?: number
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_id: string
          started_at?: string | null
          status?: string
          topic_id: string
          topic_path: string
          topic_title: string
          updated_at?: string
          voice: string
        }
        Update: {
          attempts?: number
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_id?: string
          started_at?: string | null
          status?: string
          topic_id?: string
          topic_path?: string
          topic_title?: string
          updated_at?: string
          voice?: string
        }
        Relationships: [
          {
            foreignKeyName: "podcast_rerecord_items_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "podcast_rerecord_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      podcast_rerecord_jobs: {
        Row: {
          batch_size: number
          completed_at: string | null
          created_at: string
          created_by: string | null
          current_topic: string | null
          current_voice: string | null
          failed: number
          id: string
          last_error: string | null
          paused: boolean
          paused_reason: string | null
          processed: number
          skipped: number
          status: string
          succeeded: number
          total: number
          updated_at: string
          voices: string[]
          worker_lease_until: string | null
          worker_token: string | null
        }
        Insert: {
          batch_size?: number
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          current_topic?: string | null
          current_voice?: string | null
          failed?: number
          id?: string
          last_error?: string | null
          paused?: boolean
          paused_reason?: string | null
          processed?: number
          skipped?: number
          status?: string
          succeeded?: number
          total?: number
          updated_at?: string
          voices?: string[]
          worker_lease_until?: string | null
          worker_token?: string | null
        }
        Update: {
          batch_size?: number
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          current_topic?: string | null
          current_voice?: string | null
          failed?: number
          id?: string
          last_error?: string | null
          paused?: boolean
          paused_reason?: string | null
          processed?: number
          skipped?: number
          status?: string
          succeeded?: number
          total?: number
          updated_at?: string
          voices?: string[]
          worker_lease_until?: string | null
          worker_token?: string | null
        }
        Relationships: []
      }
      podcasts: {
        Row: {
          audio_path: string | null
          content_hash: string | null
          created_at: string
          duration_seconds: number | null
          error_message: string | null
          id: string
          regenerating: boolean
          script: string | null
          status: string
          topic_id: string
          topic_title: string
          updated_at: string
          voice: string
        }
        Insert: {
          audio_path?: string | null
          content_hash?: string | null
          created_at?: string
          duration_seconds?: number | null
          error_message?: string | null
          id?: string
          regenerating?: boolean
          script?: string | null
          status?: string
          topic_id: string
          topic_title: string
          updated_at?: string
          voice?: string
        }
        Update: {
          audio_path?: string | null
          content_hash?: string | null
          created_at?: string
          duration_seconds?: number | null
          error_message?: string | null
          id?: string
          regenerating?: boolean
          script?: string | null
          status?: string
          topic_id?: string
          topic_title?: string
          updated_at?: string
          voice?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author_name: string
          comment: string
          created_at: string
          deleted_at: string | null
          deleted_reason: string | null
          id: string
          rating: number
          status: string
        }
        Insert: {
          author_name: string
          comment: string
          created_at?: string
          deleted_at?: string | null
          deleted_reason?: string | null
          id?: string
          rating: number
          status?: string
        }
        Update: {
          author_name?: string
          comment?: string
          created_at?: string
          deleted_at?: string | null
          deleted_reason?: string | null
          id?: string
          rating?: number
          status?: string
        }
        Relationships: []
      }
      seo_scans: {
        Row: {
          base_url: string
          commit_sha: string | null
          created_at: string
          duration_ms: number | null
          findings_count: number
          id: string
          pages_failed: number
          pages_ok: number
          pages_total: number
          results: Json
        }
        Insert: {
          base_url: string
          commit_sha?: string | null
          created_at?: string
          duration_ms?: number | null
          findings_count?: number
          id?: string
          pages_failed?: number
          pages_ok?: number
          pages_total?: number
          results?: Json
        }
        Update: {
          base_url?: string
          commit_sha?: string | null
          created_at?: string
          duration_ms?: number | null
          findings_count?: number
          id?: string
          pages_failed?: number
          pages_ok?: number
          pages_total?: number
          results?: Json
        }
        Relationships: []
      }
      srs_reviews: {
        Row: {
          card_id: string
          correct_index: number
          created_at: string
          due_at: string
          ease: number
          exam_tags: string[]
          explanation: string
          id: string
          interval_days: number
          lapses: number
          last_grade: number | null
          last_reviewed_at: string | null
          options: Json
          question: string
          repetitions: number
          topic_id: string
          topic_path: string
          topic_section: string
          topic_title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          card_id: string
          correct_index: number
          created_at?: string
          due_at?: string
          ease?: number
          exam_tags?: string[]
          explanation?: string
          id?: string
          interval_days?: number
          lapses?: number
          last_grade?: number | null
          last_reviewed_at?: string | null
          options?: Json
          question: string
          repetitions?: number
          topic_id: string
          topic_path: string
          topic_section: string
          topic_title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          card_id?: string
          correct_index?: number
          created_at?: string
          due_at?: string
          ease?: number
          exam_tags?: string[]
          explanation?: string
          id?: string
          interval_days?: number
          lapses?: number
          last_grade?: number | null
          last_reviewed_at?: string | null
          options?: Json
          question?: string
          repetitions?: number
          topic_id?: string
          topic_path?: string
          topic_section?: string
          topic_title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      topic_audit_findings: {
        Row: {
          category: string
          created_at: string
          details: string | null
          diagram_ref: string | null
          evidence_doi: string | null
          evidence_is_open_access: boolean | null
          evidence_journal: string | null
          evidence_pmid: string | null
          evidence_quote: string | null
          evidence_year: number | null
          id: string
          in_topic_section: string | null
          job_id: string
          resolved_at: string | null
          resolved_by: string | null
          section: string
          severity: string
          sources: Json
          status: string
          suggested_fix: string | null
          summary: string
          topic_id: string
          topic_title: string
          topic_url: string | null
          unverifiable_reason: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          details?: string | null
          diagram_ref?: string | null
          evidence_doi?: string | null
          evidence_is_open_access?: boolean | null
          evidence_journal?: string | null
          evidence_pmid?: string | null
          evidence_quote?: string | null
          evidence_year?: number | null
          id?: string
          in_topic_section?: string | null
          job_id: string
          resolved_at?: string | null
          resolved_by?: string | null
          section: string
          severity?: string
          sources?: Json
          status?: string
          suggested_fix?: string | null
          summary: string
          topic_id: string
          topic_title: string
          topic_url?: string | null
          unverifiable_reason?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          details?: string | null
          diagram_ref?: string | null
          evidence_doi?: string | null
          evidence_is_open_access?: boolean | null
          evidence_journal?: string | null
          evidence_pmid?: string | null
          evidence_quote?: string | null
          evidence_year?: number | null
          id?: string
          in_topic_section?: string | null
          job_id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          section?: string
          severity?: string
          sources?: Json
          status?: string
          suggested_fix?: string | null
          summary?: string
          topic_id?: string
          topic_title?: string
          topic_url?: string | null
          unverifiable_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "topic_audit_findings_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "topic_audit_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_audit_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          current_topic: string | null
          failed: number
          findings_count: number
          id: string
          last_error: string | null
          options: Json
          processed: number
          status: string
          succeeded: number
          total: number
          trigger: string
          triggered_by: string | null
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_topic?: string | null
          failed?: number
          findings_count?: number
          id?: string
          last_error?: string | null
          options?: Json
          processed?: number
          status?: string
          succeeded?: number
          total?: number
          trigger?: string
          triggered_by?: string | null
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_topic?: string | null
          failed?: number
          findings_count?: number
          id?: string
          last_error?: string | null
          options?: Json
          processed?: number
          status?: string
          succeeded?: number
          total?: number
          trigger?: string
          triggered_by?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      topic_audit_topic_logs: {
        Row: {
          completed_at: string | null
          created_at: string
          duration_ms: number | null
          error_message: string | null
          findings_count: number
          id: string
          job_id: string
          section: string
          stages: Json
          started_at: string | null
          status: string
          topic_id: string
          topic_title: string
          topic_url: string | null
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          findings_count?: number
          id?: string
          job_id: string
          section: string
          stages?: Json
          started_at?: string | null
          status?: string
          topic_id: string
          topic_title: string
          topic_url?: string | null
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          findings_count?: number
          id?: string
          job_id?: string
          section?: string
          stages?: Json
          started_at?: string | null
          status?: string
          topic_id?: string
          topic_title?: string
          topic_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      topic_discussions: {
        Row: {
          author_label: string
          body: string
          created_at: string
          flag_count: number
          hidden_reason: string | null
          id: string
          is_hidden: boolean
          parent_id: string | null
          topic_id: string
          topic_title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          author_label: string
          body: string
          created_at?: string
          flag_count?: number
          hidden_reason?: string | null
          id?: string
          is_hidden?: boolean
          parent_id?: string | null
          topic_id: string
          topic_title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          author_label?: string
          body?: string
          created_at?: string
          flag_count?: number
          hidden_reason?: string | null
          id?: string
          is_hidden?: boolean
          parent_id?: string | null
          topic_id?: string
          topic_title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_discussions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "topic_discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_references: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          refs: Json
          section: string
          status: string
          topic_id: string
          topic_title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          refs?: Json
          section: string
          status?: string
          topic_id: string
          topic_title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          refs?: Json
          section?: string
          status?: string
          topic_id?: string
          topic_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_recent_topics: {
        Row: {
          topic_id: string
          user_id: string
          visited_at: string
        }
        Insert: {
          topic_id: string
          user_id: string
          visited_at?: string
        }
        Update: {
          topic_id?: string
          user_id?: string
          visited_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_study_time: {
        Row: {
          day: string
          seconds: number
          topic_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          day?: string
          seconds?: number
          topic_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          day?: string
          seconds?: number
          topic_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subsection_progress: {
        Row: {
          checked_at: string
          subsection_id: string
          topic_id: string
          user_id: string
        }
        Insert: {
          checked_at?: string
          subsection_id: string
          topic_id: string
          user_id: string
        }
        Update: {
          checked_at?: string
          subsection_id?: string
          topic_id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_topic_progress: {
        Row: {
          completed_at: string
          topic_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          topic_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          topic_id?: string
          user_id?: string
        }
        Relationships: []
      }
      viva_model_answer_locks: {
        Row: {
          claimed_at: string
          exam: string
          question_hash: string
        }
        Insert: {
          claimed_at?: string
          exam: string
          question_hash: string
        }
        Update: {
          claimed_at?: string
          exam?: string
          question_hash?: string
        }
        Relationships: []
      }
      viva_model_answers: {
        Row: {
          created_at: string
          exam: string
          high_yield_points: Json
          id: string
          model_answer: string
          pitfalls: Json
          question: string
          question_hash: string
          topic_title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          exam: string
          high_yield_points?: Json
          id?: string
          model_answer: string
          pitfalls?: Json
          question: string
          question_hash: string
          topic_title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          exam?: string
          high_yield_points?: Json
          id?: string
          model_answer?: string
          pitfalls?: Json
          question?: string
          question_hash?: string
          topic_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      web_vitals: {
        Row: {
          connection: string | null
          created_at: string
          device_type: string | null
          id: number
          metric: string
          navigation_type: string | null
          rating: string | null
          release_sha: string | null
          route: string
          session_id: string | null
          user_agent: string | null
          value: number
        }
        Insert: {
          connection?: string | null
          created_at?: string
          device_type?: string | null
          id?: never
          metric: string
          navigation_type?: string | null
          rating?: string | null
          release_sha?: string | null
          route: string
          session_id?: string | null
          user_agent?: string | null
          value: number
        }
        Update: {
          connection?: string | null
          created_at?: string
          device_type?: string | null
          id?: never
          metric?: string
          navigation_type?: string | null
          rating?: string | null
          release_sha?: string | null
          route?: string
          session_id?: string | null
          user_agent?: string | null
          value?: number
        }
        Relationships: []
      }
    }
    Views: {
      public_errata: {
        Row: {
          created_at: string | null
          id: string | null
          message: string | null
          public_note: string | null
          quoted_text: string | null
          reviewed_at: string | null
          topic_id: string | null
          topic_title: string | null
          topic_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          message?: string | null
          public_note?: string | null
          quoted_text?: string | null
          reviewed_at?: string | null
          topic_id?: string | null
          topic_title?: string | null
          topic_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          message?: string | null
          public_note?: string | null
          quoted_text?: string | null
          reviewed_at?: string | null
          topic_id?: string | null
          topic_title?: string | null
          topic_url?: string | null
        }
        Relationships: []
      }
      web_vitals_p75_daily: {
        Row: {
          day: string | null
          device_type: string | null
          metric: string | null
          p50: number | null
          p75: number | null
          release_sha: string | null
          route: string | null
          samples: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_study_time: {
        Args: { _day?: string; _seconds: number; _topic_id: string }
        Returns: undefined
      }
      claim_podcast_rerecord_item: {
        Args: {
          _job_id: string
          _lease_seconds?: number
          _worker_token: string
        }
        Returns: {
          attempts: number
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          job_id: string
          started_at: string | null
          status: string
          topic_id: string
          topic_path: string
          topic_title: string
          updated_at: string
          voice: string
        }[]
        SetofOptions: {
          from: "*"
          to: "podcast_rerecord_items"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      match_kb_chunks: {
        Args: { match_count?: number; query_embedding: string }
        Returns: {
          chunk_kind: string
          content: string
          exam_tags: string[]
          id: string
          route: string
          section: string
          similarity: number
          topic_id: string
          topic_title: string
        }[]
      }
      refresh_podcast_rerecord_job: {
        Args: { _job_id: string }
        Returns: {
          batch_size: number
          completed_at: string | null
          created_at: string
          created_by: string | null
          current_topic: string | null
          current_voice: string | null
          failed: number
          id: string
          last_error: string | null
          paused: boolean
          paused_reason: string | null
          processed: number
          skipped: number
          status: string
          succeeded: number
          total: number
          updated_at: string
          voices: string[]
          worker_lease_until: string | null
          worker_token: string | null
        }
        SetofOptions: {
          from: "*"
          to: "podcast_rerecord_jobs"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
