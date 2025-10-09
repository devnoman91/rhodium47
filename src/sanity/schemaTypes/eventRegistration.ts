import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'eventRegistration',
  title: 'Event Registration',
  type: 'document',
  fields: [
    defineField({
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'event' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
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
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'zipCode',
      title: 'Zip Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'getUpdates',
      title: 'Get Updates',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'consentText',
      title: 'Consent Text',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'registeredAt',
      title: 'Registered At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Registration Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Attended', value: 'attended' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes about this registration',
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      eventTitle: 'event.title',
      date: 'registeredAt',
    },
    prepare(selection) {
      const { firstName, lastName, email, eventTitle, date } = selection
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${eventTitle || 'Unknown Event'} - ${email}`,
        description: date ? new Date(date).toLocaleDateString() : 'No date',
      }
    },
  },
})
