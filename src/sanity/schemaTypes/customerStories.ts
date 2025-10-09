import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'customerStories',
  title: 'Customer Stories',
  type: 'document',
  fields: [
    // First Section: Hero Section
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

    // Second Section: Stories
    defineField({
      name: 'stories',
      title: 'Stories',
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
            defineField({
              name: 'excerpt',
              title: 'Excerpt',
              type: 'text',
              description: 'Short description for the card',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'URL',
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text',
                    },
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption',
                    },
                  ],
                },
              ],
              description: 'Full story content with rich text editor',
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
})