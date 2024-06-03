import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { addReview } from '../../src/api/Reviews';
import { useAggregatedData } from '../../src/hooks/aggregateData';
import { useDateContext, useReviewContext } from '../../src/contexts';
import { Grid, ReviewQuestion, Summary } from '../reviews';
import Modal from '../shared/Modal'
import { Section, SectionTitle } from '../layout';
import { Card, Divider, Text, TextInput } from 'react-native-paper';
import { getColors } from '../../src/colors';
import { color } from 'react-native-elements/dist/helpers';

type ReviewModal = {
  visible: boolean;
  onClose: () => void;
};

export default function ReviewModal({ visible, onClose }: ReviewModal) {
  const [answer, setAnswer] = useState<{ good: string; bad: string; improve: string }>({
    good: '',
    bad: '',
    improve: '',
  });

  const { selectedDate } = useDateContext();
  const { habitGridData, projectTableData } = useAggregatedData();
  const { reviews, dispatch } = useReviewContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

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
      visible={visible}
      onClose={handleCancel}
      onSave={handleSaveReview}
      disabled={!isAnswered}>
      <SectionTitle title='Last week'/>

      {lastReview && <Summary lastReview={lastReview} />}


      {projectTableData.length > 0 && <Grid data={projectTableData} name={'Plans'} selectedDate={selectedDate} />}

      {habitGridData.length > 0 && <Grid data={habitGridData} name={'Habits'} selectedDate={selectedDate} />}
      <SectionTitle title={'Review your week:'} />
      <TextInput         placeholder='What went well?'
        value={answer.good}
        mode='flat'
        dense={true}
        onChangeText={e => handleChange('good', e)}
        autoFocus={true}
        multiline={true}
        numberOfLines={4}
        returnKeyType='done'/>
      
        {/* <ReviewQuestion
          value={answer.good}
          question={'What went well?'}
          handleChange={handleChange}
          category={'good'}
        />
        <ReviewQuestion
          value={answer.bad}
          question={"What didn't go well?"}
          handleChange={handleChange}
          category={'bad'}
        />
        <ReviewQuestion
          value={answer.improve}
          question={"What's your plan to improve?"}
          handleChange={handleChange}
          category={'improve'}
        /> */}
      {/* </Section> */}
    </Modal>
  );
}
