import { supabase } from './supabase';

export interface EventImage {
  id: string;
  src: string;
  title: string;
  description: string;
  date: string;
  created_at?: string;
}

let eventImagesPromise: Promise<EventImage[]> | null = null;

export function prefetchEventImages(): Promise<EventImage[]> {
  if (!eventImagesPromise) {
    eventImagesPromise = fetchEventImages();
  }
  return eventImagesPromise;
}

export async function getEventImages(): Promise<EventImage[]> {
  if (!eventImagesPromise) {
    eventImagesPromise = fetchEventImages();
  }
  return eventImagesPromise;
}

async function fetchEventImages(): Promise<EventImage[]> {
  const { data, error } = await supabase
    .from('event_images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching event images:', error);
    return [];
  }

  return data || [];
}

export async function getAdminEventImages(): Promise<EventImage[]> {
  eventImagesPromise = null;
  return getEventImages();
}

export async function addEventImage(
  src: string,
  title: string,
  description: string,
  date: string
): Promise<void> {
  // Detect the image format from the data URL so any format (jpg, png, webp, gif) is preserved
  const match = src.match(/^data:(image\/\w+);base64,/);
  const mimeType = match ? match[1] : 'image/jpeg';
  const extension = mimeType.split('/')[1].replace('jpeg', 'jpg').replace('svg+xml', 'svg');

  // Upload base64 image to Supabase Storage
  const base64Data = src.replace(/^data:image\/\w+;base64,/, '');
  const byteChars = atob(base64Data);
  const byteArrays: number[] = [];
  for (let i = 0; i < byteChars.length; i++) {
    byteArrays.push(byteChars.charCodeAt(i));
  }
  const blob = new Blob([new Uint8Array(byteArrays)], { type: mimeType });

  const fileName = `event-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from('event-images')
    .upload(fileName, blob, { contentType: 'image/jpeg' });

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw new Error('Storage upload failed: ' + uploadError.message);
  }

  const { data: urlData } = supabase.storage
    .from('event-images')
    .getPublicUrl(fileName);

  const publicUrl = urlData?.publicUrl || '';

  console.log('Uploaded to storage, public URL:', publicUrl);

  const { error: insertError } = await supabase
    .from('event_images')
    .insert({ src: publicUrl, title, description, date });

  if (insertError) {
    console.error('DB insert error:', insertError);
    throw new Error('DB insert failed: ' + insertError.message);
  }
}

export async function deleteEventImage(id: string): Promise<void> {
  const { error } = await supabase.from('event_images').delete().eq('id', id);

  if (error) {
    console.error('Error deleting event image:', error);
    throw error;
  }

  eventImagesPromise = null;
}

export async function updateEventImage(
  id: string,
  partial: { title?: string; description?: string; date?: string; src?: string }
): Promise<void> {
  const { error } = await supabase.from('event_images').update(partial).eq('id', id);
  if (error) throw error;
  eventImagesPromise = null;
}
