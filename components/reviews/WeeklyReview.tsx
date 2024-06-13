import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, List, Divider, Text } from 'react-native-paper';
import { addReview } from '../../src/api/Reviews';
import { useWeeklyPlanData } from '../../src/hooks/weeklyPlanData';
import { useWeeklyHabitData } from '../../src/hooks/weeklyHabitData';
import { useDateContext, useReviewContext } from '../../src/contexts';
import { SectionTitle, Modal } from '../shared';
import Grid from './Grid';
import GridHeader from './GridHeader';

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

  async function handleSave(): Promise<void> {
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
      onSave={handleSave}
      disabled={!isAnswered}
      stickyIndices={[0, 2, 4, 6]}>
      {lastReview && <SectionTitle title='Last week' />}
      {lastReview && (
        <View style={{ paddingBottom: 10 }}>
          <Text variant='bodyMedium' style={{ paddingLeft: 20 }}>
            What went well:
          </Text>
          <Text variant='bodyMedium' style={{ paddingLeft: 20, paddingVertical: 10 }}>
            {lastReview.good}
          </Text>
          <Divider />
          <Text variant='bodyMedium' style={{ paddingLeft: 20, paddingTop: 10 }}>
            What didn't go well:
          </Text>
          <Text variant='bodyMedium' style={{ paddingLeft: 20, paddingVertical: 10 }}>
            {lastReview.bad}
          </Text>
          <Divider />
          <Text variant='bodyMedium' style={{ paddingLeft: 20, paddingTop: 10 }}>
            What's your plan to improve:
          </Text>
          <Text variant='bodyMedium' style={{ paddingLeft: 20, paddingVertical: 10 }}>
            {lastReview.improve}
          </Text>
          <Divider />
        </View>
      )}

      {weeklyPlanData.length > 0 && <GridHeader title='Plans' selectedDate={selectedDate} />}
      {weeklyPlanData.length > 0 && <Grid data={weeklyPlanData} />}

      {weeklyHabitData.length > 0 && <GridHeader title='Habits' selectedDate={selectedDate} />}
      {weeklyHabitData.length > 0 && <Grid data={weeklyHabitData} />}

      <SectionTitle title={'Review'} />
      <View style={{ paddingBottom: 30 }}>
        <TextInput
          style={{ marginBottom: 10 }}
          label='What went well?'
          value={answer.good}
          mode='flat'
          dense={true}
          onChangeText={e => handleChange('good', e)}
          onSubmitEditing={handleSave}
          returnKeyType='done'
        />
        <TextInput
          style={{ marginBottom: 10 }}
          label="What didn't go went well?"
          value={answer.bad}
          mode='flat'
          dense={true}
          onChangeText={e => handleChange('bad', e)}
          onSubmitEditing={handleSave}
          returnKeyType='done'
        />
        <TextInput
          style={{ marginBottom: 10 }}
          label="What's your plan to improve?"
          value={answer.improve}
          mode='flat'
          dense={true}
          onChangeText={e => handleChange('improve', e)}
          autoFocus={false}
          onSubmitEditing={handleSave}
          returnKeyType='done'
        />
      </View>
    </Modal>
  );
}
