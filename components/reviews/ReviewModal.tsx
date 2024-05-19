import React, { useState } from 'react';
import { addReview } from '../../src/api/Reviews';
import { useAggregatedData } from '../../src/hooks/aggregateData';
import { useDateContext, useReviewContext } from '../../src/contexts';
import { Grid, Questions, Summary } from '../reviews';
import { Modal } from '../shared';
import { Section } from '../layout';

type ReviewModal = {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
};

export default function ReviewModal({ visible, onClose, onSave }: ReviewModal) {
  const [answer, setAnswer] = useState<{ good: string; bad: string; improve: string }>({
    good: '',
    bad: '',
    improve: '',
  });

  const { selectedDate } = useDateContext();
  const { habitGridData, projectTableData } = useAggregatedData();
  const { reviews, dispatch } = useReviewContext();

  const lastReview = reviews && reviews[0]?.response;
  const isAnswered = answer.good !== '' || answer.bad !== '' || answer.improve !== '';

  async function handleSaveReview(): Promise<void> {
    const dateString = selectedDate.toISOString().split('T')[0];

    if (answer) {
      try {
        const newReview = await addReview(answer, dateString);
        dispatch({ type: 'ADD_REVIEW', payload: newReview, date: dateString });
        setAnswer({ good: '', bad: '', improve: '' });
        onClose();
      } catch (error) {
        console.error('Failed to add review:', error);
      }
    }
  }

  function handleCancel() {
    onClose();
  }

  const handleChange = (key: string, value: string) => {
    setAnswer(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Modal
      placeholder={'Weekly Review'}
      visible={visible}
      onClose={handleCancel}
      onSave={handleSaveReview}
      size={'large'}
      disabled={!isAnswered}>
      {lastReview && <Summary lastReview={lastReview} />}

      {projectTableData.length > 0 && <Grid data={projectTableData} name={'Projects'} selectedDate={selectedDate} />}

      {habitGridData.length > 0 && <Grid data={habitGridData} name={'Habits'} selectedDate={selectedDate} />}
      <Section>
        <Questions
          value={answer.good}
          question={'What went well last week?'}
          handleChange={handleChange}
          category={'good'}
        />
        <Questions
          value={answer.bad}
          question={'What did not go well last week?'}
          handleChange={handleChange}
          category={'bad'}
        />
        <Questions
          value={answer.improve}
          question={'What is your plan to improve this week?'}
          handleChange={handleChange}
          category={'improve'}
        />
      </Section>
    </Modal>
  );
}
