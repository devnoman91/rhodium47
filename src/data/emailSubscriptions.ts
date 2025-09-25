import { client, writeClient } from '../sanity/lib/client'

export interface EmailSubscription {
  _id: string;
  email: string;
  zip: string;
  subscriptionType: 'single' | 'zap';
  subscribedAt: string;
  isActive: boolean;
  source?: string;
}

export async function createEmailSubscription(data: {
  email: string;
  zip: string;
  subscriptionType: 'single' | 'zap';
  source?: string;
}): Promise<EmailSubscription> {
  const subscription = await writeClient.create({
    _type: 'emailSubscription',
    email: data.email,
    zip: data.zip,
    subscriptionType: data.subscriptionType,
    subscribedAt: new Date().toISOString(),
    isActive: true,
    source: data.source,
  });

  return subscription as EmailSubscription;
}

export async function getEmailSubscriptions(options?: {
  subscriptionType?: 'single' | 'zap';
  isActive?: boolean;
  limit?: number;
}): Promise<EmailSubscription[]> {
  let query = '*[_type == "emailSubscription"';

  const conditions = [];

  if (options?.subscriptionType) {
    conditions.push(`subscriptionType == "${options.subscriptionType}"`);
  }

  if (options?.isActive !== undefined) {
    conditions.push(`isActive == ${options.isActive}`);
  }

  if (conditions.length > 0) {
    query += ` && ${conditions.join(' && ')}`;
  }

  query += '] | order(subscribedAt desc)';

  if (options?.limit) {
    query += `[0...${options.limit}]`;
  }

  const subscriptions = await client.fetch(query);
  return subscriptions;
}

export async function updateEmailSubscription(
  id: string,
  updates: Partial<Pick<EmailSubscription, 'isActive' | 'source'>>
): Promise<EmailSubscription> {
  const updatedSubscription = await writeClient
    .patch(id)
    .set(updates)
    .commit();

  return updatedSubscription as unknown as EmailSubscription;
}

export async function deleteEmailSubscription(id: string): Promise<void> {
  await writeClient.delete(id);
}

export async function getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | null> {
  const query = '*[_type == "emailSubscription" && email == $email][0]';
  const subscription = await client.fetch(query, { email });
  return subscription || null;
}

export async function getSubscriptionStats(): Promise<{
  total: number;
  active: number;
  singleSubscriptions: number;
  zapSubscriptions: number;
}> {
  const totalQuery = 'count(*[_type == "emailSubscription"])';
  const activeQuery = 'count(*[_type == "emailSubscription" && isActive == true])';
  const singleQuery = 'count(*[_type == "emailSubscription" && subscriptionType == "single"])';
  const zapQuery = 'count(*[_type == "emailSubscription" && subscriptionType == "zap"])';

  const [total, active, singleSubscriptions, zapSubscriptions] = await Promise.all([
    client.fetch(totalQuery),
    client.fetch(activeQuery),
    client.fetch(singleQuery),
    client.fetch(zapQuery),
  ]);

  return {
    total,
    active,
    singleSubscriptions,
    zapSubscriptions,
  };
}