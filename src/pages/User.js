import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
class User extends Component {
  render() {
    return (
      <View style={styles.screenStyle}>
        <Text>Hi</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default User;
