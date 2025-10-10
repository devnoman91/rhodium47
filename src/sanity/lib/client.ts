import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disabled to ensure fresh content on deployment with ISR revalidation
})

// Client for write operations
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for write operations
  token: process.env.SANITY_API_WRITE_TOKEN, // Server-side write token
})

// Debug the token
if (typeof window === 'undefined') {
  console.log('Sanity writeClient configured with token:', !!process.env.SANITY_API_WRITE_TOKEN)
  console.log('Project ID:', projectId)
  console.log('Dataset:', dataset)
}
