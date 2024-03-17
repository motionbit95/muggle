import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  component_height,
  component_radius,
  primary_color,
  font_lg,
  font_md,
} from '../firebase/api';

const Interest2 = ({navigation}) => {
  return (
    <View style={styles.screenStyle}>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', gap: 15, padding: 20}}>
          <View style={{width: '100%', paddingTop: 10}}>
            <Text>내용이들어갑니다.</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('인트로')}>
        <Text style={styles.buttonText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Interest2;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: primary_color,
    borderRadius: component_radius,
    height: component_height,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnBox: {
    flexDirection: 'column',
    gap: 10,
  },
  contentTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  contentText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(187, 187, 187, 1)',
  },
  contentBox: {
    borderColor: 'rgba(221, 221, 221, 1)',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    fontSize: font_md,
  },
});
