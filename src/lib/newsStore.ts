import { supabase } from './supabase';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image_url?: string;
  created_at?: string;
}

let newsPromise: Promise<NewsItem[]> | null = null;

async function fetchNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching news:', error);
    return [];
  }

  return data || [];
}

export async function getAllNews(): Promise<NewsItem[]> {
  if (!newsPromise) newsPromise = fetchNews();
  return newsPromise;
}

export async function getAdminNews(): Promise<NewsItem[]> {
  newsPromise = null;
  return getAllNews();
}

export async function uploadNewsImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `news-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('event-images')
    .upload(fileName, file, { contentType: file.type });
  if (uploadError) throw new Error('Storage upload failed: ' + uploadError.message);

  const { data: urlData } = supabase.storage.from('event-images').getPublicUrl(fileName);
  return urlData?.publicUrl || '';
}

export async function addNews(item: { title: string; date: string; description: string; image_file?: File }): Promise<void> {
  let image_url = '';
  if (item.image_file) {
    image_url = await uploadNewsImage(item.image_file);
  }

  const { error } = await supabase.from('news').insert({
    title: item.title,
    date: item.date,
    description: item.description,
    image_url,
  });

  if (error) {
    console.error('Error adding news:', error);
    throw error;
  }
}

export async function updateNews(id: string, partial: { title?: string; date?: string; description?: string; image_url?: string }): Promise<void> {
  const { error } = await supabase.from('news').update(partial).eq('id', id);
  if (error) throw error;
  newsPromise = null;
}

export async function deleteNews(id: string): Promise<void> {
  const { error } = await supabase.from('news').delete().eq('id', id);

  if (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
  newsPromise = null;
}
