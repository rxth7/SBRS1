import { supabase } from './supabase';

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image_url?: string;
  created_at?: string;
}

let eventsPromise: Promise<UpcomingEvent[]> | null = null;

async function fetchEvents(): Promise<UpcomingEvent[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data || [];
}

export async function getEvents(): Promise<UpcomingEvent[]> {
  if (!eventsPromise) eventsPromise = fetchEvents();
  return eventsPromise;
}

export async function getAdminEvents(): Promise<UpcomingEvent[]> {
  eventsPromise = null;
  return getEvents();
}

export async function uploadEventImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `event-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('event-images')
    .upload(fileName, file, { contentType: file.type });
  if (uploadError) throw new Error('Storage upload failed: ' + uploadError.message);

  const { data: urlData } = supabase.storage.from('event-images').getPublicUrl(fileName);
  return urlData?.publicUrl || '';
}

export async function addEvent(event: { title: string; date: string; description: string; image_file?: File }): Promise<void> {
  let image_url = '';
  if (event.image_file) {
    image_url = await uploadEventImage(event.image_file);
  }

  const { error } = await supabase.from('events').insert({
    title: event.title,
    date: event.date,
    description: event.description,
    image_url,
  });

  if (error) {
    console.error('Error adding event:', error);
    throw error;
  }
}

export async function updateEvent(id: string, partial: { title?: string; date?: string; description?: string; image_url?: string }): Promise<void> {
  const { error } = await supabase.from('events').update(partial).eq('id', id);
  if (error) throw error;
  eventsPromise = null;
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase.from('events').delete().eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
  eventsPromise = null;
}
