/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {config} from '../constants/adKeys';

class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ADMOB_BANNER_ID:
        Platform.OS === 'ios' ? config.banner.ios : config.banner.android,
    };
    this.onAdmobBannerError = this.onAdmobBannerError.bind(this);
  }

  onAdmobBannerError(e) {
    console.warn('admob interstitial failed', e);
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          marginTop: 2,
          marginBottom: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {this.props.ADMOB_BANNER_ID && (
          <BannerAd
            size={BannerAdSize.BANNER}
            unitId={
              Platform.OS === 'ios' ? config.banner.ios : config.banner.android
            }
            onAdFailedToLoad={this.onAdmobBannerError}
          />
        )}
      </View>
    );
  }
}

export default Banner;
