export const headersInit = () => {
  let queryArr: string[] = [];
  let token: string[] = [];
  const headersArr = [['Content-Type', 'application/json'], ['accept', 'application/json']];
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
const request = async (option: {
  url: string;
  method?: string;
  body?: string;
  origin?: string;
}) => {
  try {
    const { url, body, method } = option;
    const header = headersInit();
    // const token = getConfig('token');
    // if (token) {
    //   header.push(['authorization', `Bearer ${token}`]);
    // }
    const res = await fetch(url, {
      method: method || 'get',
      credentials: 'include',
      cache: 'no-cache',
      mode: 'cors',
      headers: header,
      body: body,
    });
    switch (res.status) {
      case 200:
        return await res.json();
      case 404:
      // Router.push("/");
    }
  } catch (error) {
    throw error;
  }
};

export default request;
