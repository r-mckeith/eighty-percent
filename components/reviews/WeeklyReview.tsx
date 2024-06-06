import React, { useState } from 'react';
import { addReview } from '../../src/api/Reviews';
import { useWeeklyHabitData } from '../../src/hooks/weeklyHabitData';
import { useDateContext, useReviewContext } from '../../src/contexts';
import { Grid, Summary } from '.';
import Modal from '../shared/Modal';
import { SectionTitle } from '../layout';
import { TextInput, Button } from 'react-native-paper';
import GridHeader from './GridHeader';
import { useWeeklyPlanData } from '../../src/hooks/weeklyPlanData';

type WeeklyReview = {
  visible: boolean;
  onClose: () => void;
};

export default function WeeklyReview({ visible, onClose }: WeeklyReview) {
  const [answer, setAnswer] = useState<{ good: string; bad: string; improve: string }>({
    good: '',
    bad: '',
    improve: '',
  });

  const { selectedDate, selectedDateString } = useDateContext();
  const { weeklyHabitData } = useWeeklyHabitData();
  const { reviews, dispatch } = useReviewContext();
  const { weeklyPlanData } = useWeeklyPlanData();

  const lastReview = reviews && reviews[0]?.response;
  const isAnswered = answer.good !== '' || answer.bad !== '' || answer.improve !== '';

  async function handleSaveReview(): Promise<void> {
    if (answer) {
      onClose();
      try {
        const newReview = await addReview(answer, selectedDateString);
        dispatch({ type: 'ADD_REVIEW', payload: newReview, date: selectedDateString });
        setAnswer({ good: '', bad: '', improve: '' });
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
      disabled={!isAnswered}
      stickyIndices={[0, 2, 4, 6]}>
      {lastReview && <SectionTitle title='Last week' />}
      {lastReview && <Summary lastReview={lastReview} />}

      {weeklyPlanData.length > 0 && <GridHeader title='Plans' selectedDate={selectedDate} />}
      {weeklyPlanData.length > 0 && <Grid data={weeklyPlanData} />}

      {weeklyHabitData.length > 0 && <GridHeader title='Habits' selectedDate={selectedDate} />}
      {weeklyHabitData.length > 0 && <Grid data={weeklyHabitData} />}

      <SectionTitle title={'Review'} />
      <TextInput
        style={{ marginBottom: 10 }}
        placeholder='What went well?'
        value={answer.good}
        mode='flat'
        dense={true}
        onChangeText={e => handleChange('good', e)}
        autoFocus={true}
        multiline={true}
        numberOfLines={4}
        returnKeyType='done'
      />
      <TextInput
        style={{ marginBottom: 10 }}
        placeholder="What didn't go went well?"
        value={answer.bad}
        mode='flat'
        dense={true}
        onChangeText={e => handleChange('bad', e)}
        autoFocus={true}
        multiline={true}
        numberOfLines={4}
        returnKeyType='done'
      />
      <TextInput
        style={{ marginBottom: 10 }}
        placeholder="What's your plan to improve?"
        value={answer.improve}
        mode='flat'
        dense={true}
        onChangeText={e => handleChange('improve', e)}
        autoFocus={true}
        multiline={true}
        numberOfLines={4}
        returnKeyType='done'
      />
      <Button mode='contained' style={{ marginTop: 10 }} onPress={handleSaveReview}>
        Submit
      </Button>
    </Modal>
  );
}
