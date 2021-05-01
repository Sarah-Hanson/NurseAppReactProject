import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Navigator} from './src/Navigation/Navigator';
import {StateProvider} from './src/StateProvider';
import {axiosConfig} from './src/axiosConfig';
import {colors} from './src/Common/common';
import {Provider as PaperProvider} from 'react-native-paper';
import {initialState, reducer} from './src/ActionHandler';

const App = () => {
  axiosConfig();

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <PaperProvider>
        <SafeAreaView
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: colors.plum,
          }}>
          <Navigator />
        </SafeAreaView>
      </PaperProvider>
    </StateProvider>
  );
};

export default App;
