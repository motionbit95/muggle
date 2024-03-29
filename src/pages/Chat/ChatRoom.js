import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../style/styles';

const addChatRoom = async () => {
  const key = push(chatRoomsRef).key;
  const newChatRoom = {
    id: key,
    name: name,
    description: description,
    createdBy: {
      name: currentUser.displayName,
      image: currentUser.photoURL,
    },
  };

  try {
    await update(child(chatRoomsRef, key), newChatRoom);
    setName('');
    setDescription('');
    setShow(false);
  } catch (error) {
    alert(error);
  }
};

const ChatRoom = () => {
  return (
    <View style={styles.screenStyle}>
      <ScrollView style={styles.scrollViewStyle}>
        <View style={[styles.matchBox, {margin: 10}]}>
          <View style={[styles.spaceBetween, styles.rowBox]}>
            <View style={{gap: 10}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
                퇴근 후 역삼역에서 저녁 드실분
              </Text>
              <View style={styles.rowBox}>
                <Text style={{fontSize: 14, fontWeight: '400', color: 'gray'}}>
                  2023.03.09(토) 17:00
                </Text>
              </View>
              <View style={{gap: 5}}>
                <View style={[styles.rowBox, {gap: 5}]}>
                  <View style={styles.icon18} />
                  <Text style={{color: 'black'}}>
                    서울 강남 역 삼동 골목오리집
                  </Text>
                </View>
                <View style={[styles.rowBox, {gap: 5}]}>
                  <View style={styles.icon18} />
                  <Text style={{color: 'black'}}>나누기 5/30</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[styles.contentStyle, {gap: 15, justifyContent: 'flex-end'}]}>
          {/* 왼쪽 배치 rowBox, 시간은 flex-start
          본인 채팅 시 오른쪽배치 시 row-reverse, 시간은 flex-end 조건, 색상 rgba(255, 218, 122, 1) 추가 */}
          <View style={[styles.rowBox, {gap: 10}]}>
            <View style={{gap: 10, alignItems: 'center'}}>
              <View>
                <View style={styles.Avartar50}>
                  <Image
                    style={{width: '90%', height: '90%'}}
                    source={require('../../assets/avartar.png')}
                  />
                </View>
              </View>
              <Text style={{color: 'black'}}>홍길동</Text>
            </View>
            <View style={{alignItems: 'flex-start', gap: 5}}>
              <View
                style={{
                  flex: 1,
                  padding: 15,
                  backgroundColor: '#d9d9d9',
                  borderRadius: 15,
                  borderTopLeftRadius: 0,
                }}>
                <Text style={{color: 'black'}}>커피 마실래요?</Text>
              </View>
              <Text style={{color: 'black'}}>13:59</Text>
            </View>
          </View>
          <View
            style={[
              {alignItems: 'flex-end', flexDirection: 'row-reverse', gap: 10},
            ]}>
            <View style={{gap: 10, alignItems: 'center'}}>
              <View>
                <View style={styles.Avartar50}>
                  <Image
                    style={{width: '90%', height: '90%'}}
                    source={require('../../assets/avartar.png')}
                  />
                </View>
              </View>
              <Text style={{color: 'black'}}>홍길동</Text>
            </View>
            <View style={{alignItems: 'flex-end', gap: 5}}>
              <View
                style={{
                  flex: 1,
                  padding: 15,
                  backgroundColor: 'rgba(255, 218, 122, 1)',
                  borderRadius: 15,
                  borderTopRightRadius: 0,
                }}>
                <Text style={{color: 'black'}}>반가워요!</Text>
              </View>
              <Text style={{color: 'black'}}>14:00</Text>
            </View>
          </View>
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
            onPress={() => alert('button눌렀엉')}>
            <Image source={require('../../assets/send.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatRoom;
