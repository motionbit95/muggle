import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {cities, districts} from '../../firebase/api';
import styles from '../../style/styles';
import {addChat, addDocument} from '../../firebase/firebase_func';
import auth from '@react-native-firebase/auth';
import DropDown from '../../Component/PickerComponent';
import DateTimeInput from '../../Component/DateTimeInput';
import {group_category} from './Home';

const GroupCreate = ({navigation}) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [matchPlace, setPlace] = useState('');
  const [selectedMatch, setSelectedMatch] = useState('머글 모임');

  const [matchName, setMatchName] = useState('');
  const [matchTarget, setMatchTarget] = useState('');
  const [matchPersonnel, setMatchPersonnel] = useState(0);
  const [matchDateTime, setMatchDateTime] = useState(new Date());
  const [matchPrice, setMatchPrice] = useState('나누기');
  const [matchImage, setMatchImage] = useState('');

  const matchProps = ['나누기', '직접 입력'];

  const handleCityChange = value => {
    setSelectedCity(value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = value => {
    setSelectedDistrict(value);
  };

  const createGroup = async () => {
    if (!auth().currentUser) {
      alert('회원만 모임을 생성할 수 있습니다.');
      return;
    }
    if (!selectedCity || !selectedDistrict) {
      alert('지역을 선택하세요.');
      return;
    }
    if (!selectedMatch) {
      alert('모임종류를 선택하세요.');
      return;
    }
    if (!matchName) {
      alert('모임 이름을 입력하세요.');
      return;
    }
    if (!matchDateTime) {
      alert('모임 시간을 입력하세요.');
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

    if (matchPersonnel > 300) {
      alert('300명 이하로 입력하세요.');
      return;
    }

    const matchInfo = {
      createAt: new Date(),
      group_place: selectedCity + ' ' + selectedDistrict + ' ' + matchPlace,
      group_type: selectedMatch,
      group_name: matchName,
      group_target: matchTarget,
      group_personnel: matchPersonnel,
      group_users: [auth().currentUser.uid],
      group_images: [],
      group_time: matchDateTime,
      group_price: matchPrice,
      group_admin: auth().currentUser.uid,
    };

    await addDocument('group', matchInfo)
      .then(id => {
        addChat({
          gid: id,
          group_info: matchInfo,
          doc_id: 'chat_info',
          last_message: '',
          createAt: new Date(),
          chat_users: [
            {
              uid: auth().currentUser.uid,
              unRead: 0,
            },
          ],
        });

        navigation.navigate('홈', {
          screen: '모임상세',
          params: {data: {...matchInfo, gid: id}},
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={[styles.screenStyle, styles.spaceBetween]}>
      <ScrollView style={styles.scrollViewStyle}>
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
            <View>
              <TextInput
                onChange={e => setPlace(e.nativeEvent.text)}
                style={[
                  {
                    width: '100%',
                    height: 50,
                  },
                  styles.contentBox,
                ]}
                placeholder="상세 주소를 입력하세요."
              />
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
                  items={group_category.filter(
                    item => item !== '커피 친구 추천',
                  )}
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
            <Text style={styles.contentTitle}>모임 일정</Text>
            <DateTimeInput onChange={e => setMatchDateTime(e)} />
            {/* <TextInput
              onChange={e => setMatchDateTime(e.nativeEvent.text)}
              style={[
                {
                  width: '100%',
                  height: 50,
                },
                styles.contentBox,
              ]}
              placeholder="모임 일정을 입력해주세요."
            /> */}
          </View>
          <View style={styles.columnBox}>
            <Text style={styles.contentTitle}>더치페이 여부</Text>
            <View
              style={{
                justifyContent: 'stretch',
                flexDirection: 'row',
                gap: 10,
              }}>
              <View style={{flex: 1}}>
                <DropDown
                  items={matchProps}
                  defaultValue={matchPrice}
                  onChangeValue={setMatchPrice}
                />
              </View>
              <TextInput
                readOnly={matchPrice === '나누기'}
                onChange={e => setMatchPrice(e.nativeEvent.text)}
                keyboardType="numeric"
                style={[{flex: 1.5}, styles.contentBox]}
                placeholder="모임 금액을 입력해주세요."
                // onChange={null}
              />
            </View>
          </View>

          <View style={styles.columnBox}>
            <Text style={styles.contentTitle}>모임목표</Text>
            <TextInput
              onChange={e => setMatchTarget(e.nativeEvent.text)}
              multiline
              style={[
                styles.contentBox,
                {
                  width: '100%',
                  height: 100,
                  textAlignVertical: 'top',
                },
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
      </ScrollView>
    </View>
  );
};

export default GroupCreate;
