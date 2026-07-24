import { supabase } from './supabase';

export interface AlumniMember {
  id: string;
  name: string;
  designation: string;
  is_executive: boolean;
  sort_order: number;
  image: string;
  created_at?: string;
}

let alumniMembersPromise: Promise<AlumniMember[]> | null = null;

export function prefetchAlumniMembers(): Promise<AlumniMember[]> {
  if (!alumniMembersPromise) {
    alumniMembersPromise = fetchAlumniMembers();
  }
  return alumniMembersPromise;
}

export async function getAlumniMembers(): Promise<AlumniMember[]> {
  if (!alumniMembersPromise) {
    alumniMembersPromise = fetchAlumniMembers();
  }
  return alumniMembersPromise;
}

async function fetchAlumniMembers(): Promise<AlumniMember[]> {
  const { data, error } = await supabase
    .from('alumni_members')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching alumni members:', error);
    return [];
  }

  return data || [];
}

export async function getAdminAlumniMembers(): Promise<AlumniMember[]> {
  alumniMembersPromise = null;
  return fetchAlumniMembers();
}

export async function addAlumniMember(member: Omit<AlumniMember, 'id' | 'created_at'>): Promise<void> {
  const { error } = await supabase.from('alumni_members').insert(member);

  if (error) {
    console.error('Error adding alumni member:', error);
    throw error;
  }

  alumniMembersPromise = null;
}

export async function updateAlumniMember(id: string, member: Partial<Omit<AlumniMember, 'id' | 'created_at'>>): Promise<void> {
  const { error } = await supabase.from('alumni_members').update(member).eq('id', id);

  if (error) {
    console.error('Error updating alumni member:', error);
    throw error;
  }

  alumniMembersPromise = null;
}

export async function deleteAlumniMember(id: string): Promise<void> {
  const { error } = await supabase.from('alumni_members').delete().eq('id', id);

  if (error) {
    console.error('Error deleting alumni member:', error);
    throw error;
  }

  alumniMembersPromise = null;
}
