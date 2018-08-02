import { StyleSheet } from 'react-native';

import { metrics, colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loading: {
    marginTop: metrics.basePadding,
  },

  columnContainer: {
    marginHorizontal: metrics.basePadding,
    justifyContent: 'space-between',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: metrics.baseMargin,
    marginHorizontal: metrics.basePadding,
  },

  button: {
    flexGrow: 1,
    backgroundColor: colors.light,
    alignItems: 'center',
    paddingVertical: 5,
  },

  buttonLeft: {
    borderTopLeftRadius: metrics.baseRadius,
    borderBottomLeftRadius: metrics.baseRadius,
  },

  buttonRight: {
    borderTopRightRadius: metrics.baseRadius,
    borderBottomRightRadius: metrics.baseRadius,
  },

  buttonText: {
    color: colors.regular,
  },

  buttonTextSelected: {
    color: colors.darker,
  },
});

export default styles;
