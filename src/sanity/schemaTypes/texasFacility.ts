import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'texasFacility',
  title: 'Texas Facility',
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
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'mainHeading',
          title: 'Main Heading',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Second Section: Manufacturing Excellence
    defineField({
      name: 'manufacturingExcellence',
      title: 'Manufacturing Excellence',
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
    }),

    // Third Section: 3 Info Sections with Image, Name, Description
    defineField({
      name: 'infoSections',
      title: 'Info Sections',
      type: 'array',
      validation: (Rule) => Rule.max(3),
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
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
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
              title: 'name',
              media: 'image',
            },
          },
        },
      ],
    }),

    // Fourth Section: Facility Features
    defineField({
      name: 'facilityFeatures',
      title: 'Facility Features',
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
          name: 'cards',
          title: 'Feature Cards',
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

    // Fifth Section: Slider Section
    defineField({
      name: 'sliderSection',
      title: 'Slider Section',
      type: 'object',
      fields: [
        defineField({
          name: 'mainName',
          title: 'Main Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'mainTitle',
          title: 'Main Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'slides',
          title: 'Slides',
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
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  validation: (Rule) => Rule.required(),
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
                  title: 'name',
                  media: 'image',
                },
              },
            },
          ],
        }),
      ],
    }),

    // Sixth Section: Design Process
    defineField({
      name: 'designProcess',
      title: 'Production Process',
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
          name: 'sections',
          title: 'Sections',
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

    // Seventh Section: By the Numbers Section
    defineField({
      name: 'byTheNumbersSection',
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

    // Eighth Section: Call to Action
    defineField({
      name: 'callToAction',
      title: 'Call to Action',
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
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
})