import { supabase } from './supabase';

export interface DisclosureLink {
  id: string;
  section: string;
  sl_no: number;
  link_url: string;
}

export async function getDisclosureLinks(): Promise<DisclosureLink[]> {
  const { data, error } = await supabase
    .from('disclosure_links')
    .select('*')
    .order('section', { ascending: true })
    .order('sl_no', { ascending: true });

  if (error) {
    console.error('Error fetching disclosure links:', error);
    return [];
  }

  return data || [];
}

export async function upsertDisclosureLink(
  section: string,
  sl_no: number,
  link_url: string
): Promise<void> {
  const { error } = await supabase
    .from('disclosure_links')
    .upsert(
      { section, sl_no, link_url },
      { onConflict: 'section,sl_no' }
    );

  if (error) {
    console.error('Error upserting disclosure link:', error);
    throw error;
  }
}
