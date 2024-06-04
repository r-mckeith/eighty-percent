import { supabase } from './Client';

export async function getDailyReviews() {
  const { data, error } = await supabase.from('daily_reviews').select('*').order('created_at', { ascending: false }).limit(10);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const reviews = data || [];

  return reviews;
}

export async function addDailyReview(review: any, date: string): Promise<any> {
  console.log('adding review', review, date)
  let { data: reviewData, error: reviewError } = await supabase
    .from('daily_reviews')
    .insert({ response: review, date: date })
    .select();

  if (reviewError) {
    console.error(reviewError);
    throw new Error('Failed to add review');
  }

  if (!reviewData) {
    throw new Error('No data returned after insert operation');
  } else {
    return reviewData[0];
  }
}

export async function updateDailyReview(reviewId: number, updatedReview: any) {
  const { data, error } = await supabase.from('reviews').update({ review: updatedReview }).eq('id', reviewId);

  if (error) {
    console.error(error);
  }
}
