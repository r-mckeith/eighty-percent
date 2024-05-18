import React from 'react';
import { View } from 'react-native';
import { HabitProps } from '../../src/types/HabitTypes';
import Action from './Action';
import StatsHeader from './StatsHeader';
import { Section } from '../shared';

type ActionSection = {
  habits: HabitProps[];
  sectionName: string;
  groupId: number;
};

export default function ActionSection({ habits, sectionName }: ActionSection) {
  return (
    <>

      {habits.length > 0 ? (
        <Section>
          {sectionName !== 'today' && <StatsHeader />}

          {habits.map((tag, index) => (
            <Action
              key={index}
              habit={tag}
              sectionName={sectionName}
              isEditMode={false}
              first={sectionName === 'today' && index === 0}
              last={index === habits.length - 1 || habits.length === 1}
            />
          ))}
        </Section>
      ) : (
        <View style={{ marginBottom: 30 }} />
      )}
    </>
  );
}
