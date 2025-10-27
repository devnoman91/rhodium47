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
import vehicleDiagram from './vehicleDiagram'
import vehiclePricing from './vehiclePricing'

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
import aboutUs from './aboutUs'
import texasFacility from './texasFacility'
import careers from './careers'
import customerStories from './customerStories'
import event from './event'
import eventsPage from './eventsPage'
import eventRegistration from './eventRegistration'
import contactPage from './contactPage'
import contactFormSubmission from './contactFormSubmission'
import supportPage from './supportPage'
import comparePage from './comparePage'

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
    vehicleDiagram,
    vehiclePricing,

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
    aboutUs,
    texasFacility,
    careers,
    customerStories,
    event,
    eventsPage,
    eventRegistration,
    contactPage,
    contactFormSubmission,
    supportPage,
    comparePage,
  ],
}
