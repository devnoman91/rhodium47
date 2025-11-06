import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  fields: [
    // First Section: Hero Section (like homeAbout)
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
         
        }),
        defineField({
          name: 'mainHeading',
          title: 'Main Heading',
          type: 'text',
         
        }),
        
      ],
    }),

    // Second Section: Forever Starts Now (Image Slider with Static Content)
    defineField({
      name: 'foreverStartsNowSection',
      title: 'Forever Starts Now Section',
      type: 'object',
      fields: [
        defineField({
          name: 'mainName',
          title: 'Main Name',
          type: 'string',
        }),
        defineField({
          name: 'mainTitle',
          title: 'Main Title',
          type: 'string',
        }),
        defineField({
          name: 'images',
          title: 'Slider Images',
          type: 'array',
          description: 'Add multiple images that will slide when clicking arrows',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                },
              ],
            },
          ],
          validation: (Rule) => Rule.min(1).required(),
        }),
        defineField({
          name: 'content',
          title: 'Product Content (Static)',
          type: 'object',
          description: 'This content will stay the same while images slide',
          fields: [
            defineField({
              name: 'name',
              title: 'Product Name',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Product Description',
              type: 'text',
            }),
            defineField({
              name: 'bulletPoints',
              title: 'Bullet Points',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.max(10),
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              description: 'Text for the "Learn More" button',
            }),
            defineField({
              name: 'buttonLink',
              title: 'Button Link',
              type: 'string',
              description: 'URL for the "Learn More" button',
            }),
          ],
        }),
      ],
    }),
 // Third Section: Core Values
    defineField({
         name: 'ForeversSection',
      title: 'Forever Section slider',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
         
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
         
        }),
        defineField({
          name: 'cards',
          title: 'Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                 
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text',
                    },
                  ],
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                 
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  media: 'image',
                },
              },
            },
          ],
        }),
      ],
    }),
    // Third Section: Core Values
    defineField({
        name: 'coreValuesSection',
        title: 'Core Values Section',
     
    
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
         
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
         
        }),
        defineField({
          name: 'cards',
          title: 'Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                 
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text',
                    },
                  ],
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                 
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  media: 'image',
                },
              },
            },
          ],
        }),
      ],
    }),

    // Fourth Section: Leadership Team
    defineField({
      name: 'leadershipTeamSection',
      title: 'Leadership Team Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
         
        }),
        
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
         
        }),
        defineField({
          name: 'cards',
          title: 'Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                  defineField({
          name: 'Name',
          title: 'Name',
          type: 'string',
         
        }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                 
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                 
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text',
                    },
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  media: 'image',
                },
              },
            },
          ],
        }),
      ],
    }),
   defineField({
      name: 'internByheNumbersSection',
      title: 'By the Numbers Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'countSection',
          title: 'Count Section',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'value',
                },
              },
            },
          ],
        }),
      ],
    }),
    // Fifth Section: Call to Action
    defineField({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
         
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
         
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
         
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
         
        }),
      ],
    }),
  ],
})