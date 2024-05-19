import React, { useState } from 'react';
import { Content, HowToUse } from '../components/content';
import { Scroll, Section, SectionTitle } from '../components/layout';

const videos = ['How to use the app', 'Habits', 'Plans'];
const templates = ['Set up app', 'Start a business', 'Buy a house'];
const lockedSections = ['Get in shape', 'Start a business'];

const sections = [
  { name: 'Videos', content: videos, locked: false },
  { name: 'Templates', content: templates, locked: false },
  { name: 'Available', content: lockedSections, locked: true },
];

export default function ContentSection() {
  const [selected, setSelected] = useState<string | null>(null);

  function handlePressBack() {
    setSelected(null);
  }

  if (selected === null)
    return (
      <Scroll>
        {sections.map(section => {
          return (
            <>
              <SectionTitle title={section.name} />
              <Section>
                {section.content.map((content, index) => {
                  return (
                    <Content
                      key={index}
                      name={content}
                      setSelected={setSelected}
                      first={index === 0}
                      last={index === section.content.length - 1}
                      isLocked={section.locked}
                    />
                  );
                })}
              </Section>
            </>
          );
        })}
      </Scroll>
    );

  if (selected === 'How to use the app') return <HowToUse handlePressBack={handlePressBack} />;
}
