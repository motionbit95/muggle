import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles, {
  center,
  f_full,
  p_3,
  p_4,
  radius_full,
  radius_lg,
  shadow_md,
  sp_3,
} from '../../style/styles';
import auth from '@react-native-firebase/auth';
import {
  getDocList,
  singleQuery,
  updateDocument,
} from '../../firebase/firebase_func';
import {getDisplayAge, primary_color} from '../../firebase/api';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation'; // 라이브러리 import
import PopupBase from '../../Component/PopupBase';
import {privacy, terms} from '../../terms';
import WebView from 'react-native-webview';
import Typography from '../../Component/Typography';
import RenderHtml from 'react-native-render-html';

const User = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};
  const [myInfo, setMyInfo] = useState(data ? data : null);
  const [goods, setGoods] = useState(null);
  const [views, setViews] = useState(null);

  useEffect(() => {
    setMyInfo(data);
  }, [data]);

  useEffect(() => {
    const getGroups = async () => {
      await getDocList('group').then(res => {
        let goodList = [];
        res.forEach(group => {
          myInfo?.goods?.forEach(async gid => {
            if (gid === group.doc_id) {
              goodList.push(group);
              console.log(new Date(), '찜했습니다.', goodList);
              setGoods(goodList);
            }
          });
        });
      });
    };

    const getViews = async () => {
      await getDocList('group').then(res => {
        let viewList = [];
        res.forEach(group => {
          myInfo?.views?.forEach(async gid => {
            if (gid === group.doc_id) {
              viewList.push(group);
              console.log(new Date(), '봤습니다.', viewList);
              setViews(viewList);
            }
          });
        });
      });
    };

    getGroups();
    getViews();
  }, [myInfo]);

  useEffect(() => {
    console.log('data ===> ', data);
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        await singleQuery('user', 'uid', user.uid).then(res => {
          if (res && res.length > 0) {
            // console.log(res[0]);
            setMyInfo(res[0]);

            Geolocation.getCurrentPosition(
              position => {
                // console.log('myInfo ===> ', res[0]?.doc_id);

                updateDocument('user', res[0]?.doc_id, {
                  ...myInfo,
                  user_location: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  },
                });
              },
              error => {
                console.error(error);
              },
              {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
            );
          }
        });
      } else {
        // console.log('없음!!');
        navigation.navigate('Account', {screen: '휴대폰 본인인증'});
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Account', {screen: '휴대폰 본인인증'});
      });
  };

  const onDeleteUser = () => {
    auth()
      .currentUser.delete()
      .then(() => {
        navigation.navigate('Account', {screen: '휴대폰 본인인증'});
      });
  };

  return (
    <View style={styles.screenStyle}>
      <View style={styles.bgStyle}>
        {/* <LinearGradient
          style={styles.bgStyle}
          start={{x: 0, y: 0}}
          colors={[primary_color, '#FF794F']}
        /> */}
      </View>
      <SafeAreaView>
        <View style={styles.contentStyle}>
          <View style={styles.UserStackStyle}>
            <View style={styles.rowBox}>
              <View>
                <View style={styles.Avartar70}>
                  <Image
                    style={[f_full, radius_full]}
                    source={
                      myInfo?.user_profile
                        ? {uri: myInfo?.user_profile}
                        : require('../../assets/avartar.png')
                    }
                  />
                </View>
              </View>
              <View style={{justifyContent: 'center', gap: 10}}>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <Typography size="xl" bold>
                    {myInfo?.user_name}님
                  </Typography>
                  <Image source={require('../../assets/star.png')} />
                  <Typography size="xl" bold>
                    {(0).toFixed(1)}
                  </Typography>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <Typography>{getDisplayAge(myInfo?.user_birth)}세</Typography>
                  <Typography>|</Typography>
                  <Typography>{myInfo?.user_gender}자</Typography>
                  <Typography>|</Typography>
                  <Typography>{myInfo?.user_place[0]}</Typography>
                </View>
                <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
                  {myInfo?.user_interest?.map((item, index) => (
                    <View
                      style={{
                        paddingVertical: 3,
                        paddingHorizontal: 4,
                        borderRadius: 30,
                        backgroundColor: '#f1f1f1',
                        // borderWidth: 1,
                        // borderColor: 'white',
                      }}>
                      <Typography size="sm">{item}</Typography>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('프로필 편집', {data: myInfo})}>
            <View
              style={[center, p_4, radius_lg, {backgroundColor: '#FF5E5B'}]}>
              <Typography bold white size="lg">
                프로필 수정
              </Typography>
            </View>
          </TouchableOpacity>
          <View style={[sp_3, shadow_md]}>
            <View style={[styles.rowBox, styles.itembox]}>
              <TouchableOpacity
                style={styles.one_thirdBoxStyle}
                onPress={() =>
                  navigation.navigate('모임', {
                    screen: '모임리스트',
                    params: {
                      data: goods,
                      // userList: userList,
                      title: '찜모임',
                    },
                  })
                }>
                <View style={center}>
                  <Typography size="2xl" bold>
                    {myInfo?.goods ? myInfo?.goods.length : 0}
                  </Typography>
                  <Typography>찜모임</Typography>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.one_thirdBoxStyle}
                onPress={() =>
                  navigation.navigate('모임', {
                    screen: '모임리스트',
                    params: {
                      data: views,
                      // userList: userList,
                      title: '최근 본 모임',
                    },
                  })
                }>
                <View style={center}>
                  <Typography size="2xl" bold>
                    {myInfo?.views ? myInfo?.views.length : 0}
                  </Typography>
                  <Typography>최근 본 모임</Typography>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.one_thirdBoxStyle}>
                <View style={center}>
                  <Typography size="2xl" bold>
                    0
                  </Typography>
                  <Typography>초대받은 모임</Typography>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{backgroundColor: 'white', borderRadius: 10, padding: 10}}>
              <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={() =>
                  navigation.navigate('매칭', {screen: '매칭내역'})
                }>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/menuicon1.png')} />
                  <Typography>매칭내역</Typography>
                </View>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={() => navigation.navigate('마이', {screen: '알림'})}>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/menuicon1.png')} />
                  <Typography>알림설정</Typography>
                </View>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
              <PopupBase
                button={
                  <View style={styles.TouchButtonStyle}>
                    <View style={styles.rowBox}>
                      <Image source={require('../../assets/menuicon1.png')} />
                      <Typography>이용약관</Typography>
                    </View>
                    <Image source={require('../../assets/rightarrow.png')} />
                  </View>
                }>
                {Platform.OS === 'ios' ? (
                  <WebView
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/dinnermate-8d37b.appspot.com/o/files%2F%E1%84%86%E1%85%A5%E1%84%80%E1%85%B3%E1%86%AF%2B%E1%84%89%E1%85%A5%E1%84%87%E1%85%B5%E1%84%89%E1%85%B3%2B%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%80%E1%85%AA%E1%86%AB%2B%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%2B%E1%84%89%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%A6%2B%E1%84%87%E1%85%A9%E1%86%AB%2B240401.docx?alt=media&token=20c0dd2d-11af-4e71-8536-5f141f763983',
                    }} // 표시할 웹 페이지의 URL
                    style={{
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height,
                    }}
                  />
                ) : (
                  <View style={p_3}>
                    <RenderHtml
                      contentWidth={Dimensions.get('window').width}
                      source={{html: terms}}
                    />
                  </View>
                )}
              </PopupBase>
              <PopupBase
                button={
                  <View style={styles.TouchButtonStyle}>
                    <View style={styles.rowBox}>
                      <Image source={require('../../assets/menuicon1.png')} />
                      <Typography>개인정보 처리방침</Typography>
                    </View>
                    <Image source={require('../../assets/rightarrow.png')} />
                  </View>
                }>
                {Platform.OS === 'ios' ? (
                  <WebView
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/dinnermate-8d37b.appspot.com/o/files%2F%E1%84%86%E1%85%A5%E1%84%80%E1%85%B3%E1%86%AF%2B%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5%E1%84%87%E1%85%A1%E1%86%BC%E1%84%8E%E1%85%B5%E1%86%B7%2B%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%2B%E1%84%89%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%A6%E1%84%87%E1%85%A9%E1%86%AB%2B240401.docx?alt=media&token=c88e43c5-af85-4184-8504-9b54b7d81ae3',
                    }} // 표시할 웹 페이지의 URL
                    style={{
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height,
                    }}
                  />
                ) : (
                  <View style={p_3}>
                    <RenderHtml
                      contentWidth={Dimensions.get('window').width}
                      source={{html: privacy}}
                    />
                  </View>
                )}
              </PopupBase>
              <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={onLogout}>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/menuicon1.png')} />
                  <Typography>로그아웃</Typography>
                </View>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={onDeleteUser}>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/menuicon1.png')} />
                  <Typography>탈퇴하기</Typography>
                </View>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default User;
