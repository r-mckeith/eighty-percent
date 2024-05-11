import React from "react";
import { HabitProps } from "../../src/types/HabitTypes";
import Habit from "./Habit";
import StatsHeader from "../shared/StatsHeader";
import { Section } from "../layout";

type SectionProps = {
  habits: HabitProps[];
  sectionName: string;
};

export default function HabitSection({ habits, sectionName }: SectionProps) {
  return (
    <Section>
      {sectionName !== "today" && <StatsHeader />}

      {habits.map((tag, index) => (
        <Habit key={index} habit={tag} sectionName={sectionName} isEditMode={false} />
      ))}
    </Section>
  );
}
