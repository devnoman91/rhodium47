import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'showcase-innovation',
  title: 'Showcase Innovation',
  type: 'document',
  fields: [
    defineField({
      name: 'main',
      title: 'Main Section',
      type: 'object',
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
        defineField({
          name: 'countSection',
          title: 'Count Section',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'title',
                },
              },
            },
          ],
        }),
      ],
      
    }),
    defineField({
      name: 'blogSection',
      title: 'Blog Section',
      type: 'array',
      of: [
        {
          type: 'object',
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
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              
            }),
            defineField({
              name: 'buttonLink',
              title: 'Button Link',
              type: 'string',
              description: 'URL or path (e.g., /about or https://example.com)',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled',
                subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : '',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'main.title',
      subtitle: 'main.description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Showcase Innovation',
        subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : '',
      }
    },
  },
})