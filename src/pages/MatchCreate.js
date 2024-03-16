import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const MatchCreate = () => {
  return (
    <View style={styles.screenStyle}>
      <View>
        <Text>모임개설</Text>
      </View>
      <View>
        <Text>폼</Text>
      </View>
      <View>
        <Text>버튼</Text>
      </View>
    </View>
  );
};

export default MatchCreate;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    gap: 30,
  },
});
