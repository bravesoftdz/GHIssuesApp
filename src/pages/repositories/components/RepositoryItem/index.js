import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';

import { colors } from 'styles';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const checkRepoTypeUser = type => type.toUpperCase() === 'USER';

const RepositoryItem = ({ repository }) => (
  <View style={styles.container}>
    <Image
      style={styles.avatar}
      source={{
        uri: checkRepoTypeUser(repository.owner.type)
          ? repository.owner.avatar_url
          : repository.organization.avatar_url,
      }}
    />
    <View style={styles.infoContainer}>
      <Text style={styles.repoTitle}>
        {repository.name}
      </Text>
      <Text style={styles.infoText}>
        {checkRepoTypeUser(repository.owner.type)
          ? repository.owner.login
          : repository.organization.login}
      </Text>
    </View>
    <View style={styles.iconRightContainer}>
      <Icon name="angle-right" size={20} color={colors.regular} />
    </View>
  </View>
);

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
    stargazers_count: PropTypes.number,
    forks_count: PropTypes.number,
    watchers_count: PropTypes.number,
  }).isRequired,
};

export default RepositoryItem;
