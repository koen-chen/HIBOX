import { MergeDeep } from 'type-fest'
import { Database as DatabaseGenerated } from "./supabase"

export type Json = number[]

export type Database = MergeDeep<DatabaseGenerated, {
  public: {
    Tables: {
      section: {
        Row: {
          question_order: Json
          collapse?: boolean
          focused?: boolean
        }
        Insert: {
          question_order?: Json
        }
      }
      form: {
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

export type Form = Database['public']['Tables']['form']['Row']
export type Section = Database['public']['Tables']['section']['Row']
export type Question = Database['public']['Tables']['question']['Row']

export type FormUpdate = Database['public']['Tables']['form']['Insert']
export type SectionUpdate = Database['public']['Tables']['section']['Insert']
export type QuestionUpdate = Database['public']['Tables']['question']['Insert']

export type Account = {
  email?: string,
}
