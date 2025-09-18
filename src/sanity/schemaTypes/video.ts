import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product-video',
  title: 'Product Video',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'Image', value: 'image' }
        ],
        layout: 'radio'
      },
      initialValue: 'video',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) =>
        Rule.custom((videoFile, context) => {
          const contentType = context.document?.contentType
          if (contentType === 'video' && !videoFile) {
            return 'Video file is required when content type is video'
          }
          return true
        }),
      hidden: ({ document }) => document?.contentType !== 'video',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const contentType = context.document?.contentType
          if (contentType === 'image' && !image) {
            return 'Image is required when content type is image'
          }
          return true
        }),
      hidden: ({ document }) => document?.contentType !== 'image',
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
      subtitle: 'contentType',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === 'video' ? 'Video Content' : 'Image Content',
        media: media || undefined,
      }
    },
  },
})