/*
 * @Description: 
 * @Autor: yetm
 * @Date: 2019-11-14 11:23:16
 * @LastEditors: yetm
 * @LastEditTime: 2020-04-01 09:16:42
 */
import { SERVERURL } from "../config";
export const headersInit = () => {
  let queryArr = [];
  let token = [];
  const headersArr = [['Content-Type', 'application/json'], ['accept', 'application/json']];
  /*eslint-disable no-restricted-globals */
  if (typeof location !== 'undefined') {
    queryArr = location.search.replace(/^[?]/, '').split('&');
    token = ['Authorization'];
  }
  for (const item of queryArr) {
    if (item.match(/^(token)/) && item.split('=')[1]) {
      token.push(`Bearer ${item.split('=')[1]}`);
      break;
    }
  }
  if (token.length > 1) {
    headersArr.push(token);
  }
  return headersArr;
};
const request = async (option) => {
  try {
    const { url, body, method } = option;
    const header = headersInit();
    // const token = getConfig('token');
    // if (token) {
    //   header.push(['authorization', `Bearer ${token}`]);
    // }
    const res = await fetch(`${SERVERURL}${url}`, {
      method: method || 'get',
      credentials: 'include',
      cache: 'no-cache',
      mode: 'cors',
      headers: header,
      body: body,
    });
    if (res.status === 200 || res.status === 201) {
      return await res.json();
    } else if (res.status === 204) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export default request;
