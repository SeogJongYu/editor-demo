import {css} from 'twin.macro';

import Config from '~/Config';
import useSampleAPI from '~/common/hooks/useSampleAPI';
import PlatformComponent from '~/common/components/PlatformComponent';
import CommonComponent from '~/common/components/CommonComponent';

import './WebApp.scss';

/**
 * Example Component
 *
 * 로고 출력 및 샘플 API 연동
 */
function WebApp() {
  const sampleAPIData = useSampleAPI();

  return (
    <div
      tw="text-center flex flex-col items-center content-center h-screen text-xl bg-gray-100"
      css={{label: 'container'}}>
      <header>
        <div
          tw="text-center"
          css={css`
            @keyframes logo-bounce {
              0%,
              100% {
                transform: translateY(0);
              }

              50% {
                transform: translateY(-100px);
                width: calc(836.2px / 2);
              }
            }

            @media (prefers-reduced-motion: no-preference) {
              animation: logo-bounce infinite 1s;
            }

            width: 836.2px;
            height: 502.4px;
            margin-top: 150px;
            label: logo-container;
          `}>
          <img
            tw="h-full w-full"
            css={{label: 'logo-image'}}
            src={require('~/common/assets/logo.png')}
            alt="logo"
          />
        </div>
        <p>
          Platform: <PlatformComponent />
          <br />
          API Server: {Config.API_SERVER}
          <br />
          API Response: {sampleAPIData.message}
          <br />
        </p>
        <CommonComponent />
      </header>
    </div>
  );
}

export default WebApp;
