import { supabase } from './supabase';

export interface AlumniMeetImage {
  id: string;
  src: string;
  sort_order: number;
  created_at?: string;
}

let cache: Promise<AlumniMeetImage[]> | null = null;

async function fetchImages(): Promise<AlumniMeetImage[]> {
  const { data, error } = await supabase
    .from('alumni_meet_images')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching alumni meet images:', error);
    return [];
  }
  return data || [];
}

export async function getAlumniMeetImages(): Promise<AlumniMeetImage[]> {
  if (!cache) cache = fetchImages();
  return cache;
}

export async function getAdminAlumniMeetImages(): Promise<AlumniMeetImage[]> {
  cache = null;
  return fetchImages();
}

export async function addAlumniMeetImage(src: string, sort_order: number): Promise<void> {
  const match = src.match(/^data:(image\/\w+);base64,/);
  const mimeType = match ? match[1] : 'image/jpeg';
  const extension = mimeType.split('/')[1].replace('jpeg', 'jpg').replace('svg+xml', 'svg');

  const base64Data = src.replace(/^data:image\/\w+;base64,/, '');
  const byteChars = atob(base64Data);
  const byteArrays: number[] = [];
  for (let i = 0; i < byteChars.length; i++) byteArrays.push(byteChars.charCodeAt(i));
  const blob = new Blob([new Uint8Array(byteArrays)], { type: mimeType });

  const fileName = `alumni-meet/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const { error: uploadError } = await supabase.storage
    .from('alumni-meet-images')
    .upload(fileName, blob, { contentType: mimeType });

  if (uploadError) throw new Error('Upload failed: ' + uploadError.message);

  const { data: urlData } = supabase.storage.from('alumni-meet-images').getPublicUrl(fileName);
  const publicUrl = urlData?.publicUrl || '';

  const { error: insertError } = await supabase
    .from('alumni_meet_images')
    .insert({ src: publicUrl, sort_order });

  if (insertError) throw new Error('DB insert failed: ' + insertError.message);

  cache = null;
}

export async function deleteAlumniMeetImage(id: string): Promise<void> {
  const { error } = await supabase.from('alumni_meet_images').delete().eq('id', id);
  if (error) throw error;
  cache = null;
}
