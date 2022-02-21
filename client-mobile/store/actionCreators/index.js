import { USER_LOGIN, USER_LOGOUT } from "../actionTypes";

export const userLogin = (payload) => {
  return async (dispatch) => {
    return await fetch('https://hacktiv8-instafood.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((result) => dispatch(loginUser(result.access_token)))
      .catch((err) => console.log(err))
  }
}

export const loginUser = (access_token) => {
  return {
    type: USER_LOGIN,
    payload: access_token,
  }
}

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  }
}