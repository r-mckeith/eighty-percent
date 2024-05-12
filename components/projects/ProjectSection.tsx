import React from "react";
import { HabitProps } from "../../src/types/HabitTypes";
import Project from "./Project";
import { Section } from "../shared";

type ProjectSection = {
  projects: HabitProps[];
  setSelected: (arg0: number) => void;
};

export default function ProjectSection({ projects, setSelected }: ProjectSection) {
  return (
    <Section>
      {projects.map((project, index) => (
        <Project key={index} project={project} setSelected={setSelected} />
      ))}
    </Section>
  );
}
