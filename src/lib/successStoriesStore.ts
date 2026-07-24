import { supabase } from './supabase';

export interface SuccessStory {
  id: string;
  name: string;
  batch: string;
  story: string;
  created_at?: string;
}

let cache: Promise<SuccessStory[]> | null = null;

async function fetchStories(): Promise<SuccessStory[]> {
  const { data, error } = await supabase
    .from('success_stories')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching success stories:', error);
    return [];
  }
  return data || [];
}

export async function getSuccessStories(): Promise<SuccessStory[]> {
  if (!cache) cache = fetchStories();
  return cache;
}

export async function getAdminSuccessStories(): Promise<SuccessStory[]> {
  cache = null;
  return fetchStories();
}

export async function addSuccessStory(story: Omit<SuccessStory, 'id' | 'created_at'>): Promise<void> {
  const { error } = await supabase.from('success_stories').insert(story);
  if (error) throw error;
  cache = null;
}

export async function updateSuccessStory(id: string, story: Partial<Omit<SuccessStory, 'id' | 'created_at'>>): Promise<void> {
  const { error } = await supabase.from('success_stories').update(story).eq('id', id);
  if (error) throw error;
  cache = null;
}

export async function deleteSuccessStory(id: string): Promise<void> {
  const { error } = await supabase.from('success_stories').delete().eq('id', id);
  if (error) throw error;
  cache = null;
}
