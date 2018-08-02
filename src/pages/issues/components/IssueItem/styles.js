import { StyleSheet } from 'react-native';

import { general, metrics, colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    ...general.box,
    marginHorizontal: metrics.basePadding,
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    flexGrow: 1,
  },

  repoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: metrics.baseMargin,
  },

  avatar: {
    width: 45,
    height: 45,
  },

  infoText: {
    color: colors.regular,
    fontSize: 12,
    marginLeft: metrics.baseMargin,
  },

  iconRightContainer: {
    marginLeft: metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
