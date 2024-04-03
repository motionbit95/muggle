import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles, {
  align_center,
  f_full,
  justify_center,
  radius_full,
  sp_3,
  w_full,
} from '../../style/styles';
import auth from '@react-native-firebase/auth';
import {singleQuery, updateDocument} from '../../firebase/firebase_func';
import {getDisplayAge, primary_color} from '../../firebase/api';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation'; // 라이브러리 import
import PopupBase from '../../Component/PopupBase';
import {terms} from '../../assets/terms';
import WebView from 'react-native-webview';
import Typography from '../../Component/Typography';

const User = ({navigation}) => {
  const [myInfo, setMyInfo] = useState(null);

  useEffect(() => {
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
        <LinearGradient
          style={styles.bgStyle}
          start={{x: 0, y: 0}}
          colors={[primary_color, '#FF794F']}
        />
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
                  <Typography white size="xl" bold>
                    {myInfo?.user_name}님
                  </Typography>
                  <Image source={require('../../assets/star.png')} />
                  <Typography white size="xl" bold>
                    {(0).toFixed(1)}
                  </Typography>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <Typography white>
                    {getDisplayAge(myInfo?.user_birth)}세
                  </Typography>
                  <Typography white>|</Typography>
                  <Typography white>
                    {myInfo?.user_gender === '남' ||
                    myInfo?.user_gender === 'male'
                      ? '남성'
                      : '여성'}
                  </Typography>
                  <Typography white>|</Typography>
                  <Typography white>{myInfo?.user_place[0]}</Typography>
                </View>
                <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
                  {myInfo?.user_interest?.map((item, index) => (
                    <View
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: 'white',
                      }}>
                      <Typography white>{item}</Typography>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('프로필 편집', {data: myInfo})
                }>
                <Image source={require('../../assets/Setting.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[sp_3]}>
            <View style={[styles.rowBox, styles.itembox]}>
              <View style={styles.one_thirdBoxStyle}>
                <Typography size="2xl" bold>
                  {myInfo?.goods ? myInfo?.goods.length : 0}
                </Typography>
                <Typography>찜모임</Typography>
              </View>
              <View style={styles.one_thirdBoxStyle}>
                <Typography size="2xl" bold>
                  {myInfo?.views ? myInfo?.views.length : 0}
                </Typography>
                <Typography>최근 본 모임</Typography>
              </View>
              <View style={styles.one_thirdBoxStyle}>
                <Typography size="2xl" bold>
                  0
                </Typography>
                <Typography>초대받은 모임</Typography>
              </View>
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
                <WebView
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/dinnermate-8d37b.appspot.com/o/files%2F%E1%84%86%E1%85%A5%E1%84%80%E1%85%B3%E1%86%AF%2B%E1%84%89%E1%85%A5%E1%84%87%E1%85%B5%E1%84%89%E1%85%B3%2B%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%80%E1%85%AA%E1%86%AB%2B%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%2B%E1%84%89%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%A6%2B%E1%84%87%E1%85%A9%E1%86%AB%2B240401.docx?alt=media&token=20c0dd2d-11af-4e71-8536-5f141f763983',
                  }} // 표시할 웹 페이지의 URL
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                  }}
                />
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
                <WebView
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/dinnermate-8d37b.appspot.com/o/files%2F%E1%84%86%E1%85%A5%E1%84%80%E1%85%B3%E1%86%AF%2B%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5%E1%84%87%E1%85%A1%E1%86%BC%E1%84%8E%E1%85%B5%E1%86%B7%2B%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%2B%E1%84%89%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%A6%E1%84%87%E1%85%A9%E1%86%AB%2B240401.docx?alt=media&token=c88e43c5-af85-4184-8504-9b54b7d81ae3',
                  }} // 표시할 웹 페이지의 URL
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                  }}
                />
              </PopupBase>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default User;
