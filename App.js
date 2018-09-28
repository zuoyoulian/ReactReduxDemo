/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import store from './redux/store';

import First from './First';
import Second from './Second';
import Third from './Third';

const AppNavigator = StackNavigator(
  {
      First: { screen: First },
      Second: { screen: Second },
      Third: { screen: Third },
  },
  { headerMode: 'float' },
);

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

