import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'support-page',
  title: 'Support Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder Text',
      type: 'string',
      initialValue: 'How can we help?',
    }),
    defineField({
      name: 'categories',
      title: 'Support Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Category Icon',
              type: 'string',
              description: 'Icon name or identifier',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              description: 'Add headings, paragraphs, questions, and any other content here',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Heading 1', value: 'h1' },
                    { title: 'Heading 2', value: 'h2' },
                    { title: 'Heading 3', value: 'h3' },
                    { title: 'Heading 4', value: 'h4' },
                    { title: 'Question', value: 'h5' },
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                      { title: 'Underline', value: 'underline' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'URL',
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              icon: 'icon',
            },
            prepare({ title, icon }) {
              return {
                title: title || 'Category',
                subtitle: icon || 'No icon',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'contactSection',
      title: 'Get in Touch Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Get in touch',
        }),
        defineField({
          name: 'contactOptions',
          title: 'Contact Options',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'type',
                  title: 'Contact Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Contact Us', value: 'contact' },
                      { title: 'Chat', value: 'chat' },
                      { title: 'Call', value: 'call' },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  description: 'Phone number, email, or link',
                }),
                defineField({
                  name: 'buttonText',
                  title: 'Button Text',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  title: 'label',
                  type: 'type',
                  value: 'value',
                },
                prepare({ title, type, value }) {
                  return {
                    title: title || 'Contact Option',
                    subtitle: `${type || 'Unknown'} - ${value || 'No value'}`,
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
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Support Page',
        subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : '',
      }
    },
  },
})
