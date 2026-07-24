import { supabase } from './supabase';

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  type: 'primary' | 'secondary';
  sort_order: number;
  image?: string;
  created_at?: string;
}

export async function getFaculty(): Promise<FacultyMember[]> {
  const { data, error } = await supabase
    .from('faculty')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching faculty:', error);
    throw error;
  }

  return data || [];
}

export async function addFaculty(member: Omit<FacultyMember, 'id' | 'created_at'>): Promise<void> {
  const { error } = await supabase.from('faculty').insert(member);

  if (error) {
    console.error('Error adding faculty:', error);
    throw error;
  }
}

export async function updateFaculty(id: string, member: Partial<Omit<FacultyMember, 'id' | 'created_at'>>): Promise<void> {
  const { error } = await supabase.from('faculty').update(member).eq('id', id);

  if (error) {
    console.error('Error updating faculty:', error);
    throw error;
  }
}

export async function deleteFaculty(id: string): Promise<void> {
  const { error } = await supabase.from('faculty').delete().eq('id', id);

  if (error) {
    console.error('Error deleting faculty:', error);
    throw error;
  }
}
