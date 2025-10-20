import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product-blog',
  title: 'Product Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'mainSectionTitle',
      title: 'Main Section Title',
      type: 'string',
      
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Product Title',
              type: 'string',
              
            }),
            defineField({
              name: 'category',
              title: 'Category',
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
              name: 'image',
              title: 'Product Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'category',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'mainSectionTitle',
    },
  },
})