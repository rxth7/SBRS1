import { supabase } from './supabase';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
  created_at?: string;
}

export async function getAllNews(): Promise<NewsItem[]> {
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

export async function getAdminNews(): Promise<NewsItem[]> {
  return getAllNews();
}

export async function addNews(item: Omit<NewsItem, 'id' | 'created_at'>): Promise<void> {
  const { error } = await supabase.from('news').insert({
    title: item.title,
    date: item.date,
    description: item.description,
  });

  if (error) {
    console.error('Error adding news:', error);
    throw error;
  }
}

export async function deleteNews(id: string): Promise<void> {
  const { error } = await supabase.from('news').delete().eq('id', id);

  if (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
}
