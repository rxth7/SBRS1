import { supabase } from './supabase';

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  created_at?: string;
}

export async function getEvents(): Promise<UpcomingEvent[]> {
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

export async function getAdminEvents(): Promise<UpcomingEvent[]> {
  return getEvents();
}

export async function addEvent(event: Omit<UpcomingEvent, 'id' | 'created_at'>): Promise<void> {
  const { error } = await supabase.from('events').insert({
    title: event.title,
    date: event.date,
    description: event.description,
  });

  if (error) {
    console.error('Error adding event:', error);
    throw error;
  }
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase.from('events').delete().eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}
