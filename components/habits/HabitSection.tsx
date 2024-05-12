import React from "react";
import { View } from "react-native";
import { HabitProps } from "../../src/types/HabitTypes";
import Habit from "./Habit";
import StatsHeader from "./StatsHeader";
import { Section, SectionTitle } from "../shared";
import AddButton from "../shared/AddButton";

type SectionProps = {
  habits: HabitProps[];
  sectionName: string;
  groupId: number;
};

export default function HabitSection({ habits, sectionName, groupId }: SectionProps) {
  return (
    <>
      <SectionTitle title={sectionName === "today" ? "plans" : sectionName}>
        <AddButton sectionName={sectionName} groupId={groupId} type={"habit"} />
      </SectionTitle>
      {habits.length > 0 ? (
        <Section>
          {sectionName !== "today" && <StatsHeader />}

          {habits.map((tag, index) => (
            <Habit key={index} habit={tag} sectionName={sectionName} isEditMode={false} />
          ))}
        </Section>
      ) : <View style={{ marginBottom: 30}} />}
    </>
  );
}
