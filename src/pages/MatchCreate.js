import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DropDown from '../Component/PickerComponent';
import {cities, districts} from '../firebase/api';
import styles from '../style/styles';

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
    <View style={[styles.screenStyle, styles.spaceBetween]}>
      <View style={{width: '100%', gap: 15, padding: 20}}>
        <View style={styles.columnBox}>
          <Text style={styles.contentTitle}>지역</Text>
          <View
            style={{
              justifyContent: 'stretch',
              flexDirection: 'row',
              gap: 10,
            }}>
            <View style={{flex: 1}}>
              <DropDown
                items={cities}
                defaultValue={selectedCity ? selectedCity : '전체'}
                onChangeValue={handleCityChange}
              />
            </View>
            <View style={{flex: 1}}>
              <DropDown
                items={districts[selectedCity]}
                defaultValue={selectedDistrict ? selectedDistrict : '전체'}
                onChangeValue={handleDistrictChange}
              />
            </View>
          </View>
        </View>
        <View style={styles.columnBox}>
          <Text style={styles.contentTitle}>모임종류</Text>
          <View
            style={{
              justifyContent: 'stretch',
              flexDirection: 'row',
              gap: 10,
            }}>
            <View style={{flex: 1}}>
              <DropDown items={null} defaultValue={null} onChangeValue={null} />
            </View>
          </View>
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
            multiline
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
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('button눌렀엉')}>
          <Text style={styles.buttonText}>모임 만들기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatchCreate;
