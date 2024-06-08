import * as React from 'react';
import { View, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Icon } from 'react-native-paper';

export default function Videos({ uri, handlePressBack }: { uri: string; handlePressBack: () => void }) {
  const video = React.useRef<any>(null);
  const [status, setStatus] = React.useState<any>({});

  return (
    <>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={handlePressBack}>
          <Icon source='chevron-left' size={30} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: uri,
            }}
            useNativeControls={true}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            shouldPlay={true}
          />
          <View style={styles.buttons}>
            <Button
              title={status.isPlaying ? 'Pause' : 'Play'}
              onPress={() => (status.isPlaying ? video.current.pauseAsync() : video.current.playAsync())}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
    paddingTop: 20,
  },
  container: {
    padding: 16,
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
