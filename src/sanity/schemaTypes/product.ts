import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

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

    // About Section
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'About Name',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'About Description',
          type: 'text',
        }),
        defineField({
          name: 'images',
          title: 'About Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Image Name',
                  type: 'string',
                }),
                defineField({
                  name: 'title',
                  title: 'Image Title',
                  type: 'string',
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'counts',
                  title: 'Counts',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'name',
                          title: 'Count Name',
                          type: 'string',
                        }),
                        defineField({
                          name: 'title',
                          title: 'Count Title',
                          type: 'string',
                        }),
                        defineField({
                          name: 'value',
                          title: 'Count Value',
                          type: 'number',
                        }),
                      ],
                    },
                  ],
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Product Detail
    // defineField({
    //   name: 'productDetail',
    //   title: 'Product Detail',
    //   type: 'object',
    //   fields: [
    //     defineField({
    //       name: 'name',
    //       title: 'Detail Name',
    //       type: 'string',
    //     }),
    //     defineField({
    //       name: 'description',
    //       title: 'Detail Description',
    //       type: 'text',
    //     }),
    //     defineField({
    //       name: 'sections',
    //       title: 'Detail Sections',
    //       type: 'array',
    //       of: [
    //         {
    //           type: 'object',
    //           fields: [
    //             defineField({
    //               name: 'name',
    //               title: 'Section Name',
    //               type: 'string',
    //             }),
    //             defineField({
    //               name: 'title',
    //               title: 'Section Title',
    //               type: 'string',
    //             }),
    //             defineField({
    //               name: 'contentType',
    //               title: 'Content Type',
    //               type: 'string',
    //               options: {
    //                 list: [
    //                   { title: 'Video', value: 'video' },
    //                   { title: 'Image', value: 'image' }
    //                 ],
    //                 layout: 'radio'
    //               },
    //               initialValue: 'video',
    //             }),
    //             defineField({
    //               name: 'videoFile',
    //               title: 'Video File',
    //               type: 'file',
    //               options: {
    //                 accept: 'video/*',
    //               },
    //               hidden: ({ parent }) => parent?.contentType !== 'video',
    //             }),
    //             defineField({
    //               name: 'image',
    //               title: 'Image',
    //               type: 'image',
    //               options: {
    //                 hotspot: true,
    //               },
    //               hidden: ({ parent }) => parent?.contentType !== 'image',
    //             }),
    //           ],
    //         },
    //       ],
    //     }),
    //   ],
    // }),

    // Interior Section
    defineField({
      name: 'interiorSection',
      title: 'Interior Section',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Interior Name',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Interior Description',
          type: 'text',
        }),
        defineField({
          name: 'sections',
          title: 'Interior Sections',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Section Name',
                  type: 'string',
                }),
                defineField({
                  name: 'title',
                  title: 'Section Title',
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
            },
          ],
        }),
      ],
    }),

    // Full-Spectrum Color Section
    defineField({
      name: 'fullSpectrumColorSection',
      title: 'Full-Spectrum Color Section',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Color Section Name',
          type: 'string',
        }),
        defineField({
          name: 'sections',
          title: 'Color Sections',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Color Name',
                  type: 'string',
                }),
               
                defineField({
                  name: 'image',
                  title: 'Color Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'description',
                  title: 'Color Description',
                  type: 'text',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Model Specs Section
    defineField({
      name: 'modelSpecsSection',
      title: 'Model Specs Section',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Model Specs Name',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Model Specs Title',
          type: 'string',
        }),
        defineField({
          name: 'mainSections',
          title: 'Main Sections',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Main Section Name',
                  type: 'string',
                }),
                defineField({
                  name: 'title',
                  title: 'Main Section Title',
                  type: 'string',
                }),
               
              ],
            },
          ],
        }),
      ],
    }),

    // Warranty Section
    defineField({
      name: 'warrantySection',
      title: 'Warranty Section',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Warranty Name',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Warranty Title',
          type: 'string',
        }),
      ],
    }),

    // Count Section
    defineField({
      name: 'countSection',
      title: 'Count Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
    }),

    // Others Section
    defineField({
      name: 'othersSection',
      title: 'Others Section',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Others Name',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Others Title',
          type: 'string',
        }),
        defineField({
          name: 'bulletPoints',
          title: 'Bullet Points',
          type: 'array',
          of: [{ type: 'string' }],
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
        subtitle: 'Product',
        media: media || undefined,
      }
    },
  },
})