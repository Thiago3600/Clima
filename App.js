
import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import ViewHome from './src/screens/ViewHome';

export default function App() {



  return (
    <View style={[styles.container, styles.droidSafeArea]}>
      <ViewHome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
},
});
