import { type SchemaTypeDefinition } from 'sanity'

// Global Components
import navbar from './navbar'
import footer from './footer'

// Home Page Sections
import video from './video'
import homeAbout from './homeAbout'
import productDetail from './productDetail'
import productShowcase from './productShowcase'
import showcaseInnovation from './showcaseInnovation'
import utility from './utility'
import protection from './protection'
import frequentlyAskedQuestions from './frequentlyAskedQuestions'
import keepExploring from './keepExploring'
import productBlog from './productBlog'
import newsUpdates from './newsUpdates'
import experienceXodiumTechnology from './experienceXodiumTechnology'

// Products
import product from './product'

// Forms
import surveyForm from './surveyForm'
import surveyResponse from './surveyResponse'
import inquiryForm from './inquiryForm'
import inquiryResponse from './inquiryResponse'

// Other
import emailSubscription from './emailSubscription'
import currentOffers from './currentOffers'
import consultation from './consultation'
import customDesign from './customDesign'
import maintenance from './maintenance'
import training from './training'
import xodiumArmor from './xodiumArmor'
import br6Protection from './br6Protection'
import hybridElectric from './hybridElectric'
import securitySystems from './securitySystems'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Global Components
    navbar,
    footer,

    // Home Page Sections
    video,
    homeAbout,
    productDetail,
    productShowcase,
    showcaseInnovation,
    utility,
    protection,
    frequentlyAskedQuestions,
    keepExploring,
    productBlog,
    newsUpdates,
    experienceXodiumTechnology,

    // Products
    product,

    // Forms
    surveyForm,
    surveyResponse,
    inquiryForm,
    inquiryResponse,

    // Other
    emailSubscription,
    currentOffers,
    consultation,
    customDesign,
    maintenance,
    training,
    xodiumArmor,
    br6Protection,
    hybridElectric,
    securitySystems,
  ],
}
