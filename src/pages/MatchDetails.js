import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MatchDetails = ({navigation}) => {
  return (
    <View style={styles.screenStyle}>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', gap: 10, paddingBottom: 20}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 245, 244, 1)',
              borderRadius: 10,
              padding: 20,
              gap: 10,
            }}
            onPress={() => alert('매칭 태그')}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{gap: 10}}>
                <View
                  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: 'red',
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: 'white',
                        borderRadius: 50,
                      }}
                    />
                  </View>
                  <Text style={{fontSize: 14}}>매칭중</Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: '#d9d9d9',
                      borderRadius: 50,
                    }}
                  />
                  <View style={{gap: 10}}>
                    <View style={{flexDirection: 'row', gap: 10}}>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                        홍길동
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 10,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: 'red',
                          }}
                        />
                        <Text>평점</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: 13}}>20세</Text>
                      <View
                        style={{
                          borderRadius: 10,
                          paddingVertical: 3,
                          paddingHorizontal: 8,
                          backgroundColor: 'rgba(255, 99, 79, 0.1)',
                        }}>
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
              <View
                style={{
                  borderRadius: 20,
                  borderColor: 'red',
                  borderWidth: 1,
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                }}>
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
            width: '100%',
            marginBottom: 20,
            gap: 20,
          }}>
          <View style={{gap: 10}}>
            <Text style={{fontSize: 14}}>커피 매칭 친구 추천</Text>
          </View>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              gap: 10,
              paddingVertical: 10,
            }}
            showsHorizontalScrollIndicator={false}>
            {/* {userList.map((user, index) => ( */}
            <ImageBackground
              // key={index}
              imageStyle={{borderRadius: 20}}
              // source={{uri: user.user_profile}}
              style={{
                width: 280,
                height: 300,
                borderRadius: 20,
              }}>
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                style={{borderRadius: 20}}>
                <View
                  style={{
                    gap: 5,
                    justifyContent: 'flex-end',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: 20,
                    padding: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: 'white',
                      borderRadius: 10,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                    }}>
                    <Text>✭</Text>
                    <Text style={{color: 'white', fontSize: 14}}>근처</Text>
                  </View>

                  <Text style={{color: 'white', fontSize: 22}}>
                    {/* {user.user_name} */}누구세요
                  </Text>
                  <Text style={{color: 'white', fontSize: 18}}>
                    {/* {user.user_place?.[0]} */}어딘가유
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'rgba(255, 206, 79, 1)',
                      borderRadius: 10,
                      height: 56,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
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
            {/* ))} */}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default MatchDetails;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  boxTitleFont: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  boxDateFont: {
    fontSize: 14,
    color: 'rgba(153, 153, 153, 1)',
  },
});
