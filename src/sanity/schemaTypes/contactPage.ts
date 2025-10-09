import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
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

    // Contact Information Section
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Get in Touch',
        }),
        defineField({
          name: 'emails',
          title: 'Email Addresses',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
                defineField({
                  name: 'email',
                  title: 'Email',
                  type: 'string',
                  validation: (Rule) => Rule.email(),
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'phones',
          title: 'Phone Numbers',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
                defineField({
                  name: 'phone',
                  title: 'Phone',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'object',
          fields: [
            defineField({
              name: 'street',
              title: 'Street Address',
              type: 'string',
            }),
            defineField({
              name: 'city',
              title: 'City',
              type: 'string',
            }),
            defineField({
              name: 'state',
              title: 'State',
              type: 'string',
            }),
            defineField({
              name: 'zipCode',
              title: 'Zip Code',
              type: 'string',
            }),
            defineField({
              name: 'country',
              title: 'Country',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'businessHours',
          title: 'Business Hours',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'day',
                  title: 'Day',
                  type: 'string',
                }),
                defineField({
                  name: 'hours',
                  title: 'Hours',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page Settings',
      }
    },
  },
})
