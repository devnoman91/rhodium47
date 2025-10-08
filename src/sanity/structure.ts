import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Global Components
      S.listItem()
        .title('🌐 Global Components')
        .child(
          S.list()
            .title('Global Components')
            .items([
              S.documentTypeListItem('navbar').title('Navigation Bar'),
              S.documentTypeListItem('footer').title('Footer'),
            ])
        ),

      S.divider(),

      // Home Page Sections
      S.listItem()
        .title('🏠 Home Page Sections')
        .child(
          S.list()
            .title('Home Page Sections')
            .items([
              S.documentTypeListItem('product-video').title('Hero Carousel'),
              S.documentTypeListItem('home-about').title('About Section'),
              S.documentTypeListItem('product-detail').title('Product Details'),
              S.documentTypeListItem('product-showcase').title('Product Showcase'),
              S.documentTypeListItem('showcase-innovation').title('Showcase Innovation'),
              S.documentTypeListItem('utility').title('Utility Section'),
              S.documentTypeListItem('protection').title('Protection Section'),
              S.documentTypeListItem('frequently-asked-questions').title('FAQ Section'),
              S.documentTypeListItem('keep-exploring').title('Keep Exploring'),
              S.documentTypeListItem('product-blog').title('Blog Section'),
              S.documentTypeListItem('news-updates').title('News & Updates'),
              S.documentTypeListItem('experience-xodium-technology').title('Experience Xodium'),
            ])
        ),

      S.divider(),

      // Products
      S.listItem()
        .title('🚗 Products')
        .child(
          S.list()
            .title('Products')
            .items([
              S.documentTypeListItem('product').title('All Products'),
            ])
        ),

      S.divider(),

      // Forms
      S.listItem()
        .title('📝 Forms')
        .child(
          S.list()
            .title('Forms')
            .items([
              S.documentTypeListItem('surveyForm').title('Survey Forms'),
              S.documentTypeListItem('surveyResponse').title('Survey Responses'),
              S.documentTypeListItem('inquiryForm').title('Inquiry Forms'),
              S.documentTypeListItem('inquiryResponse').title('Inquiry Responses'),
            ])
        ),

      S.divider(),

      // Other
      S.listItem()
        .title('📧 Email & Offers')
        .child(
          S.list()
            .title('Email & Offers')
            .items([
              S.documentTypeListItem('emailSubscription').title('Email Subscriptions'),
              S.documentTypeListItem('currentOffers').title('Current Offers'),
            ])
        ),

      S.divider(),

      // Pages
      S.listItem()
        .title('📄 Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.documentTypeListItem('consultation').title('Consultation Page'),
              S.documentTypeListItem('customDesign').title('Custom Design Page'),
            ])
        ),
    ])
