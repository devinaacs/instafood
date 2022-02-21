import { USER_LOGIN, USER_LOGOUT } from "../actionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  access_token: null
}

function user(state = initialState, action) {
  if (action.type === USER_LOGIN) {
    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('access_token', value)
      } catch (e) {
        console.log('error access_token')
      }
    }

    storeData(action.payload);

    return {
      ...state,
      access_token: action.payload,
    }
  } else if (action.type === USER_LOGOUT) {
    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem('access_token')
      } catch (e) {
        console.log(e)
      }
    }

    removeValue();

    return {
      ...state,
      access_token: null
    }
  }

  return state;
}

export default user;
