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
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((result) => dispatch(loginUser(result)))
      .catch((err) => {
        throw err
      })
  }
}

export const loginUser = (payload) => {
  return {
    type: USER_LOGIN,
    payload: payload,
  }
}

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  }
}

export const userRegister = (payload) => {
  return async (dispatch) => {
    return await fetch('https://hacktiv8-instafood.herokuapp.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((result) => dispatch(loginUser(result)))
      .catch((err) => {
        throw err;
      })
  }
}