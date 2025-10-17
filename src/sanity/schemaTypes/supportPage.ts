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
  
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
  
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
              title: 'Sidebar Category Name',
              type: 'string',
              description: 'Category name shown in sidebar (e.g., "Purchasing")',
            }),
            defineField({
              name: 'icon',
              title: 'Category Icon',
              type: 'string',
              description: 'Icon name or identifier',
            }),
            defineField({
              name: 'mainTitle',
              title: 'Main Category Title',
              type: 'string',
              description: 'Main heading displayed at top of content (e.g., "Reserving and configuring")',
            }),
            defineField({
              name: 'sections',
              title: 'Sections',
              type: 'array',
              description: 'Add multiple sections with Q&A pairs',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'sectionTitle',
                      title: 'Section Title',
                      type: 'string',
                      description: 'Section heading (e.g., "About reserving", "Packages and options")',
                    }),
                    defineField({
                      name: 'questions',
                      title: 'Questions & Answers',
                      type: 'array',
                      description: 'Add Q&A pairs for this section',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'question',
                              title: 'Question',
                              type: 'string',
                              description: 'The question text',
                            }),
                            defineField({
                              name: 'answer',
                              title: 'Answer',
                              type: 'array',
                              description: 'Answer content (can include rich text, lists, etc.)',
                              of: [
                                {
                                  type: 'block',
                                  styles: [
                                    { title: 'Normal', value: 'normal' },
                                  ],
                                  lists: [
                                    { title: 'Bullet', value: 'bullet' },
                                    { title: 'Numbered', value: 'number' },
                                  ],
                                  marks: {
                                    decorators: [
                                      { title: 'Strong', value: 'strong' },
                                      { title: 'Emphasis', value: 'em' },
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
                            }),
                          ],
                          preview: {
                            select: {
                              title: 'question',
                            },
                            prepare({ title }) {
                              return {
                                title: title || 'Question',
                              }
                            },
                          },
                        },
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'sectionTitle',
                      questionsCount: 'questions',
                    },
                    prepare({ title, questionsCount }) {
                      const count = questionsCount?.length || 0
                      return {
                        title: title || 'Section',
                        subtitle: `${count} question${count !== 1 ? 's' : ''}`,
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              icon: 'icon',
              sectionsCount: 'sections',
            },
            prepare({ title, icon, sectionsCount }) {
              const count = sectionsCount?.length || 0
              return {
                title: title || 'Category',
                subtitle: `${icon || 'No icon'} • ${count} section${count !== 1 ? 's' : ''}`,
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
              
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
              
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
