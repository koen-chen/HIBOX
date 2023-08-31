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
          id: number
          label: string
          required: boolean
          section_id: number
          template_id: number
          type: string
        }
        Insert: {
          associate?: boolean
          attribute?: string
          created_at?: string
          id?: number
          label?: string
          required?: boolean
          section_id: number
          template_id: number
          type?: string
        }
        Update: {
          associate?: boolean
          attribute?: string
          created_at?: string
          id?: number
          label?: string
          required?: boolean
          section_id?: number
          template_id?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "element_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "section"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "element_template_id_fkey"
            columns: ["template_id"]
            referencedRelation: "template"
            referencedColumns: ["id"]
          }
        ]
      }
      section: {
        Row: {
          created_at: string
          description: string
          element_order: Json
          id: number
          name: string
          template_id: number
        }
        Insert: {
          created_at?: string
          description?: string
          element_order?: Json
          id?: number
          name?: string
          template_id: number
        }
        Update: {
          created_at?: string
          description?: string
          element_order?: Json
          id?: number
          name?: string
          template_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "section_template_id_fkey"
            columns: ["template_id"]
            referencedRelation: "template"
            referencedColumns: ["id"]
          }
        ]
      }
      template: {
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
