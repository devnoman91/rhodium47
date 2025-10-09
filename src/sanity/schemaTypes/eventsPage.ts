import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'eventsPage',
  title: 'Events Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Events Page Settings',
      }
    },
  },
})
