import { supabase } from '../../src/api/Client';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Scroll } from '../layout';
export default function Account({session}: any) {
  return (
    <>
      <Scroll>
        <View style={styles.container}>
          <View style={styles.verticallySpaced}></View>
        </View>
      </Scroll>
      <Button title='Sign Out' onPress={() => supabase.auth.signOut()} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
