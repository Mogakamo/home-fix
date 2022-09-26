import {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import React from 'react';

export function WithSplashScreen({
  children,
  isAppReady,
}: {
  children: React.ReactNode;
  isAppReady: boolean;
}) {
  return (
    <>
      {isAppReady && children}
      <SplashScreen isAppReady={isAppReady} />
    </>
  );
}

const LOADING_IMAGE = 'Loading image';
const FADE_IN_IMAGE = 'Fade in image';
const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';

export default function SplashScreen({isAppReady}: {isAppReady: boolean}) {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState<
    | typeof LOADING_IMAGE
    | typeof FADE_IN_IMAGE
    | typeof WAIT_FOR_APP_TO_BE_READY
    | typeof FADE_OUT
    | typeof HIDDEN
  >(LOADING_IMAGE);

  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 10000, // Fade in duration
        useNativeDriver: true,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) return null;

  return (
    <Animated.View
      collapsable={false}
      style={[style.container, {opacity: containerOpacity}]}>
      <Animated.Image
        source={require('../assets/splash.png')}
        fadeDuration={0}
        style={[style.image, {opacity: imageOpacity}]}
        onLoad={() => setState(FADE_IN_IMAGE)}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(79, 91, 16, 0.2)', //<-- set the background color to the apps color
    alignItems: 'center',
    
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});
