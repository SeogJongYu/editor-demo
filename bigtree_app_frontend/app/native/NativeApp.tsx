import {useEffect, useRef} from 'react';
import {
  Text,
  Animated,
  Easing,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import styled, {css} from '@emotion/native';

import Config from '~/Config';
import PlatformComponent from '~/common/components/PlatformComponent';
import CommonComponent from '~/common/components/CommonComponent';
import {useSampleAPI} from '~/common/api/sample';

const LogoImage = styled(Animated.Image)`
  flex: 1;
  align-self: center;
  resize-mode: contain;
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
    <LogoImage source={require('~/common/assets/logo.png')} style={{width}} />
  );
}

function NativeApp() {
  const {data: sampleAPIData} = useSampleAPI();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={css`
          flex: 1;
          justify-content: center;
        `}>
        <View
          style={css`
            height: 200px;
            padding: 20px;
          `}>
          <AnimatedLogo />
        </View>
        <Text
          style={css`
            text-align: center;
          `}>
          Platform: <PlatformComponent />
          {'\n'}
          API Server: {Config.API_SERVER}
          {'\n'}
          API Response: {sampleAPIData?.message}
          {'\n'}
          <CommonComponent />
        </Text>
      </SafeAreaView>
    </>
  );
}

export default NativeApp;
