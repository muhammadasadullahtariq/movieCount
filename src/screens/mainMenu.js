import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './settings';
import Icon from 'react-native-vector-icons/Feather';
import AntDwesign from 'react-native-vector-icons/AntDesign';
import * as COLORS from '../constants/colors';
import GamesList from './homeList';
import FatIcon from 'react-native-vector-icons/Fontisto';
import LikedMovies from './likedMoviesList';
import LikedDramas from './likedDramaList';

const Tab = createBottomTabNavigator();

function MyTabs() {
  global.id = '62e44832a1c31b17ba2e18a9';
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height: 100,
          bottom: 0,
          backgroundColor: COLORS.white,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={GamesList}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <AntDwesign
                name="home"
                color={focused ? COLORS.primary : COLORS.secondryColor}
                size={25}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Movies"
        component={LikedMovies}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="clock"
                color={focused ? COLORS.primary : COLORS.secondryColor}
                size={25}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Dramas"
        component={LikedDramas}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="tv"
                color={focused ? COLORS.primary : COLORS.secondryColor}
                size={25}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TopTen"
        component={LikedDramas}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FatIcon
                name="stuck-out-tongue"
                color={focused ? COLORS.primary : COLORS.secondryColor}
                size={25}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="menu"
                color={focused ? COLORS.primary : COLORS.secondryColor}
                size={25}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
