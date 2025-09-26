import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'surveyForm',
  title: 'Survey Form Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Hero Name',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Hero Title',
          type: 'string',
        }),
        defineField({
          name: 'contentType',
          title: 'Content Type',
          type: 'string',
          options: {
            list: [
              { title: 'Video', value: 'video' },
              { title: 'Image', value: 'image' }
            ],
            layout: 'radio'
          },
          initialValue: 'video',
        }),
        defineField({
          name: 'videoFile',
          title: 'Video File',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({ parent }) => parent?.contentType !== 'video',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.contentType !== 'image',
        }),
      ],
    }),

    // Form Section
    defineField({
      name: 'formSection',
      title: 'Form Section',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Form Name',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Form Title',
          type: 'string',
        }),
        defineField({
          name: 'image',
          title: 'Form Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'fields',
          title: 'Form Fields',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'fieldName',
                  title: 'Field Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'fieldType',
                  title: 'Field Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Text Input', value: 'text' },
                     
                    ],
                    layout: 'dropdown'
                  },
                  initialValue: 'text',
                }),
               
              
              ],
              preview: {
                select: {
                  title: 'fieldName',
                  subtitle: 'fieldType',
                },
                prepare({ title, subtitle }) {
                  return {
                    title: title || 'Untitled Field',
                    subtitle: subtitle ? `Type: ${subtitle}` : 'No type selected',
                  }
                },
              },
            },
          ],
        }),
        defineField({
          name: 'additionalSections',
          title: 'Additional Sections',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Section Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'image',
                  title: 'Section Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'fields',
                  title: 'Section Fields',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'fieldName',
                          title: 'Field Name',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'fieldType',
                          title: 'Field Type',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Text Input', value: 'text' },
                             
                            ],
                            layout: 'dropdown'
                          },
                          initialValue: 'text',
                        }),
                       
                        defineField({
                          name: 'options',
                          title: 'Field Options',
                          type: 'array',
                          of: [{ type: 'string' }],
                          description: 'Add options for select, radio, or checkbox fields',
                          hidden: ({ parent }) => !['select', 'radio', 'checkbox'].includes(parent?.fieldType),
                        }),
                      ],
                      preview: {
                        select: {
                          title: 'fieldName',
                          subtitle: 'fieldType',
                        },
                        prepare({ title, subtitle }) {
                          return {
                            title: title || 'Untitled Field',
                            subtitle: subtitle ? `Type: ${subtitle}` : 'No type selected',
                          }
                        },
                      },
                    },
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  media: 'image',
                  fieldsCount: 'fields.length',
                },
                prepare({ title, media, fieldsCount }) {
                  return {
                    title: title || 'Untitled Section',
                    subtitle: `${fieldsCount || 0} fields`,
                    media: media || undefined,
                  }
                },
              },
            },
          ],
        }),
      ],
    }),

    // Post-Submission Section
    defineField({
      name: 'postSubmissionSection',
      title: 'Post-Submission Product Showcase',
      type: 'object',
      description: 'Section that appears after successful survey submission with product slider',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Title for the product showcase section',
        }),
        defineField({
          name: 'products',
          title: 'Products',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Product Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Product Description',
                  type: 'text',
                }),
                defineField({
                  name: 'image',
                  title: 'Product Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'priceSection',
                  title: 'Price Section',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'priceName',
                      title: 'Price Name',
                      type: 'string',
                      description: 'e.g., "Starting Price", "Base Price"',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'priceValue',
                      title: 'Price Value',
                      type: 'string',
                      description: 'e.g., "$79,900"',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                }),
                defineField({
                  name: 'options',
                  title: 'Additional Options',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'optionName',
                          title: 'Option Name',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'optionPrice',
                          title: 'Option Price',
                          type: 'string',
                          description: 'e.g., "+$5,000", "$2,500"',
                        }),
                      ],
                      preview: {
                        select: {
                          title: 'optionName',
                          subtitle: 'optionPrice',
                        },
                      },
                    },
                  ],
                  description: 'Add multiple options/upgrades for this product',
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  priceValue: 'priceSection.priceValue',
                  media: 'image',
                },
                prepare({ title, priceValue, media }) {
                  return {
                    title: title || 'Untitled Product',
                    subtitle: priceValue || 'No price',
                    media: media || undefined,
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'heroSection.image',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Survey Form Page',
        media: media || undefined,
      }
    },
  },
})