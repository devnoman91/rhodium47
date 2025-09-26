import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inquiryResponse',
  title: 'Inquiry Responses',
  type: 'document',
  fields: [
    defineField({
      name: 'submissionDate',
      title: 'Date Submitted',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bodyStyle',
      title: 'Selected Body Style',
      type: 'string',
    }),
    defineField({
      name: 'model',
      title: 'Selected Model',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'additionalComments',
      title: 'Additional Comments',
      type: 'text',
    }),
    defineField({
      name: 'contactPreferences',
      title: 'Contact Preferences',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'How the user prefers to be contacted',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '✅ New', value: 'new' },
          { title: '📞 Contacted', value: 'contacted' },
          { title: '✅ Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
  ],

  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      bodyStyle: 'bodyStyle',
      model: 'model',
      date: 'submissionDate',
      status: 'status',
    },
    prepare({ firstName, lastName, email, bodyStyle, model, date, status }) {
      const submissionDate = date ? new Date(date).toLocaleDateString() : 'Unknown'
      const statusIcon = status === 'new' ? '✅' : status === 'contacted' ? '📞' : '✅'
      const name = [firstName, lastName].filter(Boolean).join(' ') || 'Unknown'
      const carConfig = [bodyStyle, model].filter(Boolean).join(' - ') || 'No config'

      return {
        title: `${name} - ${carConfig}`,
        subtitle: `${email || 'No email'} | ${submissionDate} | ${statusIcon} ${status || 'new'}`,
      }
    },
  },

  orderings: [
    {
      title: 'Latest First',
      name: 'submissionDateDesc',
      by: [{ field: 'submissionDate', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'submissionDateAsc',
      by: [{ field: 'submissionDate', direction: 'asc' }],
    },
  ],
})