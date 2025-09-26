import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'currentOffers',
  title: 'Current Offers Page',
  type: 'document',
  fields: [
    // Page Title
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Current Offers',
    }),

    // Offers List
    defineField({
      name: 'offers',
      title: 'Offers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Offer Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Offer Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Offer Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'link',
              title: 'Offer Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'title',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Untitled Offer',
                subtitle: subtitle || '',
                media: media || undefined,
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
    },
    prepare({ title }) {
      return {
        title: title || 'Current Offers Page',
        subtitle: 'Offers page',
      }
    },
  },
})