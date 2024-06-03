import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { addReview } from '../../src/api/Reviews';
import { useAggregatedData } from '../../src/hooks/aggregateData';
import { useDateContext, useReviewContext } from '../../src/contexts';
import { Grid, Summary } from '.';
import Modal from '../shared/Modal';
import { SectionTitle } from '../layout';
import { TextInput, Button } from 'react-native-paper';
import { getColors } from '../../src/colors';
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
      disabled={!isAnswered}
      stickyIndices={[0, 2, 4, 6]}>
      {lastReview && <SectionTitle title='Last week' />}
      {lastReview && <Summary lastReview={lastReview} />}

      {projectTableData.length > 0 && <GridHeader title='Plans' selectedDate={selectedDate} />}
      {projectTableData.length > 0 && <Grid data={projectTableData} />}

      {habitGridData.length > 0 && <GridHeader title='Habits' selectedDate={selectedDate} />}
      {habitGridData.length > 0 && <Grid data={habitGridData} />}

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
