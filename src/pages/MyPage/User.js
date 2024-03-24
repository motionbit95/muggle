import React, {useEffect, useState} from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../style/styles';
import auth from '@react-native-firebase/auth';
import {singleQuery} from '../../firebase/firebase_func';
import {getDisplayAge} from '../../firebase/api';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
const User = ({navigation}) => {
  const [myInfo, setMyInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        singleQuery('user', 'uid', user.uid).then(res => {
          setMyInfo(res[0]);
        });
      } else {
        console.log('없음!!');
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
          colors={['#D96F6F', '#FF794F']}
        />
      </View>
      <SafeAreaView>
        <View style={styles.contentStyle}>
          <View style={styles.UserStackStyle}>
            <View style={styles.rowBox}>
              <View>
                <View style={styles.Avartar70}>
                  <Image
                    style={{width: '90%', height: '90%'}}
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
                    {getDisplayAge(myInfo?.user_birth)}
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
                <View style={{flexDirection: 'row', gap: 10}}>
                  <View
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 8,
                      borderRadius: 30,
                      borderWidth: 1,
                      borderColor: 'white',
                    }}>
                    <Text style={{fontSize: 12, color: 'white'}}>관심사1</Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 8,
                      borderRadius: 30,
                      borderWidth: 1,
                      borderColor: 'white',
                    }}>
                    <Text style={{fontSize: 12, color: 'white'}}>관심사2</Text>
                  </View>
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
          <View style={styles.shadowBoxStyle}>
            <View style={[styles.rowBox, styles.itembox]}>
              <View style={styles.one_thirdBoxStyle}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>8</Text>
                <Text>찜모임</Text>
              </View>
              <View style={styles.one_thirdBoxStyle}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>5</Text>
                <Text>최근 본 모임</Text>
              </View>
              <View style={styles.one_thirdBoxStyle}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>3</Text>
                <Text>초대받은 모임</Text>
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
                  <Text>매칭내역</Text>
                </View>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={() => alert('눌렀엉')}>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/menuicon1.png')} />
                  <Text>메뉴02</Text>
                </View>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={onLogout}>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/menuicon1.png')} />
                  <Text>로그아웃</Text>
                </View>
                <Image source={require('../../assets/rightarrow.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.TouchButtonStyle}
                onPress={onDeleteUser}>
                <View style={styles.rowBox}>
                  <Image source={require('../../assets/menuicon1.png')} />
                  <Text>탈퇴하기</Text>
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
