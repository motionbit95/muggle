import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../style/styles';

const Interest2 = ({navigation}) => {
  return (
    <View style={styles.screenStyle}>
      <ScrollView style={styles.scrollViewStyle}>
        <View style={[styles.contentStyle, {gap: 20}]}>
          <View style={{gap: 20}}>
            <View style={styles.rowBox}>
              <View style={styles.icon18} />
              <Text style={{color: 'black'}}>아웃도어 / 여행</Text>
            </View>
            <View style={styles.rowBox}>
              <View style={{flex: 1, height: 30, backgroundColor: 'gray'}} />
              <View style={{flex: 1, height: 30, backgroundColor: 'gray'}} />
              <View style={{flex: 1, height: 30, backgroundColor: 'gray'}} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('인트로')}>
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interest2;
