import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {cities, districts} from '../../firebase/api';
import styles from '../../style/styles';
import {addDocument} from '../../firebase/firebase_func';
import auth from '@react-native-firebase/auth';
import DropDown from '../../Component/PickerComponent';

const GroupCreate = ({navigation}) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMatch, setSelectedMatch] = useState('머글 모임');

  const [matchName, setMatchName] = useState('');
  const [matchTarget, setMatchTarget] = useState('');
  const [matchPersonnel, setMatchPersonnel] = useState(0);
  const [matchDateTime, setMatchDateTime] = useState(new Date());
  const [matchPrice, setMatchPrice] = useState('나누기');
  const [matchImage, setMatchImage] = useState('');

  const handleCityChange = value => {
    setSelectedCity(value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = value => {
    setSelectedDistrict(value);
  };

  const createGroup = () => {
    if (!selectedCity || !selectedDistrict) {
      alert('지역을 선택하세요.');
      return;
    }
    if (!selectedMatch) {
      alert('모임종류를 선택하세요.');
      return;
    }
    if (!matchName) {
      alert('모임 이름를 입력하세요.');
      return;
    }
    if (!matchTarget) {
      alert('모임 목표를 입력하세요.');
      return;
    }
    if (!matchPersonnel) {
      alert('모임 정원을 입력하세요.');
      return;
    }

    const matchInfo = {
      createAt: new Date(),
      group_place: selectedCity + ' ' + selectedDistrict,
      group_type: selectedMatch,
      group_name: matchName,
      group_target: matchTarget,
      group_personnel: matchPersonnel,
      group_users: [auth().currentUser.uid],
      group_images: [],
      group_time: matchDateTime,
      group_price: matchPrice,
    };

    addDocument('group', matchInfo);
    console.log(matchInfo);

    navigation.navigate('Home', {
      screen: '모임상세',
      params: {data: matchInfo},
    });
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
              <DropDown
                items={['머글 모임', '클래스 모임', '비지니스 모임']}
                defaultValue={selectedMatch}
                onChangeValue={setSelectedMatch}
              />
            </View>
          </View>
        </View>
        <View style={styles.columnBox}>
          <Text style={styles.contentTitle}>모임 이름</Text>
          <TextInput
            onChange={e => setMatchName(e.nativeEvent.text)}
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
            onChange={e => setMatchTarget(e.nativeEvent.text)}
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
            onChange={e => setMatchPersonnel(e.nativeEvent.text)}
            style={[
              {
                width: '100%',
                height: 50,
              },
              styles.contentBox,
            ]}
            keyboardType="number-pad"
            placeholder="정원을 입력해주세요. (최대 300명)"
          />
        </View>
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={createGroup}>
          <Text style={styles.buttonText}>모임 만들기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupCreate;
