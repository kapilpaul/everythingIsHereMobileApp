import React, {Component} from 'react';
import {View, StyleSheet, Modal, Image, Text} from 'react-native';

export default class Loader extends Component {
  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.modalVisible}>
          <View style={styles.loadingContainer}>
            <Image source={require('../../assets/images/ballSwing.gif')} />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 25,
  },
});
