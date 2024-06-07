import React, { useState } from 'react';
import { View } from 'react-native';
import { List, Divider } from 'react-native-paper';
import HowToUse from '../components/content/HowToUse';
import { Scroll, SectionTitle } from '../components/layout';

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
        {sections.map((section, index) => {
          return (
            <View key={index} style={{ paddingBottom: 30 }}>
              <SectionTitle title={section.name} />
              {section.content.map((content, index) => {
                return (
                  <View key={index}>
                    <List.Item
                      title={content}
                      disabled={section.locked}
                      style={{ opacity: section.locked ? 0.25 : 1 }}
                      onPress={() => (section.locked ? () => {} : setSelected(content))}
                      right={props => <List.Icon {...props} icon={section.locked ? 'lock' : ''} />}
                    />
                    <Divider />
                  </View>
                );
              })}
            </View>
          );
        })}
      </Scroll>
    );

  if (selected === 'How to use the app') return <HowToUse handlePressBack={handlePressBack} />;
}
