import React, { useState } from 'react';
import { View } from 'react-native';
import { List, Divider } from 'react-native-paper';
import Videos from '../components/content/Videos';
import { Scroll, SectionTitle } from '../components/shared';

const videos = ['Actions', 'Thinking ahead', 'Plans', 'How to use the app'];
const templates = ['Set up app', 'Start a business', 'Buy a house'];
const lockedSections = ['Get in shape', 'Start a business'];

const sections = [
  { name: 'Videos', content: videos, locked: false },
  { name: 'Templates', content: templates, locked: false },
  { name: 'Available', content: lockedSections, locked: true },
];

const actions = 'https://storage.googleapis.com/flywheel_videos/P1.%20Understanding%20Actions.MOV'
const thinkingAhead = 'https://storage.googleapis.com/flywheel_videos/P2.%20Thinking%20Ahead.MOV'

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

  if (selected === 'Actions') return <Videos uri={actions} handlePressBack={handlePressBack} />;
  if (selected === 'Thinking ahead') return <Videos uri={thinkingAhead} handlePressBack={handlePressBack} />;
}
