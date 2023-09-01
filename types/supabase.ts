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
      element: {
        Row: {
          associate: boolean
          attribute: string
          created_at: string
          form_id: number
          id: number
          label: string
          required: boolean
          section_id: number
          type: string
        }
        Insert: {
          associate?: boolean
          attribute?: string
          created_at?: string
          form_id: number
          id?: number
          label?: string
          required?: boolean
          section_id: number
          type?: string
        }
        Update: {
          associate?: boolean
          attribute?: string
          created_at?: string
          form_id?: number
          id?: number
          label?: string
          required?: boolean
          section_id?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "element_form_id_fkey"
            columns: ["form_id"]
            referencedRelation: "form"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "element_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "section"
            referencedColumns: ["id"]
          }
        ]
      }
      form: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
          public: boolean
          section_order: Json
        }
        Insert: {
          created_at?: string
          description?: string
          id?: number
          name?: string
          public?: boolean
          section_order?: Json
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          name?: string
          public?: boolean
          section_order?: Json
        }
        Relationships: []
      }
      section: {
        Row: {
          created_at: string
          description: string
          element_order: Json
          form_id: number
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          description?: string
          element_order?: Json
          form_id: number
          id?: number
          name?: string
        }
        Update: {
          created_at?: string
          description?: string
          element_order?: Json
          form_id?: number
          id?: number
          name?: string
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
