import React, {useState, useEffect, useRef} from 'react';
import {Alert, AppState} from 'react-native';
import Navigation from './src/routers/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AdEventType,
  AppOpenAd,
  MobileAds,
} from 'react-native-google-mobile-ads';

export default function App() {
  const [config, setConfig] = useState(null);
  const appState = useRef(AppState.currentState);
  const appOpenAd = useRef(null);
  const appOpenAdLoaded = useRef(null);
  const appOpenListener = useRef(null);

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          showOpenAds();
        }

        appState.current = nextAppState;
      },
    );
    getAdIds();

    return () => {
      appStateListener.remove();
      if (appOpenListener && appOpenListener.current) {
        appOpenListener.current();
      }
    };
  }, []);

  useEffect(() => {
    if (config && config.OPEN_ADS) {
      appOpenAd.current = AppOpenAd.createForAdRequest(config.OPEN_ADS);
      appOpenListener.current = appOpenAd.current.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          appOpenAd.current.load();
          appOpenAdLoaded.current = false;
        },
      );
      appOpenListener.current = appOpenAd.current.addAdEventListener(
        AdEventType.ERROR,
        () => {
          appOpenAdLoaded.current = false;
        },
      );
      appOpenListener.current = appOpenAd.current.addAdEventListener(
        AdEventType.LOADED,
        () => {
          appOpenAdLoaded.current = true;
        },
      );
      appOpenAd.current.load();
    }
  }, [config]);

  const getAdIds = async () => {
    try {
      const status = await MobileAds().initialize();
      const addID = await fetch('http://teslamobileapp.com:3000/users/movie11');
      const addIDJson = await addID.json();
      setConfig(addIDJson);
      await AsyncStorage.setItem('config', JSON.stringify(addIDJson));
      console.log(addIDJson);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Please check your connection', [
        {text: 'OK', onPress: getAdIds},
      ]);
    }
  };

  const showOpenAds = () => {
    if (config && config.OPEN_ADS) {
      if (appOpenAdLoaded.current) {
        appOpenAd.current.show();
      } else {
        appOpenAd.current.load();
      }
    }
  };

  return <Navigation />;
}
