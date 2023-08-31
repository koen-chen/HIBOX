import { MergeDeep } from 'type-fest'
import { Database as DatabaseGenerated } from "./supabase"

export type Json = number[]

export type Database = MergeDeep<DatabaseGenerated, {
  public: {
    Tables: {
      section: {
        Row: {
          element_order: Json
          collapse?: boolean
        }
        Insert: {
          element_order?: Json
          collapse?: boolean
        }
      }
      template: {
        Row: {
          section_order: Json
        }
        Insert: {
          section_order?: Json
        }
      }
    }
  }
}>

export type Account = {
  email?: string,
}

export type Template = Database['public']['Tables']['template']['Row']
export type Section = Database['public']['Tables']['section']['Row']
export type Element = Database['public']['Tables']['element']['Row']

export type TemplateUpdate = Database['public']['Tables']['template']['Insert']
export type SectionUpdate = Database['public']['Tables']['section']['Insert']
export type ElementUpdate = Database['public']['Tables']['element']['Insert']