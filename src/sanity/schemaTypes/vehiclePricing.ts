import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'vehicle-pricing',
  title: 'Vehicle Pricing',
  type: 'document',
  fields: [
    defineField({
      name: 'productHandle',
      title: 'Product Handle (from Shopify)',
      type: 'string',
      description: 'Enter the exact Shopify product handle (URL slug)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pricingLine',
      title: 'Pricing Display Line',
      type: 'string',
      description: 'Example: "From $150,000 • Est. $1,200/mo* | EPA est. range 400 mi*"',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'productHandle',
      subtitle: 'pricingLine',
    },
  },
})
