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
                  name: 'count',
                  title: 'Count',
                  type: 'number',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Product Detail
    defineField({
      name: 'productDetail',
      title: 'Product Detail',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Detail Name',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Detail Description',
          type: 'text',
        }),
        defineField({
          name: 'sections',
          title: 'Detail Sections',
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
                  name: 'title',
                  title: 'Color Title',
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
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Model Specs',
        }),

        // Specification Sections
        defineField({
          name: 'specificationSections',
          title: 'Specification Sections',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'specSection',
              title: 'Specification Section',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Section Name',
                  type: 'string',
                  description: 'e.g., Performance, Physical, Warranty & Service',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'image',
                  title: 'Section Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  description: 'Optional image for this specification section',
                }),
                defineField({
                  name: 'specifications',
                  title: 'Specifications',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'specification',
                      title: 'Specification',
                      fields: [
                        defineField({
                          name: 'label',
                          title: 'Specification Label',
                          type: 'string',
                          description: 'e.g., Weight (Curb Mass), Cargo, Wheels, Range (EPA Est.)',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'value',
                          title: 'Specification Value',
                          type: 'text',
                          description: 'e.g., 4,802 Lbs, 28 Cu Ft, 19" Or 21", 368 Mi',
                          validation: (Rule) => Rule.required(),
                        }),
                      ],
                      preview: {
                        select: {
                          title: 'label',
                          subtitle: 'value',
                        },
                      },
                    },
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  media: 'image',
                  subtitle: 'specifications.0.label',
                },
                prepare({ title, media, subtitle }) {
                  return {
                    title,
                    media,
                    subtitle: subtitle ? `First spec: ${subtitle}` : 'No specifications yet',
                  }
                },
              },
            },
          ],
        }),

        // Others Section
        defineField({
          name: 'othersSection',
          title: 'Others',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'OTHERS',
            }),
            defineField({
              name: 'bulletPoints',
              title: 'Bullet Points',
              type: 'array',
              of: [{ type: 'text' }],
              description: 'Add detailed notes and disclaimers',
            }),
          ],
        }),
      ],
    }),



    // Showcase Innovation Section
    defineField({
      name: 'showcaseInnovation',
      title: 'Showcase Innovation',
      type: 'object',
      fields: [
        defineField({
          name: 'main',
          title: 'Main Section',
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
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'blogSection',
          title: 'Blog Section',
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
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'slug',
                  title: 'Slug',
                  type: 'slug',
                  options: {
                    source: 'title',
                    maxLength: 96,
                    slugify: (input: string) => {
                      return input
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w-]+/g, '')
                    },
                  },
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                },
                prepare({ title, subtitle }) {
                  return {
                    title: title || 'Untitled',
                    subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : '',
                  }
                },
              },
            },
          ],
        }),
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