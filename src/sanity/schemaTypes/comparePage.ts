import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'comparePage',
  title: 'Compare Page',
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
          initialValue: 'Compare Models',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Discover which Tesla models meet your needs by answering questions about your budget, driving habits and lifestyle.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaButton',
          title: 'CTA Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Help Me Choose',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '/choose',
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroSection.title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Compare Page',
        subtitle: 'Compare Models Page Settings',
      }
    },
  },
})