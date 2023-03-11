import React, {useState, useEffect, useRef} from 'react';
import {AppState, Platform} from 'react-native';
import Navigation from './src/routers/navigation';
import {
  AdEventType,
  AppOpenAd,
  MobileAds,
} from 'react-native-google-mobile-ads';
import {config} from './src/constants/adKeys';

export default function App() {
  const appState = useRef(AppState.currentState);
  const appOpenAd = useRef(null);
  const appOpenAdLoaded = useRef(null);
  const appOpenListener = useRef(null);
  useEffect(() => {
   MobileAds().initialize();
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
    return () => {
      appStateListener.remove();
      if (appOpenListener && appOpenListener.current) {
        appOpenListener.current();
      }
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      appOpenAd.current = AppOpenAd.createForAdRequest(config.continue.ios);
    } else {
      appOpenAd.current = AppOpenAd.createForAdRequest(config.continue.android);
    }
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
  }, []);

  const showOpenAds = () => {
    if (appOpenAdLoaded.current) {
      appOpenAd.current.show();
    } else {
      appOpenAd.current.load();
    }
  };
  return <Navigation />;
}
