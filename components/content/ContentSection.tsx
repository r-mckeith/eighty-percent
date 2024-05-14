import React, { useState } from 'react';
import Content from './Content';
import HowToUse from './HowToUse';
import { Scroll, Section, SectionTitle } from '../shared';

const videos = ['How to use the app', 'Habits', 'Plans'];
const templates = ['Set up app', 'Start a business', 'Buy a house'];
const lockedSections = ['Get in shape', 'Start a business'];

export default function ContentSection() {
  const [selected, setSelected] = useState<string | null>(null);

  function handlePressBack() {
    setSelected(null);
  }

  if (selected === null)
    return (
      <Scroll>
        <SectionTitle title={'Videos'} />
        <Section>
          {videos.map((section, index) => (
            <Content
              key={index}
              name={section}
              setSelected={setSelected}
              first={index === 0}
              last={index === videos.length - 1}
            />
          ))}
        </Section>

        <SectionTitle title={'Templates'} />
        <Section>
          {templates.map((section, index) => (
            <Content
              key={index}
              name={section}
              setSelected={setSelected}
              first={index === 0}
              last={index === templates.length - 1}
            />
          ))}
        </Section>

        <SectionTitle title={'Available'} />
        <Section>
          {lockedSections.map((section, index) => (
            <Content
              key={index}
              name={section}
              setSelected={setSelected}
              isLocked={true}
              first={index === 0}
              last={index === lockedSections.length - 1}
            />
          ))}
        </Section>
      </Scroll>
    );

  if (selected === 'How to use the app') return <HowToUse handlePressBack={handlePressBack} />;
}
