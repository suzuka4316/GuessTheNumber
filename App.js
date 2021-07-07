import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import { Header } from './components';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess The Number" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
