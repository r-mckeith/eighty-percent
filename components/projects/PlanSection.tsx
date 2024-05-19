import React from 'react';
import { PlanProps } from '../../src/types/HabitTypes';
import Project from './Plan';
import { Section } from '../shared';

type PlanSection = {
  plans: PlanProps[];
  setSelected: (arg0: number) => void;
};

export default function ProjectSection({ plans, setSelected }: PlanSection) {
  return (
    <Section>
      {plans.map((project, index) => (
        <Project
          key={index}
          plan={project}
          setSelected={setSelected}
          first={index === 0}
          last={index === plans.length - 1}
        />
      ))}
    </Section>
  );
}
