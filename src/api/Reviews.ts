import { supabase } from './Client';

export async function getReviews() {
  const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false }).limit(1);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const review = data || [];

  return review;
}

export async function addReview(review: any, date: string): Promise<any> {
  let { data: reviewData, error: reviewError } = await supabase
    .from('reviews')
    .insert({ response: review, date: date })
    .select();

  if (reviewError) {
    console.error(reviewError);
    throw new Error('Failed to add group');
  }

  if (!reviewData) {
    throw new Error('No data returned after insert operation');
  } else {
    return reviewData[0];
  }
}

export async function updateReview(reviewId: number, updatedReview: any) {
  const { data, error } = await supabase.from('reviews').update({ review: updatedReview }).eq('id', reviewId);

  if (error) {
    console.error(error);
  }
}
