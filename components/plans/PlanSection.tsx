import React from 'react';
import { PlanProps } from '../../src/types/shared';
import Plan from './Plan';
import { Section } from '../layout';

type PlanSection = {
  plans: PlanProps[];
  setSelected: (arg0: number) => void;
};

export default function ProjectSection({ plans, setSelected }: PlanSection) {
  return (
    <Section>
      {plans.map((project, index) => (
        <Plan
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
