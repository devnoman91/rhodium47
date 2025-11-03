import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'announcementBar',
  title: 'Announcement Bar',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Announcement Bar',
      type: 'boolean',
      description: 'Toggle to show/hide the announcement bar',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code for background (e.g., #000000)',
      initialValue: '#000000',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Hex color code for text (e.g., #FFFFFF)',
      initialValue: '#FFFFFF',
    }),
    defineField({
      name: 'autoSlideInterval',
      title: 'Auto Slide Interval (seconds)',
      type: 'number',
      description: 'Time in seconds before sliding to next announcement',
      initialValue: 3,
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'announcements',
      title: 'Announcements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Icon image for the announcement',
            }),
            defineField({
              name: 'text',
              title: 'Announcement Text',
              type: 'string',
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: 'image',
              title: 'Additional Image (Optional)',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Optional additional image',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'text',
              media: 'icon',
              order: 'order',
            },
            prepare({ title, media, order }) {
              return {
                title: `${order}. ${title}`,
                media,
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
      enabled: 'enabled',
      count: 'announcements.length',
    },
    prepare({ enabled, count }) {
      return {
        title: 'Announcement Bar',
        subtitle: `${enabled ? 'Enabled' : 'Disabled'} - ${count || 0} announcements`,
      }
    },
  },
})
