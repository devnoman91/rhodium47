import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inquiryForm',
  title: 'Inquiry Form Page',
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
          initialValue: 'image',
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
        defineField({
          name: 'reviewSection',
          title: 'Review Section',
          type: 'object',
          description: 'Content for the review section at the end of the form',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Title for the personal info section (e.g. "Your preferred dealer will be in touch soon.")',
            }),
            defineField({
              name: 'privacyText',
              title: 'Privacy Text',
              type: 'text',
              rows: 3,
              description: 'Main privacy text content',
            }),
            defineField({
              name: 'stayConnectedTitle',
              title: 'Stay Connected Title',
              type: 'string',
              description: 'Title for the stay connected section',
            }),
            defineField({
              name: 'stayConnectedText',
              title: 'Stay Connected Text',
              type: 'text',
              rows: 2,
              description: 'Introduction text for stay connected section',
            }),
            defineField({
              name: 'communicationReasons',
              title: 'Communication Reasons',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of reasons for staying connected (appears as bullet points)',
            }),
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
        subtitle: 'Inquiry Form Page',
        media: media || undefined,
      }
    },
  },
})