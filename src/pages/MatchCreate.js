import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import DropDown from '../Component/PickerComponent';
import {
  component_height,
  component_radius,
  font_lg,
  font_md,
  primary_color,
  cities,
  districts,
} from '../firebase/api';

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
            numberOfLines={4}
            maxLength={300}
            // onChangeText={(text) => this.setState({text})}
            // value={this.state.text}
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
      <TouchableOpacity
        style={[styles.button]}
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
