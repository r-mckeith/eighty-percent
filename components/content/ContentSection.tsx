import React, { useState } from "react";
import Content from "./Content";
import HowToUse from "./HowToUse";
import { Scroll, Section, SectionTitle } from "../layout";

const videos = ["How to use the app", "Habits", "Projects"];
const templates = ["Set up app", "Start a business", "Buy a house"];
const lockedSections = ["Get in shape", "Start a business"];

export default function ContentSection() {
  const [selected, setSelected] = useState<string | null>(null);

  function handlePressBack() {
    setSelected(null);
  }

  if (selected === null)
    return (
      <Scroll>
        <SectionTitle title={"Videos"} />
        <Section>
          {videos.map((section, index) => (
            <Content key={index} name={section} setSelected={setSelected} />
          ))}
        </Section>

        <SectionTitle title={"Templates"} />
        <Section>
          {templates.map((section, index) => (
            <Content key={index} name={section} setSelected={setSelected} />
          ))}
        </Section>

        <SectionTitle title={"Available"} />
        <Section>
          {lockedSections.map((section, index) => (
            <Content key={index} name={section} setSelected={setSelected} isLocked={true} />
          ))}
        </Section>
      </Scroll>
    );

  if (selected === "How to use the app") return <HowToUse handlePressBack={handlePressBack} />;
}
