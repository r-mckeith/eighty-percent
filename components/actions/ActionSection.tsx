import React from 'react';
import { View } from 'react-native';
import { HabitProps, PlanProps } from '../../src/types/HabitTypes';
import Habit from './HabitRow';
import StatsHeader from './StatsHeader';
import { Section } from '../shared';
import PlanRow from './PlanRow';

type ActionSection = {
  items: HabitProps[] | PlanProps[];
  sectionName: string;
};

export default function ActionSection({ items, sectionName }: ActionSection) {
  return (
    <>
      {sectionName === 'Plans' && items.length > 0 ? (
        <Section>
          {items.map((item, index) => (
            <PlanRow
              key={index}
              plan={item as PlanProps}
              first={index === 0}
              last={index === items.length - 1 || items.length === 1}
            />
          ))}
        </Section>
      ) : (
        <View style={{ marginBottom: 30 }} />
      )}

      {sectionName !== 'Plans' && items.length > 0 ? (
        <Section>
          {sectionName !== 'today' && <StatsHeader />}

          {items.map((item, index) => (
            <Habit
              key={index}
              habit={item as HabitProps}
              sectionName={sectionName}
              first={sectionName === 'today' && index === 0}
              last={index === items.length - 1 || items.length === 1}
            />
          ))}
        </Section>
      ) : (
        <View style={{ marginBottom: 30 }} />
      )}
    </>
  );
}
