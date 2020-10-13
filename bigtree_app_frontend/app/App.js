import React from 'react';

import styled, {keyframes} from 'styled-components';

import PlatformComponent from './components/PlatformComponent';
import CommonComponent from './components/CommonComponent';
import useSampleAPI from '~/hooks/useSampleAPI';
import Config from '~/Config';

import logo from '~/assets/logo.png';

const animation = keyframes`
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-100px);
    width: calc(836.2px / 2);
  }
`;

const Container = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #eeee;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: black;
`;

const AppLogoWrapper = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${animation} infinite 1s;
  }

  width: 836.2px;
  height: 502.4px;
`;

const AppLogo = styled.img`
  width: 100%;
  height: 100%;
`;

/**
 * Example Component
 * 로고 출력 및 샘플 API 연동
 * @category App
 */
function App() {
  const sampleAPIData = useSampleAPI();

  return (
    <Container>
      <Header>
        <AppLogoWrapper>
          <AppLogo src={logo} alt="logo" />
        </AppLogoWrapper>
        <p>
          Platform: <PlatformComponent />
          <br />
          API Server: {Config.API_SERVER}
          <br />
          API Response: {sampleAPIData.message}
          <br />
        </p>
        <CommonComponent />
      </Header>
    </Container>
  );
}

export default App;
