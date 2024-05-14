import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import styles, {
  align_center,
  align_end,
  blackAlpha400,
  blackAlpha500,
  blackAlpha900,
  btn_normal,
  btn_primary,
  btn_secondary,
  center,
  f_full,
  flex_column,
  flex_row,
  font_family,
  fs_md,
  fw_bold,
  img_md,
  img_sm,
  justify_around,
  justify_between,
  justify_center,
  justify_end,
  p_2,
  p_3,
  p_4,
  p_5,
  p_6,
  radius_lg,
  radius_md,
  radius_sm,
  radius_xl,
  sp_1,
  sp_2,
  sp_3,
  sp_4,
  sp_6,
  w_full,
} from '../../style/styles';
import {
  calculateDday,
  formatDate,
  displayDday,
  formatDateTime,
  defaultMale,
  defaultFemale,
  primary_color,
  getDisplayAge,
} from '../../firebase/api';
import auth from '@react-native-firebase/auth';
import {
  addChat,
  addDocument,
  deleteDocument,
  singleQuery,
  updateDocument,
} from '../../firebase/firebase_func';
import Typography from '../../Component/Typography';
import MessageBox from '../../Component/MessageBox';

import KakaoShareLink from 'react-native-kakao-share-link';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const GroupDetail = ({navigation, route}) => {
  const [toolbar, setToolbar] = useState(false);
  const {data, userList} = route.params ? route.params : {data: null};
  const [openModal, setOpenModal] = useState(false);
  const [isPoint, setIsPoint] = useState(false);
  const [inAppIndex, setInAppIndex] = useState(0);
  // console.log(data ? data : 'no data');
  // 디데이 계산 및 표시
  var dday = calculateDday(formatDate(data?.group_time));
  const [myInfo, setMyInfo] = useState(null);
  const [icon, setIcon] = useState(require('../../assets/icons/heart.png'));
  const [groupUsers, setGroupUsers] = useState([]);

  const [openAlert, setOpenAlert] = useState(false);
  const [reportText, setReportText] = useState('');

  const [message, setMessage] = useState({
    mode: 'error',
    isView: false,
    message: '',
    type: '',
  });

  // 제목을 헤더 타이틀로 설정
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: data?.group_type === '일상 모임' ? '1:1 일상 모임' : '단체 모임',
      headerRight: () => (
        <View style={[flex_row, justify_end, sp_2]}>
          <TouchableOpacity onPress={clickShare}>
            <Image
              style={{width: 26, height: 26}}
              source={require('../../assets/kakao.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setToolbar(true);
            }}>
            <Image source={require('../../assets/icons/MdMoreVert.png')} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [data]);

  useEffect(() => {
    const getUserInfo = async user => {
      singleQuery('user', 'uid', auth().currentUser.uid).then(res => {
        setMyInfo(res[0]);
        if (res[0].goods?.includes(data?.doc_id)) {
          setIcon(require('../../assets/icons/heart_fill.png'));
        }
      });
    };

    const getGroupUsers = async () => {
      let groupUsers = [];
      for (let i = 0; i < data.group_users?.length; i++) {
        const user = await singleQuery('user', 'uid', data.group_users[i]);
        groupUsers.push(user[0]);
      }
      setGroupUsers(groupUsers);
    };
    getGroupUsers();

    getUserInfo();
  }, []);

  const handleGoods = async gid => {
    if (!myInfo) return;
    if (!myInfo.goods) {
      myInfo.goods = [];
    }
    if (myInfo.goods.includes(gid)) {
      // 지우기
      myInfo.goods = myInfo.goods.filter(g => g !== gid);
      setIcon(require('../../assets/icons/heart.png'));
    } else {
      myInfo.goods.push(gid);
      setIcon(require('../../assets/icons/heart_fill.png'));
    }

    // console.log(myInfo.goods);

    await updateDocument('user', myInfo.doc_id, myInfo);
  };

  useEffect(() => {
    if (myInfo) handleView(data.doc_id);
  }, [myInfo]);

  const handleView = async gid => {
    if (!myInfo) return;
    if (!myInfo.views) {
      myInfo.views = [];
    }
    if (myInfo.views.includes(gid)) {
      // 지우기
      // myInfo.views = myInfo.views.filter(g => g !== gid);
    } else {
      myInfo.views.push(gid);
    }

    await updateDocument('user', myInfo.doc_id, myInfo);
  };

  const handleEnterGroup = async () => {
    const chat_id =
      data.group_type === '일상 모임'
        ? data?.doc_id + '_' + auth().currentUser.uid + '_' + data?.group_admin
        : data?.doc_id;

    if (!auth().currentUser) {
      setMessage({
        mode: 'error',
        isView: true,
        message: '회원만 모임에 참여할 수 있습니다.',
        type: 'login',
      });
      return;
    }

    if (!data.group_users) {
      data.group_users = [];
    }
    if (data.group_users.includes(auth().currentUser.uid)) {
      // 지우기
      // data.group_users = data.group_users.filter(
      //   g => g !== auth().currentUser.uid,
      // );
    } else {
      data.group_users.push(auth().currentUser.uid);

      if (data.group_type === '일상 모임') {
        addChat({
          gid:
            data?.doc_id +
            '_' +
            auth().currentUser.uid +
            '_' +
            data?.group_admin,
          group_info: data?.group_info,
          doc_id: 'chat_info',
          last_message: '',
          createAt: new Date(),
          chat_users: [
            {
              uid: data?.group_admin,
              unRead: 0,
            },
            {
              uid: auth()?.currentUser?.uid,
              unRead: 0,
            },
          ],
        });
      }
    }

    // console.log(data.group_users);

    await updateDocument('group', data.doc_id, data);

    navigation.navigate('채팅', {
      screen: '채팅룸',
      params: {data: {...data, gid: chat_id}, userList: userList},
    });
  };

  const clickShare = async () => {
    // console.log(data?.group_type);
    setMessage({
      mode: 'confirm',
      isView: true,
      message: `친구에게 ${
        data?.group_type === '일상 모임' ? '이성' : '모임'
      }을 소개시켜주세요!`,
      type: 'share',
    });
  };

  const shareApp = async () => {
    try {
      const response = await KakaoShareLink.sendFeed({
        content: {
          title: data?.group_name,
          imageUrl: data?.group_image,
          link: {
            webUrl: 'https://muggle.life/',
            mobileWebUrl: 'muggle://group ',
          },
          description: data?.group_target,
        },
      });
      // console.log(response);
    } catch (e) {
      console.error(e);
      console.error(e.message);
    }
  };

  const addReort = async () => {
    addDocument('report', {
      gid: data?.doc_id,
      uid: auth().currentUser.uid,
      createAt: new Date(),
      description: reportText,
    });
  };

  const handleDeleteGroup = async () => {
    await deleteDocument('group', data?.doc_id).then(() => {
      navigation.navigate('모임', {screen: 'Muggle'});
    });
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setToolbar(false)}
        // style={styles.screenStyle}
        style={f_full}>
        <View
          style={{
            display: toolbar ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'white',
            width: '50%',
            zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {data?.group_admin === auth().currentUser.uid && (
            <>
              <TouchableOpacity
                onPress={() => {
                  setToolbar(false);
                  navigation.navigate('모임수정', {data: data});
                }}
                style={[p_4, flex_row, align_center, justify_between, w_full]}>
                <Typography size="lg">모임 수정하기</Typography>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMessage({
                    mode: 'confirm',
                    isView: true,
                    message: '모임을 삭제하시겠습니까?',
                    type: 'delete',
                  });
                  setToolbar(false);
                }}
                style={[p_4, flex_row, align_center, justify_between, w_full]}>
                <Typography size="lg">모임 삭제하기</Typography>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
            </>
          )}
          {/* <TouchableOpacity
          onPress={() => {
            setToolbar(false);
            clickShare();
          }}
          style={[p_4, flex_row, align_center, justify_between, w_full]}>
          <Typography size="lg">모임 URL 공유하기</Typography>
          <Image source={require('../../assets/rightarrow.png')} />
        </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              setToolbar(false);
              setOpenAlert(true);
            }}
            style={[p_4, flex_row, align_center, justify_between, w_full]}>
            <Typography size="lg">모임 신고 하기</Typography>
            <Image source={require('../../assets/rightarrow.png')} />
          </TouchableOpacity>
        </View>
        {message.isView && (
          <MessageBox
            visible={message.isView}
            mode={message.mode}
            message={message.message}
            onCancel={() => setMessage({mode: '', isView: false, message: ''})}
            onOK={async () => {
              // 메세지 박스 닫기
              if (message.type === 'success') {
                handleEnterGroup();
              }
              if (message.type === 'delete') {
                handleDeleteGroup();
              }
              setMessage({mode: '', isView: false, message: ''});
            }}
            type={message.type}
            render={
              <TouchableOpacity style={sp_2} onPress={shareApp}>
                <Image source={require('../../assets/kakao.png')} />
                <Typography light bold>
                  카카오톡초대
                </Typography>
              </TouchableOpacity>
            }
          />
        )}
        <KeyboardAwareScrollView style={styles.scrollViewStyle}>
          <Image
            source={{uri: data?.group_image}}
            style={[styles.banner, {backgroundColor: '#d9d9d9'}]}
          />
          <View style={styles.contentStyle}>
            <View
              style={{
                flex: 1,
                gap: 20,
              }}>
              <View style={[w_full, flex_row, justify_between]}>
                <Typography bold size="lg">
                  {data?.group_name}
                </Typography>
                <View style={[flex_row, sp_4]}>
                  {data?.group_type !== '일상 모임' && (
                    <View
                      style={[
                        radius_sm,
                        {
                          backgroundColor: primary_color,
                          paddingHorizontal: 5,
                          paddingVertical: 3,
                        },
                      ]}>
                      <Typography white>{displayDday(dday)}</Typography>
                    </View>
                  )}
                </View>
              </View>
              {data?.group_type !== '일상 모임' && (
                <View style={styles.gap10}>
                  <View style={styles.rowBox}>
                    <Image
                      style={img_sm}
                      source={require('../../assets/icons/calendar.png')}
                    />
                    <Typography>{formatDateTime(data?.group_time)}</Typography>
                  </View>
                  <View style={styles.rowBox}>
                    <Image
                      style={img_sm}
                      source={require('../../assets/icons/map.png')}
                    />
                    <Typography>{data?.group_place}</Typography>
                  </View>
                  <View style={styles.rowBox}>
                    <Image
                      style={img_sm}
                      source={require('../../assets/icons/money.png')}
                    />
                    <Typography>
                      {data?.group_price ? data?.group_price : '나누기'}
                    </Typography>
                  </View>
                  <View style={styles.rowBox}>
                    <Image
                      style={img_sm}
                      source={require('../../assets/icons/user.png')}
                    />
                    <Typography>
                      {data?.group_users?.length} / {data?.group_personnel} (
                      {data?.group_personnel - data?.group_users?.length}자리
                      남음)
                    </Typography>
                  </View>
                </View>
              )}

              <View style={{flex: 1}}>
                <Typography>{data?.group_target}</Typography>
              </View>
              <View style={styles.hr} />
            </View>

            {data?.group_type !== '일상 모임' ? (
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  paddingTop: 20,
                  gap: 20,
                }}>
                <View>
                  <Typography bold>
                    참여인원 ( {data?.group_users?.length} )
                  </Typography>
                </View>
                <View
                  style={{
                    rowGap: 20,
                    columnGap: 0,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {groupUsers?.map((user, index) => (
                    <TouchableOpacity
                      disabled={
                        !data.group_users.includes(auth().currentUser.uid)
                      }
                      onPress={() =>
                        navigation.navigate('모임', {
                          screen: '유저',
                          params: {data: user, userList: userList},
                        })
                      }
                      style={[styles.rowBox, {width: '50%'}]}>
                      <View key={index} style={[flex_row, center, sp_2]}>
                        <Image
                          source={{
                            uri: user?.user_profile
                              ? user?.user_profile
                              : user?.user_gender === '남'
                              ? defaultMale
                              : defaultFemale,
                            // ? user?.user_profile
                            // : user?.user_gender === 'male' ||
                            //   user?.user_gender === '남'
                            // ? defaultMale
                            // : defaultFemale,
                          }}
                          width={30}
                          height={30}
                          borderRadius={50}
                        />
                        <Typography black={user} light={!user}>
                          {user ? user?.user_name : '탈퇴한 회원입니다.'}
                        </Typography>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  paddingTop: 20,
                  gap: 20,
                }}>
                <View>
                  <Typography bold>상대 프로필</Typography>
                </View>
                <View
                  style={{
                    rowGap: 20,
                    columnGap: 0,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {groupUsers?.map(
                    (user, index) =>
                      user?.uid === data?.group_admin && (
                        <View
                          key={index}
                          // onPress={() =>
                          //   navigation.navigate('모임', {
                          //     screen: '유저',
                          //     params: {data: user, userList: userList},
                          //   })
                          // }
                          style={[styles.rowBox, {width: '50%'}]}>
                          <View key={index} style={[flex_row, sp_3, center]}>
                            <Image
                              source={{
                                uri: user?.user_profile
                                  ? user?.user_profile
                                  : user?.user_gender === '남'
                                  ? defaultMale
                                  : defaultFemale,
                                // ? user?.user_profile
                                // : user?.user_gender === 'male' ||
                                //   user?.user_gender === '남'
                                // ? defaultMale
                                // : defaultFemale,
                              }}
                              width={60}
                              height={60}
                              borderRadius={50}
                            />
                            <Typography black={user} light={!user}>
                              {user
                                ? user?.user_name +
                                  '(' +
                                  user?.user_gender +
                                  ') ' +
                                  getDisplayAge(user?.user_birth)
                                : '탈퇴한 회원입니다.'}
                            </Typography>
                          </View>
                        </View>
                      ),
                  )}
                </View>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        <View style={[styles.buttonBox, styles.rowBox]}>
          {data?.group_admin === auth().currentUser.uid ? (
            <TouchableOpacity disabled style={[btn_normal, {flex: 1}]}>
              <Typography size="lg" bold light>
                모임의 주최자입니다.
                {/* {data?.group_users.includes(auth().currentUser.uid)
                    ? '채팅하기'
                    : '참여하기'} */}
              </Typography>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, {flex: 1}]}
              disabled={
                data?.group_type === '일상 모임' ||
                data?.group_users?.length < data?.group_personnel
                  ? false
                  : true
              }
              onPress={() => {
                setIsPoint(false);
                setOpenModal(true);
              }}>
              <Typography size="lg" bold white>
                {data?.group_type === '일상 모임' ||
                data?.group_users?.length < data?.group_personnel
                  ? '참여하기'
                  : '제한 인원 마감'}
                {/* {data?.group_users.includes(auth().currentUser.uid)
              ? '채팅하기'
              : '참여하기'} */}
              </Typography>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => handleGoods(data.doc_id)}>
            <Image source={icon} style={{width: 24, height: 20}} />
          </TouchableOpacity>

          <Modal visible={openModal} animationType="fade" transparent={true}>
            <View
              style={[
                w_full,
                align_end,
                justify_end,
                {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'},
              ]}>
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
                      참여 신청하시겠어요?
                    </Typography>
                    <Typography light>
                      하트를 구매해 참여할 수 있어요.
                    </Typography>
                    <View style={[w_full, flex_row, sp_2]}>
                      <TouchableOpacity
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
                              inAppIndex === 0 ? '#8c8c8c' : '#d9d9d9',
                            flex: 1,
                          },
                        ]}>
                        <View style={[center, sp_6]}>
                          <View
                            style={[flex_row, align_center, justify_center]}>
                            <Image
                              style={img_md}
                              source={require('../../assets/icons/heart_fill.png')}
                            />
                            <Typography bold size="3xl">
                              180
                            </Typography>
                          </View>
                          <View>
                            <Typography bold size="lg">
                              {'₩8,800'}
                            </Typography>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setInAppIndex(1)}
                        style={[
                          radius_md,
                          center,
                          sp_6,
                          p_3,
                          {
                            backgroundColor:
                              inAppIndex === 1 ? '#f1f1f1' : 'white',
                            borderWidth: inAppIndex === 1 ? 2 : 1,
                            borderColor:
                              inAppIndex === 1 ? '#8c8c8c' : '#d9d9d9',
                            flex: 1,
                          },
                        ]}>
                        <View style={[center, sp_6]}>
                          <View
                            style={[flex_row, align_center, justify_center]}>
                            <Image
                              style={img_md}
                              source={require('../../assets/icons/heart_fill.png')}
                            />
                            <Typography bold size="3xl">
                              550
                            </Typography>
                          </View>
                          <View>
                            <Typography bold size="lg">
                              {'₩22,000'}
                            </Typography>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setInAppIndex(2)}
                        style={[
                          radius_md,
                          center,
                          sp_6,
                          p_3,
                          {
                            backgroundColor:
                              inAppIndex === 2 ? '#f1f1f1' : 'white',
                            borderWidth: inAppIndex === 2 ? 2 : 1,
                            borderColor:
                              inAppIndex === 2 ? '#8c8c8c' : '#d9d9d9',
                            flex: 1,
                          },
                        ]}>
                        <View style={[center, sp_6]}>
                          <View
                            style={[flex_row, align_center, justify_center]}>
                            <Image
                              style={img_md}
                              source={require('../../assets/icons/heart_fill.png')}
                            />
                            <Typography bold size="3xl">
                              1000
                            </Typography>
                          </View>
                          <View>
                            <Typography bold size="lg">
                              {'₩39,000'}
                            </Typography>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={btn_primary}
                      onPress={() => {
                        setOpenModal(false);
                        setMessage({
                          mode: 'error',
                          isView: true,
                          message:
                            '스토어 앱 등록 후 확인 가능합니다. 확인 클릭 시 채팅방으로 이동',
                          type: 'success',
                        });
                      }}>
                      <View
                        style={[flex_row, sp_1, align_center, justify_center]}>
                        <Typography bold white size="lg">
                          즉시 구매하기
                        </Typography>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={btn_secondary}
                      onPress={() => setOpenModal(false)}>
                      <View
                        style={[flex_row, sp_1, align_center, justify_center]}>
                        <Typography size="md" light>
                          다음에 하기
                        </Typography>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={[w_full, sp_3]}>
                    <Typography size="xl" bold>
                      참여 신청하시겠어요?
                    </Typography>
                    <Typography light>
                      상대에게 내 프로필이 공개되며, 참여 신청 후 1:1 채팅방으로
                      연결됩니다.
                    </Typography>
                    <TouchableOpacity
                      style={btn_primary}
                      onPress={() => {
                        // 여기서 포인트 있는지 없는지 검사
                        setIsPoint(true);
                      }}>
                      <View
                        style={[flex_row, sp_1, align_center, justify_center]}>
                        <Typography bold white size="lg">
                          참여신청
                        </Typography>
                        <View style={[flex_row, align_center, justify_center]}>
                          <Image
                            style={[img_sm, {opacity: 0.5}]}
                            source={require('../../assets/icons/heart_fill_black.png')}
                          />
                          <Typography size="sm" light>
                            50
                          </Typography>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
      <Modal
        visible={openAlert}
        animationType="fade"
        transparent={true}
        style={styles.dropdown}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[
            w_full,
            // align_end,
            // justify_end,
            {
              flex: 1,
              flexDirection: 'column-reverse',
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
          ]}>
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
            <TouchableOpacity onPress={() => setOpenAlert(false)}>
              <Image
                source={require('../../assets/icons/_x.png')}
                style={[img_sm, {opacity: 0.5}]}
              />
            </TouchableOpacity>

            <View style={[w_full, sp_6]}>
              <Typography size="xl" bold>
                신고내용을 기재해주세요.
              </Typography>
              <TextInput
                placeholderTextColor={blackAlpha400}
                onChange={e => setReportText(e.nativeEvent.text)}
                multiline
                style={[
                  {
                    fontFamily: font_family,
                    color: 'black',
                    height: 100,
                    textAlignVertical: 'top',
                  },
                  styles.contentBox,
                ]}
                placeholder="허위신고시 이용이 제한될 수 있습니다."
              />

              <View
                style={[
                  flex_row,
                  w_full,
                  justify_around,
                  {paddingHorizontal: 20},
                ]}>
                <TouchableOpacity onPress={() => setOpenAlert(false)}>
                  <Typography size="md">취소</Typography>
                </TouchableOpacity>
                <Typography light>|</Typography>

                <TouchableOpacity
                  onPress={() => {
                    addReort();
                    setOpenAlert(false);
                    setMessage({
                      mode: '',
                      isView: true,
                      message: '신고가 접수되었습니다.',
                      type: '',
                    });
                  }}>
                  <Typography size="md">확인</Typography>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default GroupDetail;
