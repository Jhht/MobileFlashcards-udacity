import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import HomeView from '../views/HomeView';
import AddDeckView from '../views/AddDeckView';
import QuizView from '../views/QuizView';
import AddQuestionView from '../views/AddQuestionView';
import QuizRunningView from '../views/QuizRunningView';


/*
 *  Tab menu 
 */
export const Tabs = TabNavigator({
  HomeView: {
    screen: HomeView,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => 
          <Ionicons name="ios-home" size={30} color={tintColor} />
    },
  },
  AddDeckView: {
    screen: AddDeckView,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => 
        <FontAwesome name="plus-square" size={30} color={tintColor} />
    },
  },

});


export const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  NewDeck: {
    screen: AddDeckView,
  },
  Quiz: {
    screen: QuizView,
  },
  NewCard: {
    screen: AddQuestionView,
  },
  QuizRunning: {
    screen: QuizRunningView,
  }
});