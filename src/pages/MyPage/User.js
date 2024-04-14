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
  align_center,
  align_end,
  btn_normal,
  btn_secondary,
  center,
  f_full,
  flex_row,
  img_md,
  img_sm,
  justify_end,
  p_1,
  p_2,
  p_3,
  p_4,
  radius_full,
  radius_lg,
  radius_md,
  radius_sm,
  shadow_md,
  sp_2,
  sp_3,
  w_full,
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
import MessageBox from '../../Component/MessageBox';

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
        navigation.navigate('User', {screen: 'Account'});
      }
    });

    // return () => {
    //   unsubscribe();
    // };
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
          <View style={[w_full, flex_row, align_end, justify_end, sp_3]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('마이', {screen: '설정'})}>
              <Image
                style={img_md}
                source={require('../../assets/icons/AiOutlineSetting.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.UserStackStyle]}>
            <View style={[w_full, flex_row, align_center, sp_3]}>
              <View style={sp_2}>
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('프로필 편집', {data: myInfo})
                  }>
                  <View
                    style={[
                      center,
                      p_2,
                      radius_md,
                      {backgroundColor: '#d9d9d9'},
                    ]}>
                    <Typography bold white size="sm">
                      프로필 수정
                    </Typography>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[w_full, sp_3]}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
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
                <View style={[flex_row, sp_2]}>
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
          <View style={[sp_3, shadow_md]}>
            <View style={[styles.rowBox, styles.itembox]}>
              <TouchableOpacity
                style={styles.one_thirdBoxStyle}
                onPress={() =>
                  navigation.navigate('마이', {
                    screen: '모임리스트',
                    params: {
                      type: 'goods',
                      title: '찜 목록',
                      myInfo: myInfo,
                    },
                  })
                }>
                <View style={center}>
                  <Typography size="2xl" bold>
                    {myInfo?.goods ? myInfo?.goods.length : 0}
                  </Typography>
                  <Typography>찜 목록</Typography>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.one_thirdBoxStyle}
                onPress={() =>
                  navigation.navigate('마이', {
                    screen: '모임리스트',
                    params: {
                      type: 'views',
                      // userList: userList,
                      title: '최근 본 모임',
                      myInfo: myInfo,
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
                  navigation.navigate('마이', {
                    screen: '활동내역',
                    params: {myInfo: myInfo},
                  })
                }>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/icons/Order.png')} />
                  <Typography>활동내역</Typography>
                </View>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={() =>
                  navigation.navigate('매칭', {screen: '매칭내역'})
                }>
                <View style={styles.rowBox}>
                  <Image
                    source={require('../../assets/icons/User_add_alt.png')}
                  />
                  <Typography>매칭내역</Typography>
                </View>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={() =>
                  navigation.navigate('마이', {screen: '알림설정'})
                }>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/icons/Bell.png')} />
                  <Typography>알림설정</Typography>
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
