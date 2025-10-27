import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product-video',
  title: 'Product Video',
  type: 'document',
  fields: [
    defineField({
      name: 'desktopName',
      title: 'Desktop Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileName',
      title: 'Mobile Name',
      type: 'string',
      description: 'Optional: Name for mobile devices. Falls back to desktop name if not provided.',
    }),
    defineField({
      name: 'desktopSubtitle',
      title: 'Desktop Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'mobileSubtitle',
      title: 'Mobile Subtitle',
      type: 'string',
      description: 'Optional: Subtitle for mobile devices. Falls back to desktop subtitle if not provided.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'desktopName',
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
      name: 'desktopVideoFile',
      title: 'Desktop Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) =>
        Rule.custom((videoFile, context) => {
          const contentType = context.document?.contentType
          if (contentType === 'video' && !videoFile) {
            return 'Desktop video file is required when content type is video'
          }
          return true
        }),
      hidden: ({ document }) => document?.contentType !== 'video',
    }),
    defineField({
      name: 'mobileVideoFile',
      title: 'Mobile Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Optional: Video optimized for mobile devices. Falls back to desktop video if not provided.',
      hidden: ({ document }) => document?.contentType !== 'video',
    }),
    defineField({
      name: 'desktopImage',
      title: 'Desktop Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const contentType = context.document?.contentType
          if (contentType === 'image' && !image) {
            return 'Desktop image is required when content type is image'
          }
          return true
        }),
      hidden: ({ document }) => document?.contentType !== 'image',
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional: Image optimized for mobile devices. Falls back to desktop image if not provided.',
      hidden: ({ document }) => document?.contentType !== 'image',
    }),
 
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the call-to-action button (e.g., "Explore Models")',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'URL or path for the button (e.g., "/inventory")',
    }),
  ],
  preview: {
    select: {
      title: 'desktopName',
      subtitle: 'contentType',
      media: 'desktopImage',
      mobileMedia: 'mobileImage',
    },
    prepare({ title, subtitle, media, mobileMedia }) {
      return {
        title,
        subtitle: subtitle === 'video' ? 'Video Content (Desktop + Mobile)' : 'Image Content (Desktop + Mobile)',
        media: media || mobileMedia || undefined,
      }
    },
  },
})