import {useQuery} from 'react-query';

interface CSRFTokenResponse {
  csrftoken: string;
}

export function useCSRFToken() {
  const result = useQuery<CSRFTokenResponse>('/csrf_token/');
  return result;
}
