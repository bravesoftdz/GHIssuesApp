import { StyleSheet } from 'react-native';

import { metrics, colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loading: {
    marginTop: metrics.basePadding,
  },

  form: {
    // marginTop: metrics.baseMargin * 2,
    marginRight: metrics.baseMargin,
    marginVertical: metrics.baseMargin * 2,
    paddingHorizontal: metrics.basePadding,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    paddingHorizontal: metrics.basePadding,
    backgroundColor: colors.white,
    borderColor: colors.light,
    borderRadius: metrics.baseRadius,
    borderWidth: 1,
    fontSize: 12,
    height: 35,
  },

  button: {
    backgroundColor: colors.transparent,
    borderRadius: metrics.baseRadius,
    marginLeft: metrics.baseMargin,
    height: 20,
    width: 20,
    maxWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: colors.darker,
    fontWeight: 'bold',
    fontSize: 14,
  },

  divider: {
    marginBottom: metrics.baseMargin,
    marginHorizontal: metrics.basePadding,
    borderBottomColor: colors.light,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  error: {
    color: colors.danger,
    fontSize: 12,
    marginHorizontal: metrics.basePadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
