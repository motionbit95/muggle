import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles, {
  align_center,
  blackAlpha500,
  blackAlpha900,
  f_full,
  flex_row,
  fs_md,
  fs_sm,
  fs_xs,
  fw_bold,
  justify_between,
  radius_full,
  sp_2,
} from '../../style/styles';
import {formatDateTime, primary_color} from '../../firebase/api';
import {mapImg, moneyImg, userImg} from '../../Component/GroupBox';
import firestore from '@react-native-firebase/firestore';
import {addDocument, getUser} from '../../firebase/firebase_func';
import auth from '@react-native-firebase/auth';

const ChatRoom = ({navigation, route}) => {
  const {data, userList} = route.params ? route.params : {data: null};
  const [chat, setChat] = useState(null);
  const [groupInfo, setGroupInfo] = useState(null);
  const [chatList, setChatList] = useState([]);

  // ScrollView의 ref를 생성합니다.
  const scrollViewRef = useRef();

  // 스크롤을 제일 아래로 내리는 함수
  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({animated: true});
  };

  useEffect(() => {
    // console.log('data===>', data);
    const unsubscribe = firestore()
      .collection('chat-' + data.gid)
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

    await addDocument('chat-' + data.gid, {
      chat: chat,
      user_info: userInfo,
      uid: auth().currentUser.uid,
      createdAt: new Date(),
    });

    // console.log(chat);
    setChat(null);
  };
  return (
    <View style={styles.screenStyle}>
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
        <View style={[flex_row, justify_between]}>
          <View style={{gap: 5}}>
            <Text
              style={{
                fontSize: fs_md,
                fontWeight: fw_bold,
                color: blackAlpha900,
              }}>
              {data?.group_name}
            </Text>
            <View style={[flex_row, align_center, sp_2]}>
              <Text
                style={{
                  fontSize: fs_sm,
                  fontWeight: '400',
                  color: blackAlpha500,
                }}>
                {formatDateTime(data?.group_date)}
              </Text>
              {/* <View
                  style={[
                    radius_sm,
                    {
                      backgroundColor: primary_color,
                      paddingHorizontal: 5,
                      paddingVertical: 3,
                    },
                  ]}>
                  <Text
                    style={[
                      {
                        fontWeight: fw_bold,
                        fontSize: fs_sm,
                        color: whiteAlpha900,
                      },
                    ]}>
                    {displayDday(calculateDday(formatDate(data?.group_time)))}
                  </Text>
                </View> */}
            </View>

            <View style={{gap: 5}}>
              <View style={[styles.rowBox, {gap: 5}]}>
                <Image style={{width: 16, height: 16}} source={mapImg} />
                <Text style={{color: blackAlpha900, fontSize: fs_sm}}>
                  {data?.group_place}
                </Text>
              </View>
              <View style={[styles.rowBox, {gap: 5}]}>
                <Image style={{width: 16, height: 16}} source={moneyImg} />
                <Text style={{color: blackAlpha900, fontSize: fs_sm}}>
                  {data?.group_price}
                </Text>
                <Image style={{width: 16, height: 16}} source={userImg} />
                <Text
                  style={{
                    color: primary_color,
                    fontWeight: fw_bold,
                    fontSize: fs_sm,
                  }}>
                  {data?.group_users.length}
                </Text>
                <Text style={{color: blackAlpha900, fontSize: fs_sm}}>
                  / {data?.group_personnel} (
                  {data?.group_personnel - data?.group_users.length}
                  자리 남음)
                </Text>
              </View>
            </View>
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
                  <Text style={{color: 'black'}}>
                    {chat?.user_info?.user_name}
                  </Text>
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
                    <Text
                      style={{color: blackAlpha900, whiteSpace: 'pre-wrap'}}>
                      {`${chat?.chat}`}
                    </Text>
                  </View>
                  <Text style={{color: blackAlpha500, fontSize: fs_xs}}>
                    {formatDateTime(chat?.createdAt).split(' ')[1]}
                  </Text>
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
                  <Text style={{color: 'black'}}>
                    {' '}
                    {chat?.user_info?.user_name}
                  </Text>
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
                    <Text
                      style={{color: blackAlpha900, whiteSpace: 'pre-wrap'}}>
                      {`${chat?.chat}`}
                    </Text>
                  </View>
                  <Text style={{color: blackAlpha500, fontSize: fs_xs}}>
                    {formatDateTime(chat?.createdAt).split(' ')[1]}
                  </Text>
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

export default ChatRoom;
