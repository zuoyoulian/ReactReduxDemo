import { combineReducers } from 'redux';

import { ADD_USERNAME, ADD_USEGENDER } from './action';

/*
  创建reducer函数
  返回新的state
*/
function todoUser(state = {}, action) {
    switch (action.type) {
    case ADD_USERNAME:
        return { ...state, userName: action.userName };
    case ADD_USEGENDER:
        return { ...state, userGender: action.userGender };
    default:
        return state;
    }
}

// 将所有reducer合并成一个大的对象
const todoApp = combineReducers({ user: todoUser });

export default todoApp;
