import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
//import { verify, sign } from "jsonwebtoken";
//

// ----------------------------------------------------------------------

const isValidToken = accessToken => {
  if (!accessToken) {
    return false;
  }
  console.log('isValidToken', accessToken);
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  console.log('decoded is ', decoded);
  if (decoded.exp > currentTime) {
    console.log('Token is valid', decoded);
    return true;
  } else {
    console.log('Token is expired');
    return false;
  }
};

const handleTokenExpired = exp => {
  let expiredTimer;

  clearTimeout(expiredTimer);
  //const currentTime = Date.now();
  //const timeLeft = exp * 1000 - currentTime;
  //console.log(timeLeft);
  expiredTimer = setTimeout(() => {
    console.log('expired');
    global.sessionExpired = true;
  }, 10000);
};

const setUserId = token => {
  const decoded = jwtDecode(token);
  global.id = decoded.id;
};

const setSession = async token => {
  if (token) {
    //localStorage.setItem('accessToken', accessToken);
    try {
      await AsyncStorage.setItem('token', token);
      //handleTokenExpired();
      setUserId(token);
    } catch (e) {
      // saving error
      console.log('error', e);
    }
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    //localStorage.removeItem('accessToken');
    try {
      await AsyncStorage.removeItem('token');
    } catch (e) {
      // saving error
      console.log('error', e);
    }
  }
};

export {isValidToken, setSession};
