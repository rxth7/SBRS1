import { supabase } from './supabase';

export interface ConcludedEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image_url?: string;
  created_at?: string;
}

let cache: Promise<ConcludedEvent[]> | null = null;

async function fetchEvents(): Promise<ConcludedEvent[]> {
  const { data, error } = await supabase
    .from('concluded_events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching concluded events:', error);
    return [];
  }
  return data || [];
}

export async function getConcludedEvents(): Promise<ConcludedEvent[]> {
  if (!cache) cache = fetchEvents();
  return cache;
}

export async function getAdminConcludedEvents(): Promise<ConcludedEvent[]> {
  cache = null;
  return fetchEvents();
}

export async function uploadConcludedEventImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `concluded-events/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('event-images')
    .upload(fileName, file, { contentType: file.type });
  if (uploadError) throw new Error('Storage upload failed: ' + uploadError.message);

  const { data: urlData } = supabase.storage.from('event-images').getPublicUrl(fileName);
  return urlData?.publicUrl || '';
}

export async function addConcludedEvent(event: { title: string; date: string; description: string; image_file?: File }): Promise<void> {
  let image_url = '';
  if (event.image_file) {
    image_url = await uploadConcludedEventImage(event.image_file);
  }

  const { error } = await supabase.from('concluded_events').insert({
    title: event.title,
    date: event.date,
    description: event.description,
    image_url,
  });
  if (error) throw error;
  cache = null;
}

export async function updateConcludedEvent(id: string, partial: { title?: string; date?: string; description?: string; image_url?: string }): Promise<void> {
  const { error } = await supabase.from('concluded_events').update(partial).eq('id', id);
  if (error) throw error;
  cache = null;
}

export async function deleteConcludedEvent(id: string): Promise<void> {
  const { error } = await supabase.from('concluded_events').delete().eq('id', id);
  if (error) throw error;
  cache = null;
}
