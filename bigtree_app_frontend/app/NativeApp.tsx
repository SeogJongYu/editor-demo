import {useEffect, useRef} from 'react';
import {Animated, Easing, StatusBar} from 'react-native';
import styled from '@emotion/native';

import Config from '~/Config';
import useSampleAPI from '~/hooks/useSampleAPI';

import PlatformComponent from './components/PlatformComponent';
import CommonComponent from './components/CommonComponent';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

const LogoWrapper = styled.View`
  height: 200px;
  padding: 20px;
`;

const LogoImage = styled(Animated.Image)`
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

  return (
    <LogoImage
      as={Animated.Image}
      source={require('~/assets/logo.png')}
      style={{width}}
    />
  );
}

function NativeApp() {
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

export default NativeApp;
