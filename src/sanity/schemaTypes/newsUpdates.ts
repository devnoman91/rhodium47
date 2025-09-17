import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'news-updates',
  title: 'News & Updates',
  type: 'document',
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
      name: 'newsSection',
      title: 'News Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
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
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'News Item',
                subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : '',
                media: media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'News & Updates',
        subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : '',
      }
    },
  },
})