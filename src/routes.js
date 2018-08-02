import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { metrics, colors } from 'styles';
import Repositories from 'pages/repositories';
import Issues from 'pages/issues';
// import HeaderRight from 'components/HeaderRight';

const createNavigator = (isLogged = false) => StackNavigator(
  {
    Repositories: { screen: Repositories },
    Issues: { screen: Issues },
  },
  {
    initialRouteName: 'Repositories',
    navigationOptions: {
      headerStyle: {
        paddingHorizontal: metrics.basePadding,
      },
    },
  },
);

export default createNavigator;
