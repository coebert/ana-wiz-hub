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
          visited_at?: string
          visitor_id?: string
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
          side_effects: string
          slug: string
          synonyms: string[]
          updated_at: string
        }
        Insert: {
          adult_bolus_dose?: string
          contraindications?: string
          created_at?: string
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
          side_effects?: string
          slug: string
          synonyms?: string[]
          updated_at?: string
        }
        Update: {
          adult_bolus_dose?: string
          contraindications?: string
          created_at?: string
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
          side_effects?: string
          slug?: string
          synonyms?: string[]
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
      podcasts: {
        Row: {
          audio_path: string | null
          created_at: string
          duration_seconds: number | null
          error_message: string | null
          id: string
          script: string | null
          status: string
          topic_id: string
          topic_title: string
          updated_at: string
          voice: string | null
        }
        Insert: {
          audio_path?: string | null
          created_at?: string
          duration_seconds?: number | null
          error_message?: string | null
          id?: string
          script?: string | null
          status?: string
          topic_id: string
          topic_title: string
          updated_at?: string
          voice?: string | null
        }
        Update: {
          audio_path?: string | null
          created_at?: string
          duration_seconds?: number | null
          error_message?: string | null
          id?: string
          script?: string | null
          status?: string
          topic_id?: string
          topic_title?: string
          updated_at?: string
          voice?: string | null
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
      topic_audit_findings: {
        Row: {
          category: string
          created_at: string
          details: string | null
          diagram_ref: string | null
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
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
