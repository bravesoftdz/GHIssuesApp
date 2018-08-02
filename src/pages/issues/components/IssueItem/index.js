import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from 'styles';

import styles from './styles';

const IssueItem = ({ issue }) => (
  <View style={styles.container}>
    <Image
      style={styles.avatar}
      source={{
        uri: issue.user.avatar_url,
      }}
    />
    <View style={styles.infoContainer}>
      <Text style={styles.repoTitle} numberOfLines={1} ellipsizeMode="tail">
        {issue.title}
      </Text>
      <Text style={styles.infoText}>
        {issue.user.login}
      </Text>
    </View>
    <View style={styles.iconRightContainer}>
      <Icon name="angle-right" size={20} color={colors.regular} />
    </View>
  </View>
);

IssueItem.propTypes = {
  issue: PropTypes.shape({
    avatar_url: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default IssueItem;
