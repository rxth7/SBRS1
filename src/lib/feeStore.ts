import { supabase } from './supabase';

export interface FeeItem {
  id: string;
  particular: string;
  lkg: string;
  i_to_v: string;
  vi_to_x: string;
  sort_order: number;
  created_at?: string;
}

export interface FeeNote {
  id: string;
  note: string;
  sort_order: number;
  created_at?: string;
}

// =====================
// FEE ITEMS
// =====================

export async function getFeeItems(): Promise<FeeItem[]> {
  const { data, error } = await supabase
    .from('fee_structure')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching fee items:', error);
    return [];
  }

  return data || [];
}

export async function addFeeItem(item: Omit<FeeItem, 'id' | 'created_at'>): Promise<void> {
  const { error } = await supabase.from('fee_structure').insert(item);

  if (error) {
    console.error('Error adding fee item:', error);
    throw error;
  }
}

export async function updateFeeItem(id: string, item: Partial<Omit<FeeItem, 'id' | 'created_at'>>): Promise<void> {
  const { error } = await supabase.from('fee_structure').update(item).eq('id', id);

  if (error) {
    console.error('Error updating fee item:', error);
    throw error;
  }
}

export async function deleteFeeItem(id: string): Promise<void> {
  const { error } = await supabase.from('fee_structure').delete().eq('id', id);

  if (error) {
    console.error('Error deleting fee item:', error);
    throw error;
  }
}

// =====================
// FEE NOTES
// =====================

export async function getFeeNotes(): Promise<FeeNote[]> {
  const { data, error } = await supabase
    .from('fee_notes')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching fee notes:', error);
    return [];
  }

  return data || [];
}

export async function addFeeNote(note: string, sort_order: number): Promise<void> {
  const { error } = await supabase.from('fee_notes').insert({ note, sort_order });

  if (error) {
    console.error('Error adding fee note:', error);
    throw error;
  }
}

export async function updateFeeNote(id: string, note: string, sort_order: number): Promise<void> {
  const { error } = await supabase.from('fee_notes').update({ note, sort_order }).eq('id', id);

  if (error) {
    console.error('Error updating fee note:', error);
    throw error;
  }
}

export async function deleteFeeNote(id: string): Promise<void> {
  const { error } = await supabase.from('fee_notes').delete().eq('id', id);

  if (error) {
    console.error('Error deleting fee note:', error);
    throw error;
  }
}
