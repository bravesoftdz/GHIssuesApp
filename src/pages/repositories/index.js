import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from 'services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import RepositoryItem from './components/RepositoryItem';

import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    title: 'GitIssues',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    data: [],
    loadingNewRepo: false,
    messageError: null,
    repoInput: '',
    loading: true,
  };

  componentDidMount() {
    this.loadRepostorioes();
  }

  openRepo = (repo) => {
    this.props.navigation.navigate('Issues', { repo });
  };

  saveRepo = async (repositories) => {
    await AsyncStorage.setItem('@GitIssues:repositories', JSON.stringify(repositories));
  };

  addNewRepo = async () => {
    const { repoInput, data } = this.state;
    if (repoInput.length) {
      this.setState({
        loadingNewRepo: true,
        messageError: false,
      });
      try {
        const response = await api.get(`/repos/${repoInput}`);
        console.tron.log('newresponse', response);
        this.setState(
          {
            data: data.filter(repo => repo.id === response.data.id).length
              ? [...data]
              : [response.data, ...data],
            repoInput: '',
            loading: false,
            loadingNewRepo: false,
          },
          () => {
            this.saveRepo(this.state.data);
          },
        );
      } catch (err) {
        this.setState({
          loadingNewRepo: false,
          messageError: 'Repositório não encontrado, por favor, tente outro...',
        });
      }
    }
  };

  loadRepostorioes = async () => {
    this.setState({ loading: true });

    const repositories = JSON.parse(await AsyncStorage.getItem('@GitIssues:repositories')) || [];

    this.setState({
      data: repositories,
      loading: false,
    });
  };

  renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.openRepo(item)}>
      <RepositoryItem repository={item} />
    </TouchableOpacity>
  );

  renderList = () => (
    <FlatList
      data={this.state.data}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderListItem}
    />
  );

  render() {
    const {
      repoInput, loadingNewRepo, loading, messageError,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Adicionar novo repositório"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={repoInput}
            onChangeText={repoInputText => this.setState({ repoInput: repoInputText })}
          />

          <TouchableOpacity style={styles.button} onPress={this.addNewRepo}>
            {loadingNewRepo ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.buttonText}>
                <Icon name="plus" size={20} color="#000" />
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {!!messageError && (
        <Text style={styles.error}>
          {messageError}
        </Text>
        )}
        <View style={styles.divider} />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
