import axios, { AxiosResponse } from 'axios';

interface IPutRequestOptions {
  qs?: any,
  headers?: any,
}

interface IPutRequest {
  url: string,
  requestBody?: any,
  options?: IPutRequestOptions
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error: any = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response: AxiosResponse) {
  return response.data;
}

export function getQueryString(params: any) {
  if (!params) { return ''; }
  const esc = encodeURIComponent;
  return `/search?${Object.keys(params)
    .filter((param) => params[param] !== null && params[param] !== undefined)
    .map((param) => `${esc(param)}=${esc(params[param])}`).join('&')}`;
}

/**
 * Fetch data from base API
 * @param url
 * @param options
 * @returns {Promise<any>}
 */
function fetch(url: string, options: any = {}) {
  const newOptions = options;
  newOptions.headers = { Accept: 'application/json' };

  if (options && options.xApiKey) {
    newOptions.headers['X-API-Key'] = options.xApiKey;
  }

  const requestURL = `${url}${getQueryString(options.qs)}`;
  return axios.get(requestURL, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .catch((err) => {
      console.error(requestURL, err);
      throw err;
    });
}

/**
 * DELETE data from base API
 * @param url
 * @param options
 * @returns {Promise<any>}
 */
function remove(url: string, options: any = {}) {
  const newOptions = options;
  newOptions.headers = { Accept: 'application/json' };

  if (options && options.xApiKey) {
    newOptions.headers['X-API-Key'] = options.xApiKey;
  }

  return axios.get(url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .catch((err) => {
      console.error(url, err);
      throw err;
    });
}

/**
 * PUT data from base API
 * @param url
 * @param options
 * @returns {Promise<any>}
 */
function put({ url, requestBody, options }: IPutRequest) {
  const newOptions: IPutRequestOptions = { ...options };
  newOptions.headers = { Accept: 'application/json' };
  const requestURL = `${url}${getQueryString(newOptions.qs)}`;
  return axios.put(requestURL, requestBody, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .catch((err) => {
      console.error(requestURL, err);
      throw err;
    });
}

/**
 * POST data into base API
 * @param url
 * @param requestBody
 * @param options
 * @returns {Promise<any>}
 */
function post(url: string, requestBody: any, options: any = {}) {
  const newOptions = options;
  const jsonHeader = { Accept: 'application/json' };
  if (newOptions.headers) {
    newOptions.headers = {
      ...jsonHeader,
      ...newOptions.headers
    };
  } else {
    newOptions.headers = jsonHeader;
  }
  const requestURL = `${url}${getQueryString(options.qs)}`;
  return axios.post(requestURL, requestBody, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .catch((err) => {
      console.error(requestURL, err);
      throw err;
    });
}

const requestService = {
  fetch, put, post, remove
};

export default requestService;
