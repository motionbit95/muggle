import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DropDown from '../Component/PickerComponent';

const MatchCreate = () => {
  return (
    <View style={styles.screenStyle}>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', gap: 15, padding: 20}}>
          <View style={{width: '100%', paddingTop: 5}} />

          <View style={styles.columnBox}>
            <Text style={styles.contentTitle}>지역</Text>
            <View style={styles.rowBox}>
              <View
                style={[
                  {
                    width: '48.5%',
                    height: 50,
                  },
                  styles.contentBox,
                ]}
              />
              <View
                style={[
                  {
                    width: '48.5%',
                    height: 50,
                  },
                  styles.contentBox,
                ]}
              />
            </View>
          </View>
          <View style={styles.columnBox}>
            <Text style={styles.contentTitle}>모임종류</Text>
            <View
              style={[
                {
                  width: '100%',
                  height: 50,
                },
                styles.contentBox,
              ]}
            />
          </View>
          <View style={styles.columnBox}>
            <Text style={styles.contentTitle}>모임 이름</Text>
            <TextInput
              style={[
                {
                  width: '100%',
                  height: 50,
                },
                styles.contentBox,
              ]}
              placeholder="모임 이름을 입력해주세요."
            />
          </View>
          <View style={styles.columnBox}>
            <Text style={styles.contentTitle}>모임목표</Text>
            <TextInput
              style={[
                {
                  width: '100%',
                  height: 150,
                },
                styles.contentBox,
              ]}
              placeholder="모임목표을 설명해주세요."
            />
          </View>
          <View style={styles.columnBox}>
            <Text style={styles.contentTitle}>정원</Text>
            <TextInput
              style={[
                {
                  width: '100%',
                  height: 50,
                },
                styles.contentBox,
              ]}
              placeholder="정원을 입력해주세요. (최대 300명)"
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('button눌렀엉')}>
        <Text style={styles.buttonText}>모임 만들기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchCreate;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'rgba(255, 206, 79, 1)',
    borderRadius: 15,
    height: 56,
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
    fontSize: 16,
  },
});
