import { type SchemaTypeDefinition } from 'sanity'
import video from './video'
import product from './product'
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
import emailSubscription from './emailSubscription'
import surveyForm from './surveyForm'
import surveyResponse from './surveyResponse'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [video, product, homeAbout, productDetail, productBlog, productShowcase, showcaseInnovation, protection, frequentlyAskedQuestions, utility, keepExploring, newsUpdates, experienceXodiumTechnology, emailSubscription, surveyForm, surveyResponse],
}
