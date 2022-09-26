import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import HomePage from './src/screens/Homepage';
import {WithSplashScreen} from './src/screens/SplashScreen';

const App = () => {
  const store = useRef(undefined);
  const queryClient = useRef(undefined);

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // initialize().then((context) => {
    //   store.current = context.store
    //   queryClient.current = context.queryClient
    setIsAppReady(true);
  }, []);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <SafeAreaView>
        <Text>Homepage</Text>
      </SafeAreaView>
    </WithSplashScreen>
  );
};

export default App;
