import { supabase } from './supabase';

export interface SuccessStory {
  id: string;
  name: string;
  batch: string;
  story: string;
  image_url?: string;
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

export async function uploadStoryImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `success-stories/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('alumni-images')
    .upload(fileName, file, { contentType: file.type });
  if (uploadError) throw new Error('Storage upload failed: ' + uploadError.message);

  const { data: urlData } = supabase.storage.from('alumni-images').getPublicUrl(fileName);
  return urlData?.publicUrl || '';
}

export async function addSuccessStory(story: { name: string; batch: string; story: string; image_file?: File }): Promise<void> {
  let image_url = '';
  if (story.image_file) {
    image_url = await uploadStoryImage(story.image_file);
  }

  const { error } = await supabase.from('success_stories').insert({
    name: story.name,
    batch: story.batch,
    story: story.story,
    image_url,
  });
  if (error) throw error;
  cache = null;
}

export async function updateSuccessStory(id: string, partial: { name?: string; batch?: string; story?: string; image_url?: string }): Promise<void> {
  const { error } = await supabase.from('success_stories').update(partial).eq('id', id);
  if (error) throw error;
  cache = null;
}

export async function deleteSuccessStory(id: string): Promise<void> {
  const { error } = await supabase.from('success_stories').delete().eq('id', id);
  if (error) throw error;
  cache = null;
}
