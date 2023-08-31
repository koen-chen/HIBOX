export interface Account {
  email?: string,
}

export interface Template {
  id?: string,
  name?: string,
  description?: string,
  public?: boolean,
  sections_order?: string[],
  sections?: Section[],
}

export interface Section {
  id?: string,
  name?: string,
  description?: string,
  template_id?: string,
  elements_order?: string[],
  elements?: Element[],
  collapse?: boolean
}

export interface Element {
  id?: string,
  label?: string,
  type?: string,
  required?: boolean,
  attribute?: string,
  associate?: boolean,
  section_id?: string,
  template_id?: string
}