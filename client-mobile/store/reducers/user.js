import { USER_LOGIN, USER_LOGOUT, USER_TOKEN_USERID } from "../actionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  access_token: null,
  userId: null,
}

function user(state = initialState, action) {
  if (action.type === USER_LOGIN) {
    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('access_token', value.access_token)
        await AsyncStorage.setItem('userId', value.id)
      } catch (e) {
        console.log('error access_token')
      }
    }

    storeData(action.payload);

    return {
      ...state,
      access_token: action.payload.access_token,
      userId: action.payload.id,
    }
  } else if (action.type === USER_LOGOUT) {
    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem('access_token')
        await AsyncStorage.removeItem('userId')
      } catch (e) {
        console.log(e)
      }
    }

    removeValue();

    return {
      ...state,
      access_token: 'token',
      userId: 'userId',
    }
  } else if (action.type === USER_TOKEN_USERID) {
    let access_token_reducer = '';
    let userId_reducer = '';

    const getData = async () => {
      try {
        const access_token_storage = await AsyncStorage.getItem('access_token');
        const userId_storage = await AsyncStorage.getItem('userId');

        access_token_reducer = access_token_storage;
        userId_reducer = userId_storage;
      } catch (e) {
        console.log(e)
      }
    }

    getData();

    return {
      ...state,
      access_token: access_token_reducer,
      userId_reducer: userId_reducer,
    }
  }

  return state;
}

export default user;
