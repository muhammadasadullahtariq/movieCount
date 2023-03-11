import {
  InterstitialAd,
  AdEventListener,
  AdEventType,
} from 'react-native-google-mobile-ads';
import {config} from '../constants/adKeys';
import {Platform} from 'react-native';

const appInterstitial = next => {
  //create interstitial add
  const interstitialAd = InterstitialAd.createForAdRequest(
    Platform.OS === 'ios'
      ? config.interstitial.ios
      : config.interstitial.android,
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    },
  );

  //load interstitial add
  interstitialAd.load();

  //add event listener
  interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
    console.log('Interstitial ad loaded');
    interstitialAd.show();
    next();
  });

  interstitialAd.addAdEventListener(AdEventType.ERROR, err => {
    console.log('Interstitial ad failed to load', err);
    next();
  });

  interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
    console.log('Interstitial ad closed');
    next();
  });

  return interstitialAd;
};

export default appInterstitial;
