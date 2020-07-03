/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MainStackNavigator from './src/MainStackNavigator';
import SplashScreen from 'react-native-splash-screen';

class App extends Component {
  componentDidMount(){
    SplashScreen.hide();
    
  }
  render() { 
    return <MainStackNavigator />;
  }
}

const styles = StyleSheet.create({});

export default App;
