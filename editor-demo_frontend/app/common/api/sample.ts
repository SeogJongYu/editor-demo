import {useQuery} from 'react-query';

export interface SampleAPIResponse {
  message: string;
}

export function useSampleAPI() {
  const result = useQuery<SampleAPIResponse>(['/sample_api/']);
  return result;
}
