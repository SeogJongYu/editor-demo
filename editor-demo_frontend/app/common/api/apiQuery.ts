import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {QueryFunctionContext, QueryKey} from 'react-query';

import Config from '~/Config';

export type APIQueryKey = QueryKey | [axiosConfig: AxiosRequestConfig];
export type APIQueryError<T = unknown> = AxiosError<T>;

interface APIQueryContext {
  queryKey: QueryFunctionContext['queryKey'];
  pageParam?: number;
}

const apiAxios = axios.create({
  baseURL: Config.API_SERVER,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

async function apiQuery<T = unknown>({queryKey, pageParam}: APIQueryContext) {
  let options: AxiosRequestConfig = {};

  if (typeof queryKey[0] === 'string') {
    options.url = queryKey[0];
  }

  if (typeof queryKey[queryKey.length - 1] === 'object') {
    options = {
      ...options,
      ...(queryKey[queryKey.length - 1] as AxiosRequestConfig),
    };
  }

  if (pageParam) {
    options.params = {
      ...(options.params ?? {}),
      page: pageParam,
    };
  }

  const {data} = await apiAxios.request<T>(options);

  return data;
}

export default apiQuery;
