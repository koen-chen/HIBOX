export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      form: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
          public: boolean
          section_order: Json
          state: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: number
          name?: string
          public?: boolean
          section_order?: Json
          state?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          name?: string
          public?: boolean
          section_order?: Json
          state?: string
        }
        Relationships: []
      }
      question: {
        Row: {
          associate: boolean
          attribute: Json
          created_at: string
          form_id: number
          id: number
          label: string
          required: boolean
          section_id: number
          state: string
          type: string
        }
        Insert: {
          associate?: boolean
          attribute?: Json
          created_at?: string
          form_id: number
          id?: number
          label?: string
          required?: boolean
          section_id: number
          state?: string
          type?: string
        }
        Update: {
          associate?: boolean
          attribute?: Json
          created_at?: string
          form_id?: number
          id?: number
          label?: string
          required?: boolean
          section_id?: number
          state?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_form_id_fkey"
            columns: ["form_id"]
            referencedRelation: "form"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "section"
            referencedColumns: ["id"]
          }
        ]
      }
      section: {
        Row: {
          created_at: string
          description: string
          form_id: number
          id: number
          name: string
          question_order: Json
          state: string
        }
        Insert: {
          created_at?: string
          description?: string
          form_id: number
          id?: number
          name?: string
          question_order?: Json
          state?: string
        }
        Update: {
          created_at?: string
          description?: string
          form_id?: number
          id?: number
          name?: string
          question_order?: Json
          state?: string
        }
        Relationships: [
          {
            foreignKeyName: "section_form_id_fkey"
            columns: ["form_id"]
            referencedRelation: "form"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
