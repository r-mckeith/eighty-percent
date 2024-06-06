import * as React from 'react';
import { View, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HowToUse({ handlePressBack }: { handlePressBack: () => void }) {
  const video = React.useRef<any>(null);
  const [status, setStatus] = React.useState<any>({});

  return (
    <View>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons name='chevron-left' size={30} color={'white'} onPress={handlePressBack} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
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
    </View>
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
