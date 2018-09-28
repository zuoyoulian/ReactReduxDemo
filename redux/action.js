
/*
  action 类型
*/
export const ADD_USERNAME = 'ADD_USERNAME';
export const ADD_USEGENDER = 'ADD_USEGENDER';

/*
  action 创建函数
*/
export function addUserName(userName) {
    return { type: ADD_USERNAME, userName };
}

export function addUserGender(userGender) {
    return { type: ADD_USEGENDER, userGender };
}
