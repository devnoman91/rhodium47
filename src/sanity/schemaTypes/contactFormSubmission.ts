import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactFormSubmission',
  title: 'Contact Form Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Responded', value: 'responded' },
        ],
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes for tracking responses',
    }),
  ],
  preview: {
    select: {
      title: 'firstName',
      lastName: 'lastName',
      subject: 'subject',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare(selection) {
      const { title, lastName, subject, status, submittedAt } = selection
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : 'No date'
      return {
        title: `${title} ${lastName}`,
        subtitle: `${subject} - ${status} (${date})`,
      }
    },
  },
  orderings: [
    {
      title: 'Submission Date, New',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
})
