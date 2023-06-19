import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import TimerScreen from './TimerScreen';
import RecordsScreen from './RecordsScreen';
import MeditationScreen from './MeditationScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style: styles.tabBar,
          labelStyle: styles.tabLabel,
        }}
        tabBarPosition="bottom"
      >
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Records" component={RecordsScreen} />
        <Tab.Screen name="Meditation" component={MeditationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    borderTopWidth: 0,
  },
  tabLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});
