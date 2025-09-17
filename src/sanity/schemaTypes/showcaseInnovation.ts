import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'showcase-innovation',
  title: 'Showcase Innovation',
  type: 'document',
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
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'title',
                },
              },
            },
          ],
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
  preview: {
    select: {
      title: 'main.title',
      subtitle: 'main.description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Showcase Innovation',
        subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : '',
      }
    },
  },
})