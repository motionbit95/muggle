import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  Text,
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
  radius_lg,
  radius_md,
  sp_1,
  sp_2,
  sp_3,
  sp_6,
  w_full,
} from '../../style/styles';
import {
  defaultFemale,
  defaultMale,
  getDisplayAge,
  useShoppingState,
} from '../../firebase/api';
import {
  addDocument,
  addMessage,
  getUser,
  updateDocument,
} from '../../firebase/firebase_func';
import Swiper from 'react-native-swiper';
import Typography from '../../Component/Typography';
import auth from '@react-native-firebase/auth';

const Matching = ({navigation, myInfo, userList, ...props}) => {
  const shoppingstate = useShoppingState();
  const [data, setData] = React.useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [isPoint, setIsPoint] = useState(false);
  const [inAppIndex, setInAppIndex] = useState(0);
  const [type, setType] = useState(0);
  const [swiperIndex, setSwiperIndex] = useState(0);

  const [amount, setAmount] = useState(1000);
  const [pay_method, setPayMethod] = useState('card');

  useEffect(() => {}, []);

  function createOid() {
    const now_date = new Date();
    let now_year = now_date.getFullYear();
    let now_month = now_date.getMonth() + 1;
    now_month = now_month < 10 ? '0' + now_month : now_month;
    let now_day = now_date.getDate();
    now_day = now_day < 10 ? '0' + now_day : now_day;
    const datetime = now_date.getTime();
    return now_year + now_month + now_day + datetime;
  }

  const content = useRef({
    // Default form set
    is_direct: 'Y', // 결제창 방식 (DIRECT: Y | POPUP: N)
    pay_type: 'card', // 결제수단
    work_type: 'CERT', // 결제요청방식
    card_ver: '01', // DEFAULT: 01 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼), 카드결제 시 필수
    payple_payer_id: '', // 결제자 고유ID (본인인증 된 결제회원 고유 KEY)
    buyer_no: '2335', // 가맹점 회원 고유번호
    buyer_name: '홍길동', // 결제자 이름
    buyer_hp: '01012345678', // 결제자 휴대폰 번호
    buyer_email: 'test@payple.kr', // 결제자 Email
    buy_goods: '오프라인 커피 매칭권', // 결제 상품
    buy_total: '1000', // 결제 금액
    buy_istax: 'Y', // 과세여부 (과세: Y | 비과세(면세): N)
    buy_taxtotal: '', // 부가세(복합과세인 경우 필수)
    order_num: createOid(), // 주문번호
    pay_year: '', // [정기결제] 결제 구분 년도
    pay_month: '', // [정기결제] 결제 구분 월
    is_reguler: 'N', // 정기결제 여부 (Y | N)
    is_taxsave: 'N', // 현금영수증 발행여부
    simple_flag: 'Y', // 간편결제 여부
    auth_type: 'sms', // [간편결제/정기결제] 본인인증 방식 (sms : 문자인증 | pwd : 패스워드 인증)
  });

  async function handlePayment() {
    // console.log(content.current);
    if (!auth().currentUser?.uid) {
      Alert.alert('로그인해주세요.');
      return;
    }

    // 유저정보
    const user = await getUser(auth().currentUser?.uid);
    // console.log(user.uid, '->', data.uid);

    // 구매정보 수정

    content.current.pay_type = pay_method;
    content.current.buyer_name = user?.user_name;
    content.current.buyer_hp = user?.user_phone;
    content.current.buyer_email = user?.user_email;
    content.current.buy_total =
      parseInt(userList[swiperIndex]?.user_price) * 10000;
    content.current.order_num = createOid();

    navigation.navigate('매칭', {
      screen: '결제',
      params: {
        data: content.current,
        receiver: userList[swiperIndex].uid,
      },
    });
  }

  const handleFavorite = async uid => {
    if (!myInfo) return;
    if (!myInfo.favorite) {
      myInfo.favorite = [];
    }
    if (myInfo.favorite.includes(uid)) {
      // 지우기
      myInfo.favorite = myInfo.favorite.filter(g => g !== uid);
      // setIcon(require('../../assets/icons/heart.png'));
    } else {
      myInfo.favorite.push(uid);
      // setIcon(require('../../assets/icons/heart_fill.png'));
    }

    // console.log(myInfo.goods);

    await updateDocument('user', myInfo.doc_id, myInfo);
  };

  // const updateUser = async () => {
  //   let list = await getDocList('user');
  //   // setUserList(list);
  //   setData(list[index]);
  // };

  // useEffect(() => {
  //   updateUser();
  // }, []);

  // useEffect(() => {
  //   if (userList && userList.length > 0) setData(userList[index]);
  // }, [index]);

  // const addMatching = async () => {
  //   await addDocument('matching', {
  //     matching_state: 0,
  //     pid: 'test-matching',
  //     sender: auth().currentUser?.uid,
  //     receiver: userList[index].uid,
  //   })
  //     .then(async id => {
  //       await addMessage({
  //         mid: 'test-message',
  //         sender: auth().currentUser?.uid,
  //         receiver: userList[index].uid,
  //         last_message: '',
  //         doc_id: 'chat_info',
  //         last_message: '',
  //         receiver_isRead: 0,
  //         sender_isRead: 0,
  //         timestamp: new Date(),
  //       });

  //       navigation.navigate('채팅', {
  //         screen: '매칭룸',
  //         params: {
  //           data: {
  //             mid: 'test-message',
  //             sender: auth().currentUser?.uid,
  //             receiver: userList[index].uid,
  //             last_message: '',
  //             doc_id: 'chat_info',
  //             last_message: '',
  //             receiver_isRead: 0,
  //             sender_isRead: 0,
  //             createAt: new Date(),
  //           },
  //           receiver: userList[index].uid,
  //         },
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const swipeRef = useRef();

  const addMatching = async user => {
    const payment = {
      pid: 'test' + new Date().toLocaleTimeString('ko-Kr'),
    };

    await addDocument('matching', {
      matching_state: 0,
      pid: payment.pid,
      sender: auth().currentUser?.uid,
      receiver: user.uid,
    })
      .then(async id => {
        await addMessage({
          mid: payment.pid,
          sender: auth().currentUser?.uid,
          receiver: user.uid,
          last_message: '',
          doc_id: 'chat_info',
          last_message: '',
          receiver_isRead: 0,
          sender_isRead: 0,
          timestamp: new Date(),
        });

        await addDocument('alarm', {
          createAt: new Date(),
          user_id: user.uid,
          alarm_type: 'matching-recieve',
          alarm_message: `${myInfo?.user_name} 님에게 커피 매칭 신청이 도착하였습니다.`,
          isRead: false,
        });

        await addDocument('alarm', {
          createAt: new Date(),
          user_id: myInfo.uid,
          alarm_type: 'matching-sender',
          alarm_message: `${user?.user_name} 님에게 커피 매칭 신청하였습니다.`,
          isRead: false,
        });

        navigation.navigate('채팅', {
          screen: '매칭룸',
          params: {
            data: {
              mid: payment.pid,
              sender: auth().currentUser?.uid,
              receiver: user.uid,
              last_message: '',
              doc_id: 'chat_info',
              last_message: '',
              receiver_isRead: 0,
              sender_isRead: 0,
              createAt: new Date(),
            },
            receiver: user.uid,
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Swiper
      ref={swipeRef}
      style={{
        backgroundColor: 'white',
        height: '100%',
        marginHorizontal: '-10%',
      }}
      loop={true}
      index={swiperIndex + 1}
      showsPagination={false}>
      {userList ? (
        userList?.map(
          (item, index) =>
            myInfo?.user_gender !== item?.user_gender &&
            item?.user_view_profile && (
              <View style={[f_full, {padding: 10}]}>
                <Image src={item?.user_profile} style={[f_full, radius_2xl]} />
                <LinearGradient
                  style={[
                    radius_2xl,
                    f_full,
                    {position: 'absolute', top: 0, left: 0, margin: 10},
                  ]}
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}>
                  <TouchableOpacity
                    onPress={() => handleFavorite(item?.doc_id)}
                    style={[{position: 'absolute', top: 10, right: 10}]}>
                    <Image
                      style={{width: 48, height: 48}}
                      source={
                        myInfo?.favorite?.includes(item.doc_id)
                          ? require('../../assets/icons/heart_fill.png')
                          : require('../../assets/icons/heart.png')
                      }
                    />
                  </TouchableOpacity>
                  <View
                    style={[
                      f_full,
                      justify_end,
                      {
                        paddingBottom: 60,
                        paddingHorizontal: 20,
                      },
                    ]}>
                    {/* <Typography size="3xl" white bold></Typography> */}
                    <View style={[flex_row, justify_between]}>
                      <View style={[flex_row]}>
                        <View style={[justify_end]}>
                          <View style={[flex_column, sp_3, {marginLeft: 24}]}>
                            <Typography white bold size="2xl">
                              {item?.user_name}{' '}
                              {getDisplayAge(item?.user_birth)}
                            </Typography>
                            <Typography white size="md">
                              {item?.user_place?.[0]}
                            </Typography>
                          </View>
                        </View>
                      </View>
                      <View style={[flex_row, sp_3]}>
                        <TouchableOpacity
                          onPress={e => {
                            e.preventDefault();
                            setIsPoint(false);
                            setType(0);
                            setSwiperIndex(index);
                            setOpenModal(true);
                          }}>
                          <Image
                            source={require('../../assets/icons/chatting_button.png')}
                            style={{width: 60, height: 60}}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={e => {
                            e.preventDefault();
                            setIsPoint(false);
                            setType(1);
                            setSwiperIndex(index);
                            setOpenModal(true);
                          }}>
                          <Image
                            source={require('../../assets/icons/matching_button.png')}
                            style={{width: 60, height: 60}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {openModal && (
                      <Modal
                        onRequestClose={() => setIsPoint(false)}
                        // visible={openModal}
                        animationType="fade"
                        transparent={true}>
                        <View
                          style={[w_full, align_end, justify_end, {flex: 1}]}>
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
                            <TouchableOpacity
                              onPress={() => setOpenModal(false)}>
                              <Image
                                source={require('../../assets/icons/_x.png')}
                                style={[
                                  img_sm,
                                  {opacity: 0.5, marginBottom: 10},
                                ]}
                              />
                            </TouchableOpacity>
                            {isPoint ? (
                              <View style={[w_full, sp_3]}>
                                <Typography size="xl" bold>
                                  {type === 0
                                    ? '1:1 채팅 신청을 하시겠어요?'
                                    : '오프라인 커피 매칭 신청 하시겠어요?'}
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
                                          inAppIndex === 0
                                            ? '#f1f1f1'
                                            : 'white',
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
                                          커피 매칭권 금액{' '}
                                          {userList[swiperIndex].user_price}만원
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
                                    if (type === 0) {
                                      Alert.alert(
                                        '알림',
                                        '콘솔에서 앱 등록 후 상품을 업로드 하셔야 됩니다.',
                                        [
                                          {
                                            text: '취소',
                                            onPress: () => {},
                                            style: 'cancel',
                                          },
                                          {
                                            text: '테스트하기',
                                            onPress: () => {
                                              addMatching(
                                                userList[swiperIndex],
                                              );
                                            },
                                            style: 'cancel',
                                          },
                                        ],
                                      );
                                    } else {
                                      handlePayment();
                                    }
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
                                  onPress={() => {
                                    setOpenModal(false);
                                    setIsPoint(false);
                                  }}>
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
                              <View style={[w_full, sp_6]}>
                                <Typography size="xl" bold>
                                  {userList[swiperIndex]?.user_name}님께
                                  {type === 0
                                    ? '1:1 채팅 신청을 하시겠어요?'
                                    : '오프라인 커피 매칭 신청 하시겠어요?'}
                                </Typography>
                                {type !== 0 && (
                                  <Typography light>
                                    상대방과 1:1 로 오프라인 카페에서 즐거운
                                    커피시간을 만들어 보세요.
                                  </Typography>
                                )}
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
                                      {/* <Image
                                    style={[img_sm, {opacity: 0.5}]}
                                    source={require('../../assets/icons/heart_fill_black.png')}
                                  />
                                  <Typography size="sm" light>
                                    40
                                  </Typography> */}
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            )}
                          </View>
                        </View>
                      </Modal>
                    )}
                  </View>
                </LinearGradient>
              </View>
            ),
        )
      ) : (
        <View style={f_full}></View>
      )}
    </Swiper>
  );
};

export default Matching;
