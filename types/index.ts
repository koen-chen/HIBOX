import { MergeDeep } from 'type-fest'
import { Database as DatabaseGenerated } from "./supabase"

type Json = number[]

type Database = MergeDeep<DatabaseGenerated, {
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

export type FormType = Database['public']['Tables']['form']['Row']
export type SectionType = Database['public']['Tables']['section']['Row']
export type QuestionType = Database['public']['Tables']['question']['Row']

export type FormUpdateType = Database['public']['Tables']['form']['Insert']
export type SectionUpdateType = Database['public']['Tables']['section']['Insert']
export type QuestionUpdateType = Database['public']['Tables']['question']['Insert']

export type AccountType = {
  email?: string,
}
