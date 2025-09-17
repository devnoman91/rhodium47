import { type SchemaTypeDefinition } from 'sanity'
import video from './video'
import homeAbout from './homeAbout'
import productDetail from './productDetail'
import productBlog from './productBlog'
import productShowcase from './productShowcase'
import showcaseInnovation from './showcaseInnovation'
import protection from './protection'
import frequentlyAskedQuestions from './frequentlyAskedQuestions'
import utility from './utility'
import keepExploring from './keepExploring'
import newsUpdates from './newsUpdates'
import experienceXodiumTechnology from './experienceXodiumTechnology'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [video, homeAbout, productDetail, productBlog, productShowcase, showcaseInnovation, protection, frequentlyAskedQuestions, utility, keepExploring, newsUpdates, experienceXodiumTechnology],
}
