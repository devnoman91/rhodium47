import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Showcase', value: 'showcase' },
          { title: 'Training', value: 'training' },
          { title: 'Conference', value: 'conference' },
          { title: 'Exhibition', value: 'exhibition' },
          { title: 'Other', value: 'other' },
        ],
      },
      
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
      
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      
    }),
    defineField({
      name: 'eventEndDate',
      title: 'Event End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'detailDescription',
      title: 'Detail Description',
      type: 'text',
      
    }),
    defineField({
      name: 'overviewText',
      title: 'Overview Text',
      type: 'text',
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'text',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({
          name: 'venueName',
          title: 'Venue Name',
          type: 'string',
          
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          
        }),
        defineField({
          name: 'mapLink',
          title: 'Google Maps Link',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'registrationEnabled',
      title: 'Registration Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'maxAttendees',
      title: 'Max Attendees',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      date: 'eventDate',
    },
    prepare(selection) {
      const { title, media, date } = selection
      return {
        title: title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
        media: media,
      }
    },
  },
})
