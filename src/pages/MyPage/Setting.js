import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles, {
  align_center,
  align_end,
  align_start,
  center,
  f_full,
  flex_column,
  flex_row,
  img_md,
  img_sm,
  justify_center,
  justify_end,
  justify_start,
  m_16,
  p_2,
  p_3,
  p_4,
  radius_full,
  radius_lg,
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

const Setting = ({navigation, route}) => {
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
        navigation.navigate('계정', {screen: '휴대폰 본인인증'});
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
        navigation.navigate('계정', {screen: '휴대폰 본인인증'});
      });
  };

  const onDeleteUser = () => {
    auth()
      .currentUser.delete()
      .then(() => {
        navigation.navigate('계정', {screen: '휴대폰 본인인증'});
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
      <ScrollView>
        <View style={f_full}>
          <View style={[sp_3, shadow_md, w_full]}>
            <View
              style={[
                w_full,
                flex_column,
                sp_2,
                {borderRadius: 10, padding: 10},
              ]}>
              <View style={(flex_column, sp_2, p_2)}>
                <View style={{marginBottom: 10}}>
                  <Typography size="lg" bold>
                    안내
                  </Typography>
                </View>
                <TouchableOpacity
                  style={[w_full, styles.TouchButtonStyle]}
                  onPress={() =>
                    navigation.navigate('마이', {screen: '자주묻는질문'})
                  }>
                  <View style={styles.rowBox}>
                    <Typography>자주묻는질문</Typography>
                  </View>
                  <Image source={require('../../assets/rightarrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[w_full, styles.TouchButtonStyle]}
                  onPress={() =>
                    navigation.navigate('마이', {screen: '고객센터'})
                  }>
                  <View style={styles.rowBox}>
                    <Typography>고객센터 및 개선 의견 보내기</Typography>
                  </View>
                  <Image source={require('../../assets/rightarrow.png')} />
                </TouchableOpacity>
              </View>
              <View style={(flex_column, sp_2, p_2)}>
                <View style={{marginBottom: 10}}>
                  <Typography size="lg" bold>
                    계정관리
                  </Typography>
                </View>
                <TouchableOpacity
                  style={styles.TouchButtonStyle}
                  onPress={onLogout}>
                  <View style={styles.rowBox}>
                    <Typography>로그아웃</Typography>
                  </View>
                  <Image source={require('../../assets/rightarrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.TouchButtonStyle}
                  onPress={onDeleteUser}>
                  <View style={styles.rowBox}>
                    <Typography>탈퇴하기</Typography>
                  </View>
                  <Image source={require('../../assets/rightarrow.png')} />
                </TouchableOpacity>
                <PopupBase
                  button={
                    <View style={styles.TouchButtonStyle}>
                      <View style={styles.rowBox}>
                        <Typography>이용약관</Typography>
                      </View>
                      <Image source={require('../../assets/rightarrow.png')} />
                    </View>
                  }>
                  <SafeAreaView>
                    <View style={[f_full]}>
                      <WebView
                        source={{
                          uri: 'https://muggle.life/terms',
                        }} // 표시할 웹 페이지의 URL
                        style={{
                          width: Dimensions.get('window').width,
                          height: 'auto',
                        }}
                      />
                    </View>
                  </SafeAreaView>
                </PopupBase>
                <PopupBase
                  button={
                    <View style={styles.TouchButtonStyle}>
                      <View style={styles.rowBox}>
                        <Typography>개인정보 처리방침</Typography>
                      </View>
                      <Image source={require('../../assets/rightarrow.png')} />
                    </View>
                  }>
                  <SafeAreaView>
                    <View style={[f_full]}>
                      <WebView
                        source={{
                          uri: 'https://muggle.life/privacy',
                        }} // 표시할 웹 페이지의 URL
                        style={{
                          width: Dimensions.get('window').width,
                          height: 'auto',
                        }}
                      />
                    </View>
                  </SafeAreaView>
                </PopupBase>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Setting;
