import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';


const appOpenAdShow = (adUnitId) => {
    const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
    });


    appOpenAd.load();

    appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
        console.log('App open ad loaded');
        appOpenAd.show();
    });

    appOpenAd.addAdEventListener(AdEventType.ERROR, () => {
        console.log('App open ad failed to load');
    });

    appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('App open ad closed');
    });

    return appOpenAd;
}

export default appOpenAdShow;
