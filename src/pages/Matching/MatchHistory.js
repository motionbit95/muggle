import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../style/styles';
import {getDocList} from '../../firebase/firebase_func';

const MatchHistory = ({navigation}) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    updateUser();
  }, []);

  const updateUser = async () => {
    let list = await getDocList('user');
    console.log('유저리스트 ===> ', list);
    setUserList(list);
  };

  return (
    <View style={[styles.screenStyle, styles.contentStyle]}>
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.matchBoxs}>
          <TouchableOpacity
            style={styles.matchBox}
            onPress={() => alert('매칭 태그')}>
            <View style={[styles.spaceBetween, styles.rowBox]}>
              <View style={styles.gap10}>
                <View style={styles.rowBox}>
                  <View style={[styles.iconBox, styles.icon20]}>
                    <Text style={{fontSize: 14, color: 'white'}}>♥︎</Text>
                  </View>
                  <Text style={{fontSize: 14}}>매칭중</Text>
                </View>
                <View style={styles.rowBox}>
                  <View style={styles.Avartar50} />
                  <View style={{gap: 10}}>
                    <View style={styles.rowBox}>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                        홍길동
                      </Text>
                      <View style={[styles.rowBox, {gap: 5}]}>
                        <Image source={require('../../assets/star.png')} />
                        <Text>평점</Text>
                      </View>
                    </View>
                    <View style={styles.rowBox}>
                      <Text style={{fontSize: 13}}>20세</Text>
                      <View style={styles.tagBox}>
                        <Text
                          style={{fontSize: 12, color: 'rgba(255, 99, 79, 1)'}}>
                          남자
                        </Text>
                      </View>
                    </View>
                    <Text>서울특별시 서초구</Text>
                  </View>
                </View>
              </View>
              <View style={styles.outlineTagBox}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'rgba(255, 99, 79, 1)',
                  }}>
                  정산대기중
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 20,
            gap: 20,
          }}>
          <View style={{gap: 10}}>
            <Text style={{fontSize: 14}}>커피 매칭 친구 추천</Text>
          </View>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.horizontalScrollViewStyle}
            showsHorizontalScrollIndicator={false}>
            {userList.map((user, index) => (
              <ImageBackground
                key={index}
                imageStyle={{borderRadius: 20}}
                source={{uri: user.user_profile}}
                style={styles.cardImage}>
                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                  style={{borderRadius: 20}}>
                  <View style={styles.MatchComponentBox}>
                    <View
                      style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 20,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        gap: 5,
                      }}>
                      <Image source={require('../../assets/Subtract.png')} />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          fontWeight: '400',
                        }}>
                        근처
                      </Text>
                    </View>

                    <Text style={{color: 'white', fontSize: 22}}>
                      {user.user_name}
                    </Text>
                    <Text style={{color: 'white', fontSize: 18}}>
                      {user.user_place?.[0]}
                    </Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPressOut={() => alert('어쩔티비')}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        커피 매칭 신청
                      </Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </ImageBackground>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default MatchHistory;
