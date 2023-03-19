import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainMenu from '../screens/mainMenu';
import Splash from '../screens/splash';
import GamesList from '../screens/homeList';
import Help from '../screens/help';
import MovieDetailScreen from '../screens/movieDetailScreen';
import DramaDetailScreen from '../screens/dramaDetailScreen';
import DramaSeasons from '../screens/dramaSeasons';
import DramaEpisodes from '../screens/dramaEpisodes';
import TopTen from '../screens/topTen';
import {primary} from '../constants/colors';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={primary} />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="gamesList"
          component={GamesList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MovieDetailScreen"
          component={MovieDetailScreen}
          options={{headerShown: true, title: 'Movie Detail'}}
        />
        <Stack.Screen
          name="DramaDetailScreen"
          component={DramaDetailScreen}
          options={{headerShown: true, title: 'Drama Detail'}}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="DramaSeasons"
          component={DramaSeasons}
          options={{headerShown: true, title: 'Drama Seasons'}}
        />

        <Stack.Screen
          name="DramaEpisodes"
          component={DramaEpisodes}
          options={{headerShown: true, title: 'Drama Episodes'}}
        />
        <Stack.Screen
          name="TopTen"
          component={TopTen}
          options={{headerShown: true, title: 'Top Ten'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
