import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  align_center,
  align_end,
  btn_primary,
  btn_secondary,
  center,
  f_full,
  flex_column,
  flex_row,
  img_md,
  img_sm,
  justify_between,
  justify_center,
  justify_end,
  p_2,
  p_3,
  p_4,
  p_6,
  radius_2xl,
  radius_md,
  sp_1,
  sp_2,
  sp_3,
  sp_6,
  w_full,
} from '../../style/styles';
import {defaultFemale, defaultMale, getDisplayAge} from '../../firebase/api';
import {
  addDocument,
  addMessage,
  getDocList,
} from '../../firebase/firebase_func';
import Swiper from 'react-native-swiper';
import Typography from '../../Component/Typography';
import auth from '@react-native-firebase/auth';

const Matching = ({navigation, route}) => {
  const [userList, setUserList] = React.useState(
    route.params ? route.params.userList : null,
  );

  const [openModal, setOpenModal] = useState(false);
  const [isPoint, setIsPoint] = useState(false);
  const [inAppIndex, setInAppIndex] = useState(0);

  const [data, setData] = React.useState(
    route.params ? route.params.data : null,
  );
  const [index, setIndex] = React.useState(
    route.params ? route.params.index : 0,
  );

  const updateUser = async () => {
    let list = await getDocList('user');
    setUserList(list);
    setData(list[index]);
  };

  useEffect(() => {
    updateUser();
  }, []);

  useEffect(() => {
    if (userList && userList.length > 0) setData(userList[index]);
  }, [index]);

  const addMatching = async () => {
    await addDocument('matching', {
      matching_state: 0,
      pid: 'test-matching',
      sender: auth().currentUser?.uid,
      receiver: userList[index].uid,
    })
      .then(async id => {
        await addMessage({
          mid: 'test-message',
          sender: auth().currentUser?.uid,
          receiver: userList[index].uid,
          last_message: '',
          doc_id: 'chat_info',
          last_message: '',
          receiver_isRead: 0,
          sender_isRead: 0,
          timestamp: new Date(),
        });

        navigation.navigate('채팅', {
          screen: '매칭룸',
          params: {
            data: {
              mid: 'test-message',
              sender: auth().currentUser?.uid,
              receiver: userList[index].uid,
              last_message: '',
              doc_id: 'chat_info',
              last_message: '',
              receiver_isRead: 0,
              sender_isRead: 0,
              createAt: new Date(),
            },
            receiver: userList[index].uid,
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Swiper
      style={{backgroundColor: 'white'}}
      autoplay={false}
      loop={true}
      showsPagination={false}
      autoplayTimeout={5}
      index={index}>
      {userList ? (
        userList?.map((item, index) => (
          <ImageBackground
            source={{
              uri: item?.user_profile
                ? item?.user_profile
                : item?.user_gender === '남'
                ? defaultMale
                : defaultFemale,
            }}
            style={[
              radius_2xl,
              {
                overflow: 'hidden',
                flex: 1,
                width: '100%',
              },
            ]}>
            <LinearGradient
              style={radius_2xl}
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}>
              <View style={[sp_3, justify_end, f_full, p_4]}>
                <View
                  style={[
                    flex_row,
                    sp_3,
                    w_full,
                    justify_between,
                    p_2,
                    {marginBottom: 50},
                  ]}>
                  <View style={[flex_column, sp_3, {flex: 1}]}>
                    {/* <View
                      style={[
                        radius_full,
                        flex_row,
                        align_center,
                        justify_center,
                        p_1,
                        sp_1,
                        {
                          borderWidth: 1,
                          borderColor: whiteAlpha900,
                          width: '30%',
                        },
                      ]}>
                      <Image
                        style={img_sm}
                        source={require('../../assets/icons/subtract.png')}
                      />
                      <Typography white>근처</Typography>
                    </View> */}

                    <Typography white bold size="3xl">
                      {item?.user_name} {getDisplayAge(item?.user_birth)}
                    </Typography>
                    <Typography white size="lg">
                      {item?.user_place?.[0]}
                    </Typography>
                  </View>
                  <View style={[flex_row, sp_2]}>
                    <TouchableOpacity onPress={() => setOpenModal(true)}>
                      <Image
                        style={{width: 72, height: 72}}
                        source={require('../../assets/icons/chatting_button.png')}
                      />
                    </TouchableOpacity>
                    <Modal
                      onRequestClose={() => setIsPoint(false)}
                      visible={openModal}
                      animationType="fade"
                      transparent={true}>
                      <View style={[w_full, align_end, justify_end, {flex: 1}]}>
                        <View
                          style={[
                            w_full,
                            flex_column,
                            justify_end,
                            align_end,
                            p_6,
                            {
                              backgroundColor: 'white',
                              borderTopLeftRadius: 20,
                              borderTopRightRadius: 20,
                            },
                          ]}>
                          <TouchableOpacity onPress={() => setOpenModal(false)}>
                            <Image
                              source={require('../../assets/icons/_x.png')}
                              style={[img_sm, {opacity: 0.5}]}
                            />
                          </TouchableOpacity>
                          {isPoint ? (
                            <View style={[w_full, sp_3]}>
                              <Typography size="xl" bold>
                                오프라인 커피 매칭 신청 하시겠어요?
                              </Typography>
                              <Typography light>
                                {`매칭 확률 100% 실제 유저 
상대방 매칭 거절 시 전액 환불`}
                              </Typography>
                              <View style={[w_full, flex_row, sp_2]}>
                                <TouchableOpacity
                                  disabled
                                  onPress={() => setInAppIndex(0)}
                                  style={[
                                    radius_md,
                                    center,
                                    sp_6,
                                    p_3,
                                    {
                                      backgroundColor:
                                        inAppIndex === 0 ? '#f1f1f1' : 'white',
                                      borderWidth: inAppIndex === 0 ? 2 : 1,
                                      borderColor:
                                        inAppIndex === 0
                                          ? '#8c8c8c'
                                          : '#d9d9d9',
                                      flex: 1,
                                    },
                                  ]}>
                                  <View style={[center, sp_6]}>
                                    <View
                                      style={[
                                        flex_row,
                                        align_center,
                                        justify_center,
                                        p_6,
                                      ]}>
                                      <Typography bold size="xl">
                                        커피 매칭권 금액 5만원
                                      </Typography>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </View>
                              <TouchableOpacity
                                style={btn_primary}
                                onPress={() => {
                                  setOpenModal(false);
                                  setIsPoint(false);
                                  Alert.alert(
                                    '알림',
                                    '콘솔에서 앱 등록 후 상품을 업로드 하셔야 됩니다.',
                                    [
                                      {
                                        text: '취소',
                                        onPress: () => {},
                                        style: 'cancel',
                                      },
                                    ],
                                  );
                                }}>
                                <View
                                  style={[
                                    flex_row,
                                    sp_1,
                                    align_center,
                                    justify_center,
                                  ]}>
                                  <Typography bold white size="lg">
                                    즉시 구매하기
                                  </Typography>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={btn_secondary}
                                onPress={() => setOpenModal(false)}>
                                <View
                                  style={[
                                    flex_row,
                                    sp_1,
                                    align_center,
                                    justify_center,
                                  ]}>
                                  <Typography size="md" light>
                                    다음에 하기
                                  </Typography>
                                </View>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <View style={[w_full, sp_3]}>
                              <Typography size="xl" bold>
                                오프라인 커피 매칭 신청 하시겠어요?
                              </Typography>
                              <Typography light>
                                상대방과 1:1 로 오프라인 카페에서 즐거운
                                커피시간을 만들어 보세요.
                              </Typography>
                              <TouchableOpacity
                                style={btn_primary}
                                onPress={() => {
                                  // 여기서 포인트 있는지 없는지 검사
                                  setIsPoint(true);
                                }}>
                                <View
                                  style={[
                                    flex_row,
                                    sp_1,
                                    align_center,
                                    justify_center,
                                  ]}>
                                  <Typography bold white size="lg">
                                    매칭신청
                                  </Typography>
                                  <View
                                    style={[
                                      flex_row,
                                      align_center,
                                      justify_center,
                                    ]}>
                                    <Image
                                      style={[img_sm, {opacity: 0.5}]}
                                      source={require('../../assets/icons/heart_fill_black.png')}
                                    />
                                    <Typography size="sm" light>
                                      40
                                    </Typography>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                      </View>
                    </Modal>
                    <TouchableOpacity
                      onPressOut={() => {
                        navigation.navigate('매칭', {
                          screen: '매칭중',
                          params: {data: item},
                        });
                      }}>
                      <Image
                        style={{width: 70, height: 70}}
                        source={require('../../assets/icons/matching_button.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        ))
      ) : (
        <View style={f_full}></View>
      )}
    </Swiper>
  );
};

export default Matching;
