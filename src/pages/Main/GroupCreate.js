import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {cities, districts, font_md} from '../../firebase/api';
import styles, {
  align_center,
  blackAlpha400,
  blackAlpha900,
  f_full,
  flex_row,
  font_family,
  justify_between,
} from '../../style/styles';
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
          group_type: data?.type !== 'personal' ? '일상 모임' : '원데이 클래스',
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
      // if (!selectedMatch) {
      //   message = '모임종류를 선택하세요.';
      // }

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
    <View style={[styles.screenStyle, styles.spaceBetween, f_full]}>
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
                <View style={[flex_row, align_center]}>
                  <View style={{width: '20%'}}>
                    <Typography size="md" bold>
                      지역
                    </Typography>
                  </View>
                  <View
                    style={{
                      width: '80%',
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
                </View>
              </View>
              {data?.type !== 'personal' && (
                <>
                  <View style={[flex_row, align_center]}>
                    <View style={{width: '20%'}}>
                      <Typography size="md" bold>
                        모임 일정
                      </Typography>
                    </View>
                    <View style={{width: '80%'}}>
                      <DateTimeInput onChange={e => setMatchDateTime(e)} />
                    </View>
                  </View>
                  <View style={[flex_row, align_center]}>
                    <View style={{width: '20%'}}>
                      <Typography size="md" bold>
                        모임회비
                      </Typography>
                    </View>
                    <View
                      style={[
                        {
                          width: '80%',
                          justifyContent: 'stretch',
                          flexDirection: 'row',
                          gap: 10,
                        },
                      ]}>
                      <TextInput
                        placeholderTextColor={blackAlpha400}
                        onChange={e => setMatchPrice(e.nativeEvent.text)}
                        keyboardType="numeric"
                        style={[
                          {
                            width: '100%',
                            height: 50,
                            fontFamily: font_family,
                            fontSize: font_md,
                            color: blackAlpha900,
                          },
                          styles.contentBox,
                        ]}
                        placeholder="인당 회비를 작성해주세요."
                        // onChange={null}
                      />
                    </View>
                  </View>
                  <View style={[flex_row, align_center]}>
                    <View style={{width: '20%'}}>
                      <Typography size="md" bold>
                        모임 정원
                      </Typography>
                    </View>
                    <View style={{width: '80%'}}>
                      <TextInput
                        placeholderTextColor={blackAlpha400}
                        onChange={e => setMatchPersonnel(e.nativeEvent.text)}
                        style={[
                          {
                            width: '100%',
                            height: 50,
                            fontFamily: font_family,
                            fontSize: font_md,
                            color: blackAlpha900,
                          },
                          styles.contentBox,
                        ]}
                        keyboardType="number-pad"
                        placeholder="최대 인원 30명"
                      />
                    </View>
                  </View>
                </>
              )}

              <View style={styles.columnBox}>
                <TextInput
                  placeholderTextColor={blackAlpha400}
                  onChange={e => setMatchName(e.nativeEvent.text)}
                  style={[
                    {
                      width: '100%',
                      height: 50,
                      fontFamily: font_family,
                      fontSize: font_md,
                      color: blackAlpha900,
                    },
                    styles.contentBox,
                  ]}
                  placeholder="모임 이름을 입력해주세요."
                />
              </View>

              <View style={styles.columnBox}>
                <TextInput
                  placeholderTextColor={blackAlpha400}
                  onChange={e => setMatchTarget(e.nativeEvent.text)}
                  multiline
                  style={[
                    styles.contentBox,
                    {
                      width: '100%',
                      height: 100,
                      textAlignVertical: 'top',
                      fontFamily: font_family,
                      fontSize: font_md,
                      color: blackAlpha900,
                    },
                  ]}
                  placeholder={
                    data?.type === 'personal'
                      ? '모임목적, 시간, 장소를 작성해주세요.'
                      : '모임목표를 설명해주세요.'
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.buttonBox]}>
        <TouchableOpacity style={styles.button} onPress={confirmCreate}>
          <Typography size="lg" bold white>
            모임 만들기
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupCreate;
