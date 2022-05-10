/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useState } from 'react';
import Navigator from './routes/homeStack'
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './routes/bottomStack';
import AuthContext from './context/auth-context';

import HomeStack from './routes/homeStack';

const App = () => {
  const mState = {
    isLoggedIn: false,
  }
  const [state, setState] = useState(mState)

  return (
    <AuthContext.Provider value={{ state, setState }}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
