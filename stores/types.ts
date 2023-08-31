export interface Account {
  email?: string,
}

export interface Template {
  id: number | null,
  name: string,
  description?: string,
  public?: boolean,
  sections_order?: number[],
  sections?: Section[]
}

export interface Section {
  id: number | null,
  name: string,
  description?: string,
  template_id?: number,
  elements_order?: number[],
  elements?: Element[]
}

export interface Element {
  id: number | null,
  label: string,
  type?: string,
  required?: boolean,
  attribute?: string,
  associate?: boolean,
  section_id: number,
  template_id: number
}