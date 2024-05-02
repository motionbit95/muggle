import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles, {
  align_center,
  align_end,
  align_start,
  blackAlpha200,
  blackAlpha300,
  blackAlpha400,
  blackAlpha700,
  blackAlpha900,
  btn_primary,
  btn_yellow,
  center,
  f_full,
  flex_column,
  flex_row,
  font_family,
  img_sm,
  justify_between,
  justify_center,
  justify_end,
  p_1,
  p_2,
  p_4,
  radius_full,
  radius_md,
  radius_sm,
  sp_1,
  sp_16,
  sp_2,
  sp_8,
  w_full,
  whiteAlpha900,
} from '../../style/styles';
import {
  cities,
  districts,
  formatDateTime,
  getDisplayAge,
  primary_color,
} from '../../firebase/api';
import {mapImg, moneyImg, userImg} from '../../Component/GroupBox';
import firestore from '@react-native-firebase/firestore';
import {
  addDocument,
  getDocument,
  getUser,
  updateDocument,
} from '../../firebase/firebase_func';
import auth from '@react-native-firebase/auth';
import $ from 'jquery';
import Typography from '../../Component/Typography';
import MessageBox from '../../Component/MessageBox';
import DateTimeInput from '../../Component/DateTimeInput';
import DropDown from '../../Component/PickerComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DirectRoom = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};
  const [chat, setChat] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [matchingInfo, setMatchingInfo] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState({
    mode: 'error',
    isView: false,
    message: '',
    type: 'success',
  });

  const [promise_time, setPromiseTime] = useState(new Date());
  const [promise_place, setPlace] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [view, setView] = useState(false);

  const handleCityChange = value => {
    setSelectedCity(value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = value => {
    setSelectedDistrict(value);
  };

  // ScrollView의 ref를 생성합니다.
  const scrollViewRef = useRef();

  // 스크롤을 제일 아래로 내리는 함수
  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({animated: true});
  };

  // 제목을 헤더 타이틀로 설정
  React.useLayoutEffect(() => {
    if (navigation) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }
  }, [navigation]);

  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    getUser(
      data?.receiver === auth().currentUser.uid ? data?.sender : data?.receiver,
    ).then(setUser);

    getDocument('matching', data.mid).then(res => {
      setMatchingInfo(res);
    });
  }, []);

  useEffect(() => {
    // console.log('data===>', data);
    const unsubscribe = firestore()
      .collection('message-' + data.mid)
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const updatedDocuments = [];
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id === 'chat_info') {
            setGroupInfo(documentSnapshot.data().group_info);
          } else {
            updatedDocuments.push({
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            });
          }
        });
        // console.log(updatedDocuments);
        setChatList(updatedDocuments);
        scrollToBottom();
      });

    return () => unsubscribe();
  }, []);

  const handleAddChat = async chat => {
    if (!chat) return;

    // console.log('chat ===> ', chat, data.gid, auth().currentUser.uid);

    let userInfo = {};
    await getUser(auth().currentUser.uid).then(res => {
      userInfo = res;
    });

    await addDocument('message-' + data.mid, {
      chat: chat,
      user_info: userInfo,
      uid: auth().currentUser.uid,
      createdAt: new Date(),
    });

    // console.log(chat);
    setChat(null);
  };

  const matchingSuccess = async () => {
    setMessage({
      mode: 'confirm',
      isView: true,
      message: '매칭 완료 하시겠습니까?',
      type: 'success',
    });
  };

  const matchingFail = async () => {
    setMessage({
      mode: 'confirm',
      isView: true,
      message: '매칭 거절 하시겠습니까?',
      type: 'refund',
    });
  };

  const addPromise = async () => {
    parsing(
      '//등록//' +
        promise_time.toLocaleDateString('ko-Kr') +
        '//' +
        promise_time.toLocaleTimeString('ko-Kr') +
        '//' +
        selectedCity +
        '//' +
        selectedDistrict +
        '//' +
        promise_place,
    );

    if (
      promise_time === null ||
      promise_place === null ||
      selectedCity === null ||
      selectedDistrict === null
    ) {
      setMessage({
        mode: 'error',
        // isView: true,
        message: '모든 정보를 입력하세요.',
      });
      return;
    }

    setMessage({
      mode: '',
      isView: false,
      message: '',
      type: '',
    });

    handleAddChat(
      '//등록//' +
        promise_time.toLocaleDateString('ko-Kr', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) +
        '//' +
        promise_time.toLocaleTimeString('ko-Kr', {
          hour: '2-digit',
          minute: '2-digit',
        }) +
        '//' +
        selectedCity +
        '//' +
        selectedDistrict +
        '//' +
        promise_place,
    );

    setPromiseTime(new Date());
    setPlace(null);
    setSelectedCity(null);
    setSelectedDistrict(null);
    setView(false);

    setOpenModal(false);
  };

  const updatePromise = async () => {
    parsing(
      '//수정//' +
        promise_time.toLocaleDateString('ko-Kr') +
        '//' +
        promise_time.toLocaleTimeString('ko-Kr') +
        '//' +
        selectedCity +
        '//' +
        selectedDistrict +
        '//' +
        promise_place,
    );

    if (
      promise_time === null ||
      promise_place === null ||
      selectedCity === null ||
      selectedDistrict === null
    ) {
      setMessage({
        mode: 'error',
        // isView: true,
        message: '모든 정보를 입력하세요.',
      });
      return;
    }

    setMessage({
      mode: '',
      isView: false,
      message: '',
      type: '',
    });

    handleAddChat(
      '//수정//' +
        promise_time.toLocaleDateString('ko-Kr', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) +
        '//' +
        promise_time.toLocaleTimeString('ko-Kr', {
          hour: '2-digit',
          minute: '2-digit',
        }) +
        '//' +
        selectedCity +
        '//' +
        selectedDistrict +
        '//' +
        promise_place,
    );

    setPromiseTime(new Date());
    setPlace(null);
    setSelectedCity(null);
    setSelectedDistrict(null);
    setView(false);

    setOpenModal(false);
  };

  const cancelPromise = async () => {
    parsing(
      '//취소//' +
        promise_time.toLocaleDateString('ko-Kr') +
        '//' +
        promise_time.toLocaleTimeString('ko-Kr') +
        '//' +
        selectedCity +
        '//' +
        selectedDistrict +
        '//' +
        promise_place,
    );

    if (
      promise_time === null ||
      promise_place === null ||
      selectedCity === null ||
      selectedDistrict === null
    ) {
      setMessage({
        mode: 'error',
        // isView: true,
        message: '모든 정보를 입력하세요.',
      });
      return;
    }

    setMessage({
      mode: '',
      isView: false,
      message: '',
      type: '',
    });

    handleAddChat(
      '//취소//' +
        promise_time.toLocaleDateString('ko-Kr', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) +
        '//' +
        promise_time.toLocaleTimeString('ko-Kr', {
          hour: '2-digit',
          minute: '2-digit',
        }) +
        '//' +
        selectedCity +
        '//' +
        selectedDistrict +
        '//' +
        promise_place,
    );

    setPromiseTime(new Date());
    setPlace(null);
    setSelectedCity(null);
    setSelectedDistrict(null);
    setView(false);

    setOpenModal(false);
  };

  const parsing = data => {
    // console.log('채팅 ==> ', data);
    let year = Number(data.split('//')[2].split('.')[0]);
    let month = Number(data.split('//')[2].split('.')[1]);
    let day = Number(data.split('//')[2].split('.')[2].split('(')[0]);

    let hour = Number(data.split('//')[3].split(' ')[1].split(':')[0]);
    let minute = Number(data.split('//')[3].split(' ')[1].split(':')[1]);

    if (data.split('//')[3].includes('오후')) {
      hour += 12;
    }

    let gmtCustomDate = new Date();
    if (data.includes('//등록//')) {
      gmtCustomDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
    } else {
      gmtCustomDate = new Date(year, month - 1, day, hour, minute);
    }

    // console.log(gmtCustomDate);
    setPromiseTime(gmtCustomDate);

    setSelectedCity(data.split('//')[4]);
    setSelectedDistrict(data.split('//')[5]);
    setPlace(data.split('//')[6]);

    // console.log(data.split('//')[4], data.split('//')[5], data.split('//')[6]);

    // setPlace(data.split('//')[3]);
  };

  return (
    <View style={styles.screenStyle}>
      {message.isView && (
        <MessageBox
          visible={message.isView}
          mode={message.mode}
          message={message.message}
          onCancel={() => setMessage({mode: '', isView: false, message: ''})}
          onOK={async () => {
            // 메세지 박스 닫기
            if (message.type === 'success') {
              handleAddChat(`//완료//매칭 완료 처리하였습니다`);

              await updateDocument('matching', data?.mid, {
                matching_state: 2,
              });
            } else if (message.type === 'refund') {
              handleAddChat(`//거절//매칭 신청을 거절하였습니다`);
              await updateDocument('matching', data?.mid, {
                matching_state: 400,
                matching_refunder: auth().currentUser.uid,
              });
            }
            setMessage({mode: '', isView: false, message: ''});
          }}
        />
      )}
      {openModal && (
        <Modal>
          <View style={[flex_column, p_4, sp_8]}>
            <TouchableOpacity
              onPress={() => {
                setView(false);
                setPromiseTime(new Date());
                setPlace(null);
                setSelectedCity(null);
                setSelectedDistrict(null);
                setOpenModal(false);
              }}>
              <Image
                style={{opacity: 0.5, width: 30, height: 30}}
                source={require('../../assets/icons/left_arrow.png')}
              />
            </TouchableOpacity>
            <Typography bold size="2xl">
              {user?.user_name}님과 약속
            </Typography>
            <View style={[flex_column, sp_2]}>
              <Typography size="lg" bold>
                약속일시
              </Typography>
              <View style={w_full}>
                {/* <Typography size="lg" light>
                  {formatDateTime(promise_time)}
                </Typography> */}
                <DateTimeInput
                  defaultValue={promise_time}
                  onChange={e => setPromiseTime(e)}
                />
              </View>
              <View style={[w_full, align_end]}>
                <TouchableOpacity onPress={cancelPromise}>
                  <Typography light>약속 취소하기</Typography>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[flex_column, sp_2]}>
              <Typography size="lg" bold>
                약속장소
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
                    defaultValue={selectedDistrict ? selectedDistrict : '전체'}
                    onChangeValue={handleDistrictChange}
                  />
                </View>
              </View>
              {/* <View>
                <TextInput
                  placeholderTextColor={blackAlpha400}
                  value={promise_place}
                  onChange={e => setPlace(e.nativeEvent.text)}
                  style={[
                    {
                      fontFamily: font_family,
                      width: '100%',
                      height: 50,
                      color: blackAlpha900,
                    },
                    styles.contentBox,
                  ]}
                  placeholder="상세 주소를 입력하세요."
                />
              </View> */}
            </View>
            {message.mode === 'error' && (
              <Typography size="lg" color="red">
                {message.message}
              </Typography>
            )}
            {!view ? (
              <TouchableOpacity style={btn_primary} onPress={addPromise}>
                <View style={[flex_row, sp_1, align_center, justify_center]}>
                  <Typography bold white size="lg">
                    완료
                  </Typography>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={btn_primary} onPress={updatePromise}>
                <View style={[flex_row, sp_1, align_center, justify_center]}>
                  <Typography bold white size="lg">
                    약속 수정하기
                  </Typography>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      )}
      <View
        style={[
          {
            // backgroundColor: '#FFF7E3',
            borderRadius: 10,
            padding: 10,
            gap: 5,
            width: '95%',
            margin: 10,
          },
        ]}>
        <View style={[flex_row, justify_between, align_center]}>
          <View style={[flex_row, align_start, {gap: 10}]}>
            <Image
              style={styles.Avartar40}
              source={
                user?.user_profile
                  ? {uri: user?.user_profile}
                  : require('../../assets/avartar.png')
              }
            />
            <View style={[flex_column, sp_1]}>
              <Typography bold size="lg">
                {user?.user_name} ({user?.user_gender}){' '}
                {getDisplayAge(user?.user_birth)}
              </Typography>
              {/* <View style={[flex_row, align_center, sp_1]}>
                <Typography light>
                  {getDisplayAge(user?.user_birth)}세
                </Typography>
                <View style={[p_1, {backgroundColor: whiteAlpha900}]}>
                  <Typography red>{user?.user_gender}자</Typography>
                </View>
              </View> */}
              <Typography light>{user?.user_place}</Typography>
              <View style={[flex_row, sp_1]}>
                <TouchableOpacity
                  onPress={matchingFail}
                  style={[btn_yellow, flex_row, p_1, sp_2]}>
                  <Image
                    style={img_sm}
                    source={require('../../assets/x.png')}
                  />
                  <Typography bold>매칭거절</Typography>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={matchingSuccess}
                  style={[btn_yellow, flex_row, p_1, sp_2]}>
                  <Image
                    style={img_sm}
                    source={require('../../assets/o.png')}
                  />
                  <Typography bold>매칭완료</Typography>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[btn_yellow, flex_row, p_1, sp_2]}
                  onPress={() => {
                    setView(false);
                    setOpenModal(true);
                  }}>
                  <Image
                    style={img_sm}
                    source={require('../../assets/Calendar.png')}
                  />
                  <Typography bold>약속잡기</Typography>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <Typography size="xs" center>
          커피 매칭 장소는 근처 스타벅스 또는 대형 브랜드 카페를 권장드립니다.{' '}
        </Typography>
      </View>
      <KeyboardAwareScrollView
        style={styles.scrollViewStyle}
        ref={scrollViewRef}>
        <View
          style={[styles.contentStyle, {gap: 15, justifyContent: 'flex-end'}]}>
          {/* 왼쪽 배치 rowBox, 시간은 flex-start
          본인 채팅 시 오른쪽배치 시 row-reverse, 시간은 flex-end 조건, 색상 rgba(255, 218, 122, 1) 추가 */}

          {chatList?.map(chat =>
            chat?.uid === auth().currentUser.uid ? (
              <View
                key={chat?.createdAt}
                style={[
                  {
                    alignItems: 'flex-start',
                    flexDirection: 'row-reverse',
                    gap: 10,
                  },
                ]}>
                <View style={{gap: 10, alignItems: 'center'}}>
                  <View>
                    <View style={styles.Avartar40}>
                      <Image
                        style={[f_full, radius_full]}
                        source={
                          chat?.user_info?.user_profile
                            ? {uri: chat?.user_info?.user_profile}
                            : require('../../assets/avartar.png')
                        }
                      />
                    </View>
                  </View>
                  <Typography size="sm">
                    {chat?.user_info?.user_name}
                  </Typography>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    gap: 5,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      padding: 15,
                      backgroundColor: '#F1F1F1',
                      borderRadius: 15,
                      borderTopRightRadius: 0,
                      maxWidth: 290,
                    }}>
                    {chat?.chat.includes('//등록//') ||
                    chat?.chat.includes('//수정//') ||
                    chat?.chat.includes('//취소//') ? (
                      <View style={[flex_column, sp_2]}>
                        <Typography size="lg">
                          {chat?.chat.includes('//등록//')
                            ? '약속을 만들었어요.'
                            : chat?.chat.includes('//수정//')
                            ? '약속을 수정했어요.'
                            : '약속을 취소했어요.'}
                        </Typography>
                        <Typography size="md" light>
                          날짜 : {chat?.chat.split('//')[2]}
                        </Typography>
                        <Typography size="md" light>
                          시간 : {chat?.chat.split('//')[3]}
                        </Typography>
                        {!chat?.chat.includes('//취소//') && (
                          <TouchableOpacity
                            style={[
                              {backgroundColor: blackAlpha700},
                              center,
                              flex_row,
                              p_2,
                              sp_2,
                              radius_md,
                            ]}
                            onPress={() => {
                              setView(true);
                              parsing(
                                chat?.chat.replace('//등록//', '//보기//'),
                              );
                              setOpenModal(true);
                            }}>
                            <View
                              style={[
                                flex_row,
                                sp_1,
                                align_center,
                                justify_center,
                              ]}>
                              <Typography size="md" white bold>
                                약속보기
                              </Typography>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : chat?.chat.includes('//완료//') ? (
                      <View style={[flex_column, sp_2]}>
                        <Typography>{`${chat?.chat.replaceAll(
                          '//완료//',
                          '',
                        )}`}</Typography>
                        {data?.receiver === auth().currentUser?.uid ? (
                          <Typography>
                            {
                              '5영업일 이내 설정하신 매칭원 금액의 70%를 기재해주신 계좌로 입금됩니다.\n\n(마이페이지-프로필수정-계좌입력)'
                            }
                          </Typography>
                        ) : null}
                      </View>
                    ) : (
                      <Typography size="sm" style={{whiteSpace: 'pre-wrap'}}>
                        {`${chat?.chat}`}
                      </Typography>
                    )}
                  </View>
                  <Typography size="sm" light>
                    {formatDateTime(chat?.createdAt).split(' ')[1]}
                  </Typography>
                </View>
              </View>
            ) : (
              <View style={[styles.rowBox, align_end, {gap: 10}]}>
                <View style={{gap: 10, alignItems: 'center'}}>
                  <View>
                    <View style={styles.Avartar40}>
                      <Image
                        style={[f_full, radius_full]}
                        source={
                          chat?.user_info?.user_profile
                            ? {uri: chat?.user_info?.user_profile}
                            : require('../../assets/avartar.png')
                        }
                      />
                    </View>
                  </View>
                  <Typography size="sm">
                    {chat?.user_info?.user_name}
                  </Typography>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    gap: 5,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      padding: 15,
                      backgroundColor: '#F1F1F1',
                      borderRadius: 15,
                      borderTopRightRadius: 0,
                      maxWidth: 290,
                    }}>
                    {chat?.chat.includes('//등록//') ||
                    chat?.chat.includes('//수정//') ||
                    chat?.chat.includes('//취소//') ? (
                      <View style={[flex_column, sp_2]}>
                        <Typography size="lg">
                          {chat?.chat.includes('//등록//')
                            ? '약속을 만들었어요.'
                            : chat?.chat.includes('//수정//')
                            ? '약속을 수정했어요.'
                            : '약속을 취소했어요.'}
                        </Typography>
                        <Typography size="md" light>
                          날짜 : {chat?.chat.split('//')[2]}
                        </Typography>
                        <Typography size="md" light>
                          시간 : {chat?.chat.split('//')[3]}
                        </Typography>
                        {!chat?.chat.includes('//취소//') && (
                          <TouchableOpacity
                            style={[
                              {backgroundColor: blackAlpha700},
                              center,
                              flex_row,
                              p_2,
                              sp_2,
                              radius_md,
                            ]}
                            onPress={() => {
                              setView(true);
                              parsing(
                                chat?.chat.replace('//등록//', '//보기//'),
                              );
                              setOpenModal(true);
                            }}>
                            <View
                              style={[
                                flex_row,
                                sp_1,
                                align_center,
                                justify_center,
                              ]}>
                              <Typography size="md" white bold>
                                약속보기
                              </Typography>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : chat?.chat.includes('//완료//') ? (
                      <View style={[flex_column, sp_2]}>
                        <Typography>{`${chat?.chat.replaceAll(
                          '//완료//',
                          '',
                        )}`}</Typography>
                        {data?.receiver === auth().currentUser?.uid ? (
                          <Typography>
                            {
                              '5영업일 이내 설정하신 매칭원 금액의 70%를 기재해주신 계좌로 입금됩니다.\n\n(마이페이지-프로필수정-계좌입력)'
                            }
                          </Typography>
                        ) : null}
                      </View>
                    ) : chat?.chat.includes('거절') ? (
                      <>
                        <View style={[flex_column, sp_2]}>
                          <Typography>{`${chat?.chat.replaceAll(
                            '//거절//',
                            '',
                          )}`}</Typography>
                          {data?.sender === auth().currentUser?.uid ? (
                            <Typography>
                              {
                                '신청자가 결제하신 매칭권 금액은\n2영업일 이내 전액환불(카드취소)됩니다.'
                              }
                            </Typography>
                          ) : null}
                        </View>
                      </>
                    ) : (
                      <Typography size="sm" style={{whiteSpace: 'pre-wrap'}}>
                        {`${chat?.chat}`}
                      </Typography>
                    )}
                  </View>
                  <Typography size="xs" light>
                    {formatDateTime(chat?.createdAt).split(' ')[1]}
                  </Typography>
                </View>
              </View>
            ),
          )}
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          width: '100%',
          borderColor: '#d9d9d9',
          borderTopWidth: 1,
        }}>
        <View
          style={[
            styles.buttonBox,
            {flexDirection: 'row', alignItems: 'center', gap: -40},
          ]}>
          <TextInput
            placeholderTextColor={blackAlpha400}
            style={{
              fontFamily: font_family,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderColor: '#d9d9d9',
              borderWidth: 1,
              borderRadius: 15,
              padding: 10,
              color: 'black',
              width: '100%',
            }}
            readOnly={
              matchingInfo?.matching_state === 400 &&
              matchingInfo?.matching_refunder !== auth().currentUser?.uid
            }
            placeholder={
              matchingInfo?.matching_state === 400 &&
              matchingInfo?.matching_refunder !== auth().currentUser?.uid
                ? '매칭이 거절되어 채팅이 불가합니다.'
                : '메세지를 입력하세요.'
            }
            onChange={e => setChat(e.nativeEvent.text)}
            value={chat}
          />
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              backgroundColor: '#FF238D',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => handleAddChat(chat)}>
            <Image source={require('../../assets/send.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DirectRoom;
