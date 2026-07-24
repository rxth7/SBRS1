import { supabase } from './supabase';

export interface CampusImage {
  id: string;
  src: string;
  name: string;
  sort_order: number;
  created_at?: string;
}

let campusImagesPromise: Promise<CampusImage[]> | null = null;

export function prefetchCampusImages(): Promise<CampusImage[]> {
  if (!campusImagesPromise) {
    campusImagesPromise = fetchCampusImages();
  }
  return campusImagesPromise;
}

export async function getCampusImages(): Promise<CampusImage[]> {
  if (!campusImagesPromise) {
    campusImagesPromise = fetchCampusImages();
  }
  return campusImagesPromise;
}

async function fetchCampusImages(): Promise<CampusImage[]> {
  const { data, error } = await supabase
    .from('campus_images')
    .select('*')
    .order('created_at', { ascending: false })
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching campus images:', error);
    return [];
  }

  return data || [];
}

export async function getAdminCampusImages(): Promise<CampusImage[]> {
  campusImagesPromise = null;
  return fetchCampusImages();
}

export async function addCampusImage(
  src: string,
  name: string,
  sort_order: number
): Promise<void> {
  const match = src.match(/^data:(image\/\w+);base64,/);
  const mimeType = match ? match[1] : 'image/jpeg';
  const extension = mimeType.split('/')[1].replace('jpeg', 'jpg').replace('svg+xml', 'svg');

  const base64Data = src.replace(/^data:image\/\w+;base64,/, '');
  const byteChars = atob(base64Data);
  const byteArrays: number[] = [];
  for (let i = 0; i < byteChars.length; i++) {
    byteArrays.push(byteChars.charCodeAt(i));
  }
  const blob = new Blob([new Uint8Array(byteArrays)], { type: mimeType });

  const fileName = `campus-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from('campus-images')
    .upload(fileName, blob, { contentType: mimeType });

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw new Error('Storage upload failed: ' + uploadError.message);
  }

  const { data: urlData } = supabase.storage
    .from('campus-images')
    .getPublicUrl(fileName);

  const publicUrl = urlData?.publicUrl || '';

  const { error: insertError } = await supabase
    .from('campus_images')
    .insert({ src: publicUrl, name, sort_order });

  if (insertError) {
    console.error('DB insert error:', insertError);
    throw new Error('DB insert failed: ' + insertError.message);
  }

  campusImagesPromise = null;
}

export async function deleteCampusImage(id: string): Promise<void> {
  const { error } = await supabase.from('campus_images').delete().eq('id', id);

  if (error) {
    console.error('Error deleting campus image:', error);
    throw error;
  }

  campusImagesPromise = null;
}
