import querystring from "querystring";
import axios from "axios";

const WITH_CREDENTIALS = true;
const CONTENT_TYPE = "Content-Type";
const JSON_CHARSET = "application/json;charset=UTF-8";
const HEADEERS = { Accept: "application/json", [CONTENT_TYPE]: JSON_CHARSET };

/**
 * 发起一个请求
 * @param {string} method HTTP method
 * @param {string} url 请求的目标 URL
 * @param {object} params 请求参数对象
 * @param {object} opts 请求选项
 */
export async function request(method, url, params, opts) {
  opts = Object.assign({}, opts);
  params = Object.assign({}, params);
  const headers = Object.assign({}, HEADEERS, opts.headers);
  const withCredentials = opts.withCredentials || WITH_CREDENTIALS;
  let query, config;
  config = {
    method: method,
    url: `http://47.92.88.235:8082/${url}`,
    headers: headers,
    withCredentials: withCredentials,
    timeout: 6000
  };
  url = `http://47.92.88.235:8082/${url}`;
  switch (method) {
    case "GET":
      query = querystring.stringify(params);
      const url_query =
        JSON.stringify(params) === "{}" ? url : `${url}?${query}`;
      config = Object.assign(config, { params: params });
      break;
    case "POST":
      config = Object.assign(config, { data: params });
      break;
    case "PUT":
      config = Object.assign(config, { data: params });
      break;
    case "DELETE":
      config = Object.assign(config, { data: params });
      break;
  }
  axios.interceptors.request.use(
    function(config) {
      //在请求发出之前进行一些操作
      return config;
    },
    function(err) {
      //Do something with request error
      return Promise.reject(err);
    }
  );
  axios.interceptors.response.use(
    response => {
      // Do something with response data
      return response;
    },
    err => {
      const res = JSON.parse(JSON.stringify(err));
      // const status = res.response.status;
      // const params = {
      //   title: ''
      // }
      // switch (status) {
      //   case 401: params.title = '未授权，请重新登录'; break;
      //   case 403: params.title = '拒绝访问'; break;
      //   case 404: params.title = '请求出错'; break;
      //   case 408: params.title = '请求超时'; break;
      //   case 501: params.title = '服务未实现'; break;
      //   case 502: params.title = '网络错误'; break;
      //   case 503: params.title = '服务不可用'; break;
      //   case 504: params.title = '网络超时'; break;
      //   case 505: params.title = 'HTTP版本不受支持'; break;
      // }
      return res;
    }
  );
  try {
    const res = await axios(config);

    return res;
  } catch (e) {
    console.log(e);

    return {};
  }
}

/**
 * 发起一个 get 请求
 * @param {*} args 参数：url,param,opts
 */
export function get(...args) {
  return request("GET", ...args);
}

/**
 * 发起一个 post 请求
 * @param {*} args 参数：url,param,opts
 */
export function post(...args) {
  return request("POST", ...args);
}

/**
 * 发起一个 put 请求
 * @param {*} args 参数：url,param,opts
 */
export function put(...args) {
  return request("PUT", ...args);
}

/**
 * 发起一个 delete 请求
 * @param {*} args 参数：url,param,opts
 */
export function deletes(...args) {
  return request("DELETE", ...args);
}

request.request = request;
request.get = get;
request.post = post;
request.deletes = deletes;

export default request;
