import { nanoid } from 'nanoid'

export const nid = (size: number = 5) => {
  return nanoid(size)
}