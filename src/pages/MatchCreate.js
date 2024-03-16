import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DropDown from '../Component/PickerComponent';
import {cities, districts} from '../firebase/api';

const MatchCreate = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleCityChange = value => {
    setSelectedCity(value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = value => {
    setSelectedDistrict(value);
  };

  return (
    <View style={styles.screenStyle}>
      <View
        style={{
          backgroundColor: '#d9d9d9',
          width: '100%',
          gap: 15,
          paddingVertical: 10,
        }}>
        <View style={{width: '100%', gap: 10}}>
          <Text style={{fontSize: 18}}>지역</Text>
          <View
            style={{
              justifyContent: 'stretch',
              flexDirection: 'row',
              gap: 10,
            }}>
            <View style={{flex: 1}}>
              <DropDown
                items={cities}
                defaultValue={selectedCity}
                onChangeValue={handleCityChange}
              />
            </View>
            <View style={{flex: 1}}>
              <DropDown
                items={districts[selectedCity]}
                defaultValue={selectedDistrict}
                onChangeValue={handleDistrictChange}
              />
            </View>
          </View>
        </View>
        <View style={{width: '100%', gap: 10}}>
          <Text style={{fontSize: 18}}>모임종류</Text>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() => alert('구 선택')}
              style={styles.button}>
              <Text>카테고리 선택</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', gap: 10}}>
          <Text style={{fontSize: 18}}>모임 이름</Text>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() => alert('구 선택')}
              style={styles.button}>
              <Text>모임 이름을 입력해주세요</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', gap: 10}}>
          <Text style={{fontSize: 18}}>모임 목표</Text>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() => alert('구 선택')}
              style={styles.button}>
              <Text>모임목표</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', gap: 10}}>
          <Text style={{fontSize: 18}}>정원</Text>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() => alert('구 선택')}
              style={styles.button}>
              <Text>정원을 입력해주세요.(최대 300명)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: '#f1f1f1',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255, 206, 79, 1)',
            borderRadius: 15,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => alert('button눌렀엉')}>
          <Text>모임 만들기</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
  },
});
