import {useState, useEffect} from 'react';

import Config from '~/config';

/**
 * 샘플 API 연동 훅
 * @category Hooks
 */
function useSampleAPI() {
  const [responseData, setResponseData] = useState({message: ''});

  useEffect(() => {
    fetch(`${Config.API_SERVER}/samples/`)
      .then((response) => response.json())
      .then((json) => setResponseData(json))
      .catch(() => {
        setResponseData({message: 'Unable to connect to Sample API'});
      });
  }, []);

  return responseData;
}

export default useSampleAPI;
