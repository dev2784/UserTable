import * as type from './../types';

export function getUsers(payload) {
    return {
      type: type.GET_USERS_REQUESTED,
      payload: payload,
    }
  }