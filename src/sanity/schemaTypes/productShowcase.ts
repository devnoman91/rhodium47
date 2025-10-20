import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product-showcase',
  title: 'Product Showcase',
  type: 'document',
  fields: [
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) => {
          return input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
        },
      },
      
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
     type: 'string',
     
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      
    }),
  ],
  preview: {
    select: {
      title: 'productName',
      subtitle: 'title',
      media: 'image',
    },
  },
})