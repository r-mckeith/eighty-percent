import { NoteProps, NewNoteProps } from '../types/shared';
import { supabase } from './Client'

export async function getNotes () {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const groups = data || [];

  return groups;
};

export async function addNote(newNote: NewNoteProps): Promise<NoteProps> {
  let { data, error } = await supabase
    .from('notes')
    .insert([newNote])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Failed to add note');
  }

  if (!data) {
    throw new Error('No data returned after insert operation');
  } else {
    return data[0];
  }
}

export async function updateNote (noteId: number, updatedNote: NewNoteProps) {
  const { data, error } = await supabase
    .from('notes')
    .update([updatedNote])
    .eq('id', noteId);

  if (error) {
    console.error(error);
  }
};

export async function deleteNote(noteId: number) {
  const { data, error } = await supabase.from('notes').delete().eq('id', noteId);

  if (error) {
    console.error(error);
  }
}