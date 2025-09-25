import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'emailSubscription',
  title: 'Email Subscription',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'zip',
      title: 'ZIP Code',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(10),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where the subscription came from (e.g., homepage, footer, product page)',
    }),
  ],

  preview: {
    select: {
      title: 'email',
      zip: 'zip',
      source: 'source',
    },
    prepare({ title, zip, source }) {
      return {
        title,
        subtitle: `${zip || 'No ZIP'} - ${source || 'Unknown source'}`,
      }
    },
  },
})