/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';

import axios from 'axios';
import {WebView} from 'react-native-webview';
import Loader from './components/common/Loader';
console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    apiData: null,
    modalVisible: false,
    showWebView: false,
    activeWebviewUrl: false,
  };

  componentDidMount() {
    this._getApiData();
  }

  _getApiData() {
    this.setState({modalVisible: true});
    let url =
      'https://api.everythingishere.top/stories/all/hn,reddit,ph,slashdot,dn,github,medium,lifehacker';

    axios
      .get(url)
      .then(response => {
        this.setState({
          apiData: response.data,
          modalVisible: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({modalVisible: false});
      });
  }

  renderContent() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showWebView}
        onRequestClose={() => this.setState({showWebView: false})}>
        <WebView source={{uri: this.state.activeWebviewUrl}} />
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader modalVisible={this.state.modalVisible}></Loader>

        {this.renderContent()}

        <SafeAreaView>
          <ScrollView>
            <Text style={styles.sectionTitle}>Everything Is Here</Text>

            <FlatList
              data={this.state.apiData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      showWebView: true,
                      activeWebviewUrl: item.url,
                    })
                  }>
                  <View style={styles.item}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.author}>
                      By: {item.author} Source: {item.one_sources[0]}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    padding: 20,
    textAlign: 'center',
    flex: 1,
  },
  item: {
    padding: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  itemTitle: {
    color: '#333',
    lineHeight: 25,
    fontSize: 16,
    marginBottom: 10,
  },
  author: {
    color: '#9E9E9E',
  },
});
