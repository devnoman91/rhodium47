import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'consultation',
  title: 'Consultation',
  type: 'document',
  fields: [
    // First Section: Title and Description
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      description: 'Main title and description for the consultation page',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
      ],
    }),

    // Second Section: 3 Info Sections with Image, Name, Description
    defineField({
      name: 'infoSections',
      title: 'Info Sections',
      type: 'array',
      description: 'Add 3 sections with image, name, and description',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Untitled Section',
                subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : '',
                media,
              }
            },
          },
        },
      ],
    }),

    // Third Section: Slider with Main Title and Multiple Slides
    defineField({
      name: 'sliderSection',
      title: 'Slider Section',
      type: 'object',
      description: 'Slider with main title and multiple slides',
      fields: [
        defineField({
          name: 'mainName',
          title: 'Main Name',
          type: 'string',
        }),
        defineField({
          name: 'mainTitle',
          title: 'Main Title',
          type: 'string',
        }),
        defineField({
          name: 'slides',
          title: 'Slides',
          type: 'array',
          description: 'Add multiple slides with image, name, and description',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'description',
                  media: 'image',
                },
                prepare({ title, subtitle, media }) {
                  return {
                    title: title || 'Untitled Slide',
                    subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : '',
                    media,
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroSection.title',
      subtitle: 'heroSection.description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Consultation Page',
        subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : '',
      }
    },
  },
})
