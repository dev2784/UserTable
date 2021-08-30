import { call, put, takeEvery } from 'redux-saga/effects'

const apiUrl = `https://jsonplaceholder.typicode.com/users`;
function getApi() {
  return fetch(apiUrl, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',

      }
  }).then(response => response.json())
    .catch((error) => {throw error})
}

function* fetchUsers(action) {
   try {
      const users = yield call(getApi);
      let filteredData = users.filter(value => {
         return (
               value.name.toLowerCase().includes(action.payload.toLowerCase()) ||
               value.email.toLowerCase().includes(action.payload.toLowerCase())||
               value.website.toLowerCase().includes(action.payload.toLowerCase())
            );
         });
      console.log(filteredData)
      yield put({type: 'GET_USERS_SUCCESS', users: filteredData});
   } catch (e) {
      yield put({type: 'GET_USERS_FAILED', message: e.message});
   }
}

function* userSaga() {
   yield takeEvery('GET_USERS_REQUESTED', fetchUsers);
}

export default userSaga;