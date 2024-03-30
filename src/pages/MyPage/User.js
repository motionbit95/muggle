import React, {useEffect, useState} from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import styles, {
  f_full,
  radius_full,
  shadow_base,
  sp_3,
} from '../../style/styles';
import auth from '@react-native-firebase/auth';
import {singleQuery, updateDocument} from '../../firebase/firebase_func';
import {getDisplayAge, primary_color} from '../../firebase/api';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation'; // 라이브러리 import

const User = ({navigation}) => {
  const [myInfo, setMyInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        await singleQuery('user', 'uid', user.uid).then(res => {
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
                  <Text
                    style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
                    {myInfo?.user_name}님
                  </Text>
                  <Image source={require('../../assets/star.png')} />
                  <Text
                    style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                    {(0).toFixed(1)}
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <Text style={{fontSize: 16, color: 'white'}}>
                    {getDisplayAge(myInfo?.user_birth)}세
                  </Text>
                  <Text style={{fontSize: 12, color: 'white'}}>|</Text>
                  <Text style={{fontSize: 16, color: 'white'}}>
                    {myInfo?.user_gender === '남' ||
                    myInfo?.user_gender === 'male'
                      ? '남성'
                      : '여성'}
                  </Text>
                  <Text style={{fontSize: 12, color: 'white'}}>|</Text>
                  <Text
                    style={{fontSize: 16, color: 'white', textAlign: 'center'}}>
                    {myInfo?.user_place[0]}
                  </Text>
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
                      <Text style={{fontSize: 12, color: 'white'}}>{item}</Text>
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
          <View style={[shadow_base, sp_3]}>
            <View style={[styles.rowBox, styles.itembox]}>
              <View style={styles.one_thirdBoxStyle}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                  {myInfo?.goods ? myInfo?.goods.length : 0}
                </Text>
                <Text style={{color: 'black'}}>찜모임</Text>
              </View>
              <View style={styles.one_thirdBoxStyle}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                  {myInfo?.views ? myInfo?.views.length : 0}
                </Text>
                <Text style={{color: 'black'}}>최근 본 모임</Text>
              </View>
              <View style={styles.one_thirdBoxStyle}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                  0
                </Text>
                <Text style={{color: 'black'}}>초대받은 모임</Text>
              </View>
            </View>
            <View
              style={{backgroundColor: 'white', borderRadius: 10, padding: 10}}>
              <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={() =>
                  navigation.navigate('커피매칭신청', {screen: '매칭내역'})
                }>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/menuicon1.png')} />
                  <Text style={{color: 'black'}}>매칭내역</Text>
                </View>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={onLogout}>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/menuicon1.png')} />
                  <Text style={{color: 'black'}}>로그아웃</Text>
                </View>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={onDeleteUser}>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/menuicon1.png')} />
                  <Text style={{color: 'black'}}>탈퇴하기</Text>
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
