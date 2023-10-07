import { MergeDeep } from 'type-fest'
import { Database as DatabaseGenerated } from "./supabase"

type stringJson = string[]
type attributeJson = { [key: string]: number | string | boolean | number[] | string[] | boolean[] | Object[] }

export type Database = MergeDeep<DatabaseGenerated, {
  public: {
    Tables: {
      section: {
        Row: {
          question_order: stringJson
          collapse?: boolean
          focused?: boolean
        }
        Insert: {
          question_order?: stringJson
        }
      }
      form: {
        Row: {
          section_order: stringJson
        }
        Insert: {
          section_order?: stringJson
        }
      },
      question: {
        Row: {
          value: string | string[] | number | number[] | boolean,
          attribute: attributeJson
        }
        Insert: {
          attribute?: attributeJson,
        },
        Update: {
          attribute?: attributeJson
        }
      }
    }
  }
}>

export type FormType = Database['public']['Tables']['form']['Row']
export type SectionType = Database['public']['Tables']['section']['Row']
export type QuestionType = Database['public']['Tables']['question']['Row']

export type FormInsertType = Database['public']['Tables']['form']['Insert']
export type SectionInsertType = Database['public']['Tables']['section']['Insert']
export type QuestionInsertType = Database['public']['Tables']['question']['Insert']

export type FormUpdateType = Database['public']['Tables']['form']['Update']
export type SectionUpdateType = Database['public']['Tables']['section']['Update']
export type QuestionUpdateType = Database['public']['Tables']['question']['Update']


