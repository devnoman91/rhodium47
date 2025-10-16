import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'vehicle-diagram',
  title: 'Vehicle Diagram',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vehicleImage',
      title: 'Vehicle Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featurePoints',
      title: 'Feature Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Point ID (A, B, C, D, etc.)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Short label displayed under the point',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Popup Title',
              type: 'string',
              description: 'Title shown in the popup',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'details',
              title: 'Details',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of feature details',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'position',
              title: 'Position',
              type: 'object',
              fields: [
                defineField({
                  name: 'top',
                  title: 'Top (%)',
                  type: 'string',
                  description: 'Top position in percentage (e.g., "25%")',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'left',
                  title: 'Left (%)',
                  type: 'string',
                  description: 'Left position in percentage (e.g., "50%")',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'popupPosition',
              title: 'Popup Position',
              type: 'object',
              fields: [
                defineField({
                  name: 'top',
                  title: 'Top (px)',
                  type: 'string',
                  description: 'Top position in pixels (e.g., "-100px")',
                }),
                defineField({
                  name: 'left',
                  title: 'Left (px)',
                  type: 'string',
                  description: 'Left position in pixels (e.g., "50px")',
                }),
                defineField({
                  name: 'transform',
                  title: 'CSS Transform',
                  type: 'string',
                  description: 'CSS transform (e.g., "translateX(-50%)")',
                }),
              ],
              description: 'Custom popup positioning (optional)',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'id',
            },
            prepare({ title, subtitle }) {
              return {
                title: `Point ${subtitle}: ${title}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'vehicleImage',
    },
  },
})
