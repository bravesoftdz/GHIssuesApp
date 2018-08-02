import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from 'services/api';

import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Linking,
  AsyncStorage,
} from 'react-native';

import IssueItem from './components/IssueItem';

import styles from './styles';

export default class Issues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    repository: {},
    filter: 'all',
    loading: true,
    refreshing: false,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam('repo');
    const filter = await AsyncStorage.getItem('@Githuber:issuesState');
    this.setState(
      {
        repository: item,
        filter: filter || this.state.filter,
      },
      this.loadIssues,
    );
  }

  loadIssues = async () => {
    const { repository, filter } = this.state;
    this.setState({ loading: true, refreshing: true });

    try {
      const { data: repositories } = await api.get(
        `repos/${repository.full_name}/issues?state=${filter}`,
      );

      this.setState({
        data: repositories,
        loading: false,
        refreshing: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  changeFilter = async (issuesState) => {
    await AsyncStorage.setItem('@Githuber:issuesState', issuesState);

    this.setState(
      {
        filter: issuesState,
      },
      this.loadIssues,
    );
  };

  openURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          return console.log(`Can't handle url: ${url}`);
        }
        return Linking.openURL(url);
      })
      .catch(err => console.error('An error occurred', err));
  };

  renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.openURL(item.html_url)}>
      <IssueItem issue={item} />
    </TouchableOpacity>
  );

  renderList = () => (
    <FlatList
      data={this.state.data}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderListItem}
      onRefresh={this.loadIssues}
      refreshing={this.state.refreshing}
    />
  );

  render() {
    const { filter, loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={{ ...styles.button, ...styles.buttonLeft }}
            onPress={() => this.changeFilter('all')}
          >
            <Text style={filter !== 'all' ? styles.buttonText : styles.buttonTextSelected}>
              Todas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.changeFilter('open')}>
            <Text style={filter !== 'open' ? styles.buttonText : styles.buttonTextSelected}>
              Abertas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, ...styles.buttonRight }}
            onPress={() => this.changeFilter('closed')}
          >
            <Text style={filter !== 'closed' ? styles.buttonText : styles.buttonTextSelected}>
              Fechadas
            </Text>
          </TouchableOpacity>
        </View>
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
