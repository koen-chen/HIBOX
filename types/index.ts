import { PostgrestError } from '@supabase/supabase-js'
import { InputNode, DropdownNode, DateNode, UploadNode, PhoneNode, CountryNode } from '#components'

export * from './database'

type attributeJson = { [key: string]: number | string | boolean | number[] | string[] | boolean[] | Object[] }

export type AccountType = {
  email?: string,
}

export type DbResultError = PostgrestError

export type AllNode =
  typeof InputNode |
  typeof DropdownNode |
  typeof DateNode |
  typeof UploadNode |
  typeof PhoneNode |
  typeof CountryNode

export enum NodeType {
  Title = 'Title',
  Input = 'Input',
  Textarea = 'Textarea',
  Radio = 'Radio',
  Checkbox = 'Checkbox',
  Dropdown = 'Dropdown',
  FileUpload = 'FileUpload',
  Date = 'Date',
  Phone = 'Phone',
  Country = 'Country',
  Email = 'Email',
  DateOfBirth = 'DateOfBirth'
}

export interface NodeList {
  [key: string]: {
    node: AllNode,
    config?: Object,
    attribute?: attributeJson
  }
}

export type Option = {
  label: string,
  id: string
}