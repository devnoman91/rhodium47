import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'surveyResponse',
  title: 'Survey Responses',
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
      name: 'formSectionAnswer',
      title: 'Form Section Answer',
      type: 'string',
      description: 'What the user selected from the main form section',
    }),
    defineField({
      name: 'section1Answer',
      title: 'Section 1 Answer',
      type: 'string',
      description: 'What the user selected from additional section 1',
    }),
    defineField({
      name: 'section2Answer',
      title: 'Section 2 Answer',
      type: 'string',
      description: 'What the user selected from additional section 2',
    }),
    defineField({
      name: 'section3Answer',
      title: 'Section 3 Answer',
      type: 'string',
      description: 'What the user selected from additional section 3',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '✅ Complete', value: 'completed' },
          { title: '⏳ Partial', value: 'partial' },
        ],
        layout: 'radio',
      },
      initialValue: 'completed',
    }),
  ],

  preview: {
    select: {
      date: 'submissionDate',
      form: 'formSectionAnswer',
      section1: 'section1Answer',
      section2: 'section2Answer',
      section3: 'section3Answer',
      status: 'status',
    },
    prepare({ date, form, section1, section2, section3, status }) {
      const submissionDate = date ? new Date(date).toLocaleDateString() : 'Unknown'
      const statusIcon = status === 'completed' ? '✅' : '⏳'

      return {
        title: `${statusIcon} Survey Response - ${submissionDate}`,
        subtitle: `${form || 'No selection'} | ${section1 || 'No selection'} | ${section2 || 'No selection'} | ${section3 || 'No selection'}`,
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