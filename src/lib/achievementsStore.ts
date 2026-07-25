import { supabase } from './supabase';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at?: string;
}

let cache: Promise<Achievement[]> | null = null;

async function fetchAchievements(): Promise<Achievement[]> {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as Achievement[]) || [];
}

export async function getAchievements(): Promise<Achievement[]> {
  if (!cache) cache = fetchAchievements();
  return cache;
}

export async function getAdminAchievements(): Promise<Achievement[]> {
  cache = null;
  return fetchAchievements();
}

export async function addAchievement(achievement: Omit<Achievement, 'id' | 'created_at'>): Promise<void> {
  const { error } = await supabase.from('achievements').insert(achievement);
  if (error) throw error;
  cache = null;
}

export async function updateAchievement(id: string, partial: Partial<Omit<Achievement, 'id' | 'created_at'>>): Promise<void> {
  const { error } = await supabase.from('achievements').update(partial).eq('id', id);
  if (error) throw error;
  cache = null;
}

export async function deleteAchievement(id: string): Promise<void> {
  const { error } = await supabase.from('achievements').delete().eq('id', id);
  if (error) throw error;
  cache = null;
}
