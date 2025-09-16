import { type SchemaTypeDefinition } from 'sanity'
import video from './video'
import homeAbout from './homeAbout'
import productDetail from './productDetail'
import productBlog from './productBlog'
import productShowcase from './productShowcase'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [video, homeAbout, productDetail, productBlog, productShowcase],
}
