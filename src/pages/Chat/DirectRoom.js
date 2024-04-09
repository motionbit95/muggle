import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles, {
  align_center,
  align_start,
  btn_yellow,
  f_full,
  flex_column,
  flex_row,
  img_sm,
  justify_between,
  p_1,
  radius_full,
  sp_1,
  sp_2,
  whiteAlpha900,
} from '../../style/styles';
import {formatDateTime, getDisplayAge, primary_color} from '../../firebase/api';
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

const DirectRoom = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};
  const [chat, setChat] = useState(null);
  const [matchingInfo, setMatchingInfo] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState({
    mode: 'error',
    isView: false,
    message: '',
    type: 'success',
  });

  // ScrollView의 ref를 생성합니다.
  const scrollViewRef = useRef();

  // 스크롤을 제일 아래로 내리는 함수
  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({animated: true});
  };

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
    console.log('data===>', data);
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

  const handleAddChat = async () => {
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
      message: '매칭 취소 하시겠습니까?',
      type: 'refund',
    });
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
              await updateDocument('matching', data?.mid, {
                matching_state: 2,
              });
            } else if (message.type === 'refund') {
              await updateDocument('matching', data?.mid, {
                matching_state: 400,
              });
            }
            setMessage({mode: '', isView: false, message: ''});
          }}
        />
      )}
      <View
        style={[
          {
            backgroundColor: '#FFF7E3',
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
                  ? user?.user_profile
                  : require('../../assets/avartar.png')
              }
            />
            <View style={[flex_column, sp_1]}>
              <Typography bold size="lg">
                {user?.user_name}
              </Typography>
              <View style={[flex_row, align_center, sp_1]}>
                <Typography light>
                  {getDisplayAge(user?.user_birth)}세
                </Typography>
                <View style={[p_1, {backgroundColor: whiteAlpha900}]}>
                  <Typography red>{user?.user_gender}자</Typography>
                </View>
              </View>
              <Typography light>{user?.user_place}</Typography>
            </View>
          </View>
          <View style={[flex_column, sp_1]}>
            <TouchableOpacity style={[btn_yellow, flex_row, p_1, sp_2]}>
              <Image
                style={img_sm}
                source={require('../../assets/Calendar.png')}
              />
              <Typography bold>약속잡기</Typography>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={matchingSuccess}
              style={[btn_yellow, flex_row, p_1, sp_2]}>
              <Image style={img_sm} source={require('../../assets/o.png')} />
              <Typography bold>매칭완료</Typography>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={matchingFail}
              style={[btn_yellow, flex_row, p_1, sp_2]}>
              <Image style={img_sm} source={require('../../assets/x.png')} />
              <Typography bold>매칭거절</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollViewStyle} ref={scrollViewRef}>
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
                <View style={{alignItems: 'flex-end', gap: 5}}>
                  <View
                    style={{
                      flex: 1,
                      padding: 15,
                      backgroundColor: '#F1F1F1',
                      borderRadius: 15,
                      borderTopRightRadius: 0,
                      maxWidth: 290,
                    }}>
                    <Typography size="sm" style={{whiteSpace: 'pre-wrap'}}>
                      {`${chat?.chat}`}
                    </Typography>
                  </View>
                  <Typography size="sm" light>
                    {formatDateTime(chat?.createdAt).split(' ')[1]}
                  </Typography>
                </View>
              </View>
            ) : (
              <View style={[styles.rowBox, {gap: 10}]}>
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
                <View style={{alignItems: 'flex-start', gap: 5}}>
                  <View
                    style={{
                      flex: 1,
                      padding: 15,
                      backgroundColor: '#FFDA7A',
                      borderRadius: 15,
                      borderTopLeftRadius: 0,
                    }}>
                    <Typography size="sm" style={{whiteSpace: 'pre-wrap'}}>
                      {`${chat?.chat}`}
                    </Typography>
                  </View>
                  <Typography size="xs" light>
                    {formatDateTime(chat?.createdAt).split(' ')[1]}
                  </Typography>
                </View>
              </View>
            ),
          )}
        </View>
      </ScrollView>
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
            style={{
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
            placeholder="메시지를 입력하시오."
            onChange={e => setChat(e.nativeEvent.text)}
            value={chat}
          />
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              backgroundColor: 'rgba(255, 206, 79, 1)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleAddChat}>
            <Image source={require('../../assets/send.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DirectRoom;
