import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {cities, districts} from '../../firebase/api';
import styles, {f_full, justify_between} from '../../style/styles';
import {addChat, addDocument} from '../../firebase/firebase_func';
import auth from '@react-native-firebase/auth';
import DropDown from '../../Component/PickerComponent';
import DateTimeInput from '../../Component/DateTimeInput';
import {group_category} from './Home';
import BannerPicker from '../../Component/BannerPicker';
import Typography from '../../Component/Typography';
import MessageBox from '../../Component/MessageBox';
import Geolocation from '@react-native-community/geolocation'; // 라이브러리 import

const GroupCreate = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [matchPlace, setPlace] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null);

  const [matchName, setMatchName] = useState(null);
  const [matchTarget, setMatchTarget] = useState(null);
  const [matchPersonnel, setMatchPersonnel] = useState(0);
  const [matchDateTime, setMatchDateTime] = useState(new Date());
  const [matchPrice, setMatchPrice] = useState('나누기');
  const [matchImage, setMatchImage] = useState(null);

  const [message, setMessage] = useState({
    mode: 'error',
    isView: false,
    message: '',
    type: '',
  });

  const matchProps = ['나누기', '회비 없음', '직접 입력'];

  const group_category = [
    '머글(식사, 취미) 모임',
    '원데이 클래스',
    '비지니스 모임',
  ];

  const handleCityChange = value => {
    setSelectedCity(value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = value => {
    setSelectedDistrict(value);
  };

  const createGroup = async () => {
    Geolocation.getCurrentPosition(
      async pos => {
        const matchInfo = {
          createAt: new Date(),
          group_place:
            selectedCity + ' ' + selectedDistrict + ' ' + matchPlace
              ? selectedCity + ' ' + selectedDistrict + ' ' + matchPlace
              : '',
          group_type: selectedMatch
            ? selectedMatch === '머글(식사, 취미) 모임'
              ? '머글 모임'
              : selectedMatch
            : '일상 모임',
          group_name: matchName,
          group_target: matchTarget,
          group_personnel: matchPersonnel ? matchPersonnel : 0,
          group_users: [auth().currentUser.uid] ? [auth().currentUser.uid] : [],
          // group_images: [],
          group_time: matchDateTime ? matchDateTime : new Date(),
          group_price: matchPrice ? matchPrice : '나누기',
          group_admin: auth().currentUser.uid ? auth().currentUser.uid : '',
          group_image: matchImage ? matchImage : '',
          group_position: {
            latitude: pos?.coords.latitude ? pos?.coords.latitude : 0,
            longitude: pos?.coords.longitude ? pos?.coords.longitude : 0,
          },
        };

        await addDocument('group', matchInfo)
          .then(id => {
            if (selectedMatch) {
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
            }

            navigation.navigate('모임', {
              screen: '모임상세',
              params: {data: {...matchInfo, gid: id}},
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const confirmCreate = async () => {
    let message;
    if (!auth().currentUser) {
      message = '회원만 모임을 생성할 수 있습니다.';
    }
    if (!matchImage) {
      message = '모임 이미지를 선택하세요.';
    }
    if (!selectedCity || !selectedDistrict) {
      message = '지역을 선택하세요.';
    }
    if (!matchName) {
      message = '모임 이름을 입력하세요.';
    }
    if (!matchTarget) {
      message = '모임 목표를 입력하세요.';
    }

    if (data?.type !== 'personal') {
      if (!selectedMatch) {
        message = '모임종류를 선택하세요.';
      }

      if (!matchDateTime) {
        message = '모임 시간을 입력하세요.';
      }
      if (!matchPersonnel) {
        message = '모임 정원을 입력하세요.';
      }

      if (matchPersonnel > 30) {
        message = '30명 이하로 입력하세요.';
      }
    }

    console.log('createGroup ==>', message);

    if (message) {
      setMessage({
        mode: 'error',
        isView: true,
        message: message,
        type: 'error',
      });
      return;
    } else {
      setMessage({
        mode: 'confirm',
        isView: true,
        message: '모임를 생성하시겠습니까?',
        type: 'success',
      });
    }
  };

  return (
    <View style={[styles.screenStyle, styles.spaceBetween]}>
      {message.isView && (
        <MessageBox
          visible={message.isView}
          message={message.message}
          mode={message.mode}
          onCancel={() =>
            setMessage({mode: 'error', isView: false, message: ''})
          }
          onOK={() => {
            if (message.type === 'success') {
              createGroup();
            }
            setMessage({mode: 'error', isView: false, message: ''});
          }}
        />
      )}
      <ScrollView style={[styles.scrollViewStyle]}>
        <View style={[f_full, justify_between]}>
          <View>
            <View style={[{width: '100%', gap: 15, padding: 20}]}>
              <View style={styles.columnBox}>
                <BannerPicker onChangeValue={setMatchImage} />
                <Typography size="lg" bold>
                  지역
                </Typography>
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
                      defaultValue={
                        selectedDistrict ? selectedDistrict : '전체'
                      }
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
              {data?.type !== 'personal' && (
                <View style={styles.columnBox}>
                  <Typography size="lg" bold>
                    모임종류
                  </Typography>
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
                        defaultValue={selectedMatch ? selectedMatch : '전체'}
                        onChangeValue={setSelectedMatch}
                      />
                    </View>
                  </View>
                </View>
              )}
              <View style={styles.columnBox}>
                <Typography size="lg" bold>
                  모임 이름
                </Typography>
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
              {data?.type !== 'personal' && (
                <>
                  <View style={styles.columnBox}>
                    <Typography size="lg" bold>
                      모임 일정
                    </Typography>
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
                    <Typography size="lg" bold>
                      더치페이 여부
                    </Typography>
                    <View
                      style={{
                        justifyContent: 'stretch',
                        flexDirection: 'row',
                        gap: 10,
                      }}>
                      <View style={{flex: 1}}>
                        <DropDown
                          items={matchProps}
                          defaultValue={matchPrice ? matchPrice : '직접입력'}
                          onChangeValue={setMatchPrice}
                        />
                      </View>
                      {matchPrice !== '나누기' &&
                        matchPrice !== '회비 없음' && (
                          <TextInput
                            onChange={e => setMatchPrice(e.nativeEvent.text)}
                            keyboardType="numeric"
                            style={[{flex: 1.5}, styles.contentBox]}
                            placeholder="모임 금액을 입력해주세요."
                            // onChange={null}
                          />
                        )}
                    </View>
                  </View>
                </>
              )}

              <View style={styles.columnBox}>
                <Typography size="lg" bold>
                  모임목표
                </Typography>
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
                  placeholder={
                    data?.type === 'personal'
                      ? '모임목적, 시간, 장소를 작성해주세요.'
                      : '모임목표을 설명해주세요.'
                  }
                />
              </View>

              {data?.type !== 'personal' && (
                <View style={styles.columnBox}>
                  <Typography size="lg" bold>
                    정원
                  </Typography>
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
                    placeholder="정원을 입력해주세요. (최대 30명)"
                  />
                </View>
              )}
            </View>
          </View>
          <View style={[styles.buttonBox]}>
            <TouchableOpacity style={styles.button} onPress={confirmCreate}>
              <Typography size="lg" bold white>
                모임 만들기
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GroupCreate;
