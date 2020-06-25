// @flow
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StatusBar} from 'react-native';

import styled from 'styled-components/native';

import PlatformComponent from './components/PlatformComponent';
import CommonComponent from './components/CommonComponent';

import Config from '~/config';
import useSampleAPI from '~/hooks/useSampleAPI';

import logo from '~/assets/logo.png';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

const LogoWrapper = styled.View`
  height: 200px;
  padding: 20px;
`;

const LogoImage = styled.Image`
  flex: 1;
  align-self: center;
  resize-mode: contain;
`;

const CenterText = styled.Text`
  text-align: center;
`;

function AnimatedLogo() {
  const width = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(width, {
          toValue: 250,
          duration: 500,
          easing: Easing.bounce,
          useNativeDriver: false,
        }),
        Animated.timing(width, {
          toValue: 100,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [width]);

  return <LogoImage as={Animated.Image} source={logo} style={{width}} />;
}

/**
 * Example Component
 * 로고 출력 및 샘플 API 연동
 * @returns JSX.Element
 */
function App() {
  const sampleAPIData = useSampleAPI();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Container>
        <LogoWrapper>
          <AnimatedLogo />
        </LogoWrapper>
        <CenterText>
          Platform: <PlatformComponent />
          {'\n'}
          API Server: {Config.API_SERVER}
          {'\n'}
          API Response: {sampleAPIData.message}
          {'\n'}
          <CommonComponent />
        </CenterText>
      </Container>
    </>
  );
}

export default App;
