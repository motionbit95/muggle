import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getDocList} from '../../firebase/firebase_func';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../style/styles';
import {defaultFemale, defaultMale} from '../../firebase/api';

const Home = ({navigation}) => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    updateList();
  }, []);

  const updateList = async () => {
    let list = await getDocList('user');
    console.log('유저리스트 ===> ', list);
    setUserList(list);
  };
  return (
    <View>
      <ScrollView style={{width: '100%'}}>
        <View style={[styles.screenStyle, styles.contentStyle]}>
          <View style={styles.rowBox}>
            <Text>머글 모임</Text>
            <Text>클래스 모임</Text>
            <Text>비즈니스 모임</Text>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(255, 206, 79, 1)',
              width: '100%',
              borderRadius: 10,
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              gap: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', gap: 10, margin: 10}}>
              <Text>♠︎</Text>
              <Text>새로운 업데이트 소식 전해드릴게요.</Text>
            </View>
            <View>
              <Button
                color={'rgba(119, 119, 119, 1)'}
                style={{width: 24, height: 24}}
                onPress={() => alert('닫아!')}
                title="x"
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#8c8c8c',
              width: '100%',
              height: 320,
              marginBottom: 20,
              justifyContent: 'space-between',
              borderRadius: 20,
            }}>
            <View></View>
            <View style={{gap: 10, alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 20, color: 'white'}}>Title</Text>
              <Text style={{fontSize: 16, color: 'white'}}>
                서브텍스트가 들어갑니다
              </Text>
              <View
                style={{
                  backgroundColor: 'gray',
                  padding: 5,
                  borderRadius: 15,
                  width: 60,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 12, color: 'white'}}>3/8</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              marginBottom: 20,
              gap: 20,
            }}>
            <View style={[styles.rowBox, styles.spaceBetween]}>
              <View style={{gap: 10}}>
                <Text style={{fontSize: 20}}>머글 모임</Text>
                <Text>우리 동네, 밥 머글 사람?</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.matchBox}
              // onPress={() => navigation.navigate('Home', {screen: '모임상세'})}
              onPress={() => alert('생성되있는 모임상세방으로 입장')}>
              <View style={[styles.spaceBetween, styles.rowBox]}>
                <View style={{gap: 10}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
                    퇴근 후 역삼역에서 저녁 드실분
                  </Text>
                  <View style={styles.rowBox}>
                    <Text
                      style={{fontSize: 14, fontWeight: '400', color: 'gray'}}>
                      2023.03.09(토) 17:00
                    </Text>
                    <View
                      style={{
                        backgroundColor: 'rgba(255, 99, 79, 1)',
                        borderRadius: 5,
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        D-3
                      </Text>
                    </View>
                  </View>

                  <View style={{gap: 5}}>
                    <View style={[styles.rowBox, {gap: 5}]}>
                      <View style={styles.icon18} />
                      <Text>서울 강남 역 삼동 골목오리집</Text>
                    </View>
                    <View style={[styles.rowBox, {gap: 5}]}>
                      <View style={styles.icon18} />
                      <Text>나누기 5/30</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'gray',
                    borderRadius: 10,
                  }}
                />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <View
                    style={[
                      styles.rowBox,
                      {
                        gap: -5,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 3,
                      },
                    ]}>
                    {[1, 2, 3, 4, 5].map(
                      (item, index) =>
                        index < 3 && (
                          <View style={styles.rowBox}>
                            <View
                              style={[
                                {
                                  width: 30,
                                  height: 30,
                                  borderRadius: 50,
                                  borderWidth: 2,
                                  borderColor: 'white',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                              ]}>
                              <Image
                                style={{
                                  width: 24,
                                  height: 24,
                                  backgroundColor: 'gray',
                                  borderRadius: 50,
                                }}
                              />
                            </View>
                          </View>
                        ),
                    )}
                    <View>
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 12,
                          color: 'gray',
                          textAlign: 'center',
                        }}>
                        {'+'}
                        {[1, 2, 3, 4, 5].length - 3}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'rgba(217, 217, 217, 1)',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                gap: 10,
                flexDirection: 'row',
              }}
              onPress={() => alert('button눌렀엉')}>
              <Text style={{fontSize: 16, color: 'rgba(119, 119, 119, 1)'}}>
                더보기
              </Text>
              <View style={{width: 20, height: 20, justifyContent: 'center'}}>
                <Image source={require('../../assets/rightarrow.png')} />
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
              <Text style={{fontSize: 20}}>커피 매칭 친구 추천</Text>
              <Text>새로운 이성과 커피 친구 해보세요.</Text>
            </View>
            {/* {userList.map((user, index) => (
            <View>
              <Image src={user.user_profile} />
              <Text>{user.user_type}</Text>
              <Text>{user.doc_id}</Text>
              <Text>{user.user_name}</Text>
              <Text>{user.user_price}만원</Text>
              <Text>{user.dong}</Text>
              <Text>{user.user_birth}</Text>
              <Text>{user.user_email}</Text>
              <Text>{user.user_password}</Text>
              <Text>{user.user_phone}</Text>
              <Text>{user.user_food?.[0]}</Text>
              <Text>{user.user_place?.[0]}</Text>
              <Text>{user.user_gender}</Text>
              <Text>{user.user_info}</Text>
              <Text>
                {user.user_location?.latitude} {user.user_location?.longitude}
              </Text>
            </View>
          ))} */}
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                gap: 10,
                padding: 10,
              }}
              showsHorizontalScrollIndicator={false}>
              {userList.map((user, index) => (
                <ImageBackground
                  key={index}
                  imageStyle={{borderRadius: 20}}
                  source={{
                    uri: user.user_profile
                      ? user.user_profile
                      : user.user_gender === 'male' || user.user_gender === '남'
                      ? defaultMale
                      : defaultFemale,
                  }}
                  style={{
                    width: 280,
                    height: 300,
                    borderRadius: 20,
                  }}>
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                    style={{borderRadius: 20}}>
                    <View
                      style={{
                        gap: 8,
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
                        style={{
                          backgroundColor: 'rgba(255, 206, 79, 1)',
                          borderRadius: 10,
                          height: 56,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPressOut={() =>
                          navigation.navigate('커피매칭신청', {
                            params: {data: user},
                          })
                        }>
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
          <View
            style={{
              width: '100%',
              marginBottom: 20,
              gap: 20,
            }}>
            <View style={{gap: 10}}>
              <Text style={{fontSize: 20}}>클래스 모임</Text>
              <Text>우리 동네, 밥 머글 사람?</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(255, 233, 230, 1)',
                borderRadius: 10,
                padding: 20,
              }}
              // onPress={() => navigation.navigate('모임상세')}
              onPress={() => alert('모임 상세')}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 10}}>
                  <Text>자기계발 독서모임</Text>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <Text>2023.03.09(토) 17:00</Text>
                    <View
                      style={{
                        backgroundColor: 'rgba(255, 99, 79, 1)',
                        borderRadius: 5,
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        D-3
                      </Text>
                    </View>
                  </View>
                  <Text>코엑스 별마당 도서관</Text>
                  <Text>18000 5/30</Text>
                  <Text>이미지들</Text>
                </View>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'red',
                    borderRadius: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'rgba(217, 217, 217, 1)',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                gap: 10,
                flexDirection: 'row',
              }}
              onPress={() => alert('button눌렀엉')}>
              <Text style={{fontSize: 16, color: 'rgba(119, 119, 119, 1)'}}>
                더보기
              </Text>
              <View style={{width: 20, height: 20, justifyContent: 'center'}}>
                <Image source={require('../../assets/rightarrow.png')} />
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
              <Text style={{fontSize: 20}}>비즈니스 모임</Text>
              <Text>우리 동네, 밥 머글 사람?</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(255, 233, 230, 1)',
                borderRadius: 10,
                padding: 20,
              }}
              // onPress={() => navigation.navigate('모임상세')}
              onPress={() => alert('모임 상세')}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 10}}>
                  <Text>카페 바이럴 마케터 모임</Text>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <Text>2023.03.09(토) 17:00</Text>
                    <View
                      style={{
                        backgroundColor: 'rgba(255, 99, 79, 1)',
                        borderRadius: 5,
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        D-3
                      </Text>
                    </View>
                  </View>
                  <Text>서울 강남 역삼동</Text>
                  <Text>30000 5/30</Text>
                  <Text>이미지들</Text>
                </View>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'red',
                    borderRadius: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'rgba(217, 217, 217, 1)',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                gap: 10,
                flexDirection: 'row',
              }}
              onPress={() => alert('button눌렀엉')}>
              <Text style={{fontSize: 16, color: 'rgba(119, 119, 119, 1)'}}>
                더보기
              </Text>
              <View style={{width: 20, height: 20, justifyContent: 'center'}}>
                <Image source={require('../../assets/rightarrow.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          position: 'fixed',
          bottom: 70,
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            gap: 10,
            backgroundColor: 'rgba(255, 99, 79, 1)',
            borderRadius: 50,
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Home', {screen: '모임개설'})}>
          <Image source={require('../../assets/Plus.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
