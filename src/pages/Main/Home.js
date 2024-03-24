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
import {
  calculateDday,
  defaultFemale,
  defaultMale,
  displayDday,
  formatDate,
  formatDateTime,
} from '../../firebase/api';
import Swiper from 'react-native-swiper';

const Home = ({navigation}) => {
  const [userList, setUserList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const [muggleGroupList, setMuggleGroupList] = useState([]);
  const [muggleClassList, setMuggleClassList] = useState([]);
  const [muggleBusinessList, setMuggleBusinessList] = useState([]);
  const [swiperIndex, setSwiperIndex] = useState(0);

  const bannerList = {
    image: [
      require('../../assets/slide.png'),
      require('../../assets/slide.png'),
      require('../../assets/slide.png'),
      require('../../assets/slide.png'),
      require('../../assets/slide.png'),
      require('../../assets/slide.png'),
      require('../../assets/slide.png'),
      require('../../assets/slide.png'),
    ],
  };

  useEffect(() => {
    updateUser();
    updateGroup();
  }, []);

  const updateUser = async () => {
    let list = await getDocList('user');
    console.log('유저리스트 ===> ', list);
    setUserList(list);
  };

  const updateGroup = async () => {
    let list = await getDocList('group');
    console.log('그룹리스트 ===> ', list);

    let muggleGroupList = list.filter(
      group => group.group_type === '머글 모임',
    );
    let muggleClassList = list.filter(
      group => group.group_type === '클래스 모임',
    );
    let muggleBusinessList = list.filter(
      group => group.group_type === '비즈니스 모임',
    );

    setMuggleGroupList(muggleGroupList);
    setMuggleClassList(muggleClassList);
    setMuggleBusinessList(muggleBusinessList);
    // setGroupList(list);
  };

  return (
    <View>
      <ScrollView style={{width: '100%'}}>
        <View style={[styles.screenStyle, styles.contentStyle]}>
          <View style={{width: '100%', gap: 20, marginBottom: 20}}>
            <View style={styles.rowBox}>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor: 'black',
                  padding: 10,
                }}>
                <Text
                  style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>
                  머글 모임
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                }}>
                <Text style={{fontSize: 18, color: 'gray', fontWeight: 'bold'}}>
                  클래스 모임
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                }}>
                <Text style={{fontSize: 18, color: 'gray', fontWeight: 'bold'}}>
                  비즈니스 모임
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#D96F6F',
              width: '100%',
              borderRadius: 10,
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              gap: 10,
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                margin: 10,
              }}>
              <Image source={require('../../assets/megaphone.png')} />
              <Text>새로운 업데이트 소식 전해드릴게요.</Text>
            </View>
            <Image source={require('../../assets/_x.png')} />
          </View>
          <Swiper
            autoplay={true}
            loop={true}
            showsPagination={false}
            autoplayTimeout={5}
            containerStyle={{
              width: '100%',
              height: 320,
              marginBottom: 20,
            }}>
            {bannerList.image.map((image, index) => (
              <ImageBackground
                key={index}
                imageStyle={{borderRadius: 20}}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
                source={bannerList.image[index]}>
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
                    <Text style={{fontSize: 12, color: 'white'}}>
                      {index + 1}/8
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            ))}
          </Swiper>

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
            {muggleGroupList.map(
              (item, index) =>
                index < 3 && (
                  <TouchableOpacity
                    key={index}
                    style={styles.matchBox}
                    onPress={() =>
                      navigation.navigate('Home', {
                        screen: '모임상세',
                        params: {data: item},
                      })
                    }>
                    <View style={[styles.spaceBetween, styles.rowBox]}>
                      <View style={{gap: 10}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          {item.group_name}
                        </Text>
                        <View style={styles.rowBox}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              color: 'gray',
                            }}>
                            {formatDateTime(item.group_date)}
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
                              {displayDday(
                                calculateDday(formatDate(item.group_time)),
                              )}
                            </Text>
                          </View>
                        </View>

                        <View style={{gap: 5}}>
                          <View style={[styles.rowBox, {gap: 5}]}>
                            <Image
                              style={{width: 12, height: 12}}
                              source={require('../../assets/map.png')}
                            />
                            <Text>{item.group_place}</Text>
                          </View>
                          <View style={[styles.rowBox, {gap: 5}]}>
                            <Image
                              style={{width: 12, height: 12}}
                              source={require('../../assets/money.png')}
                            />
                            <Text>나누기</Text>
                            <Image
                              style={{width: 12, height: 12}}
                              source={require('../../assets/mypage.png')}
                            />
                            <Text>
                              {item.group_users.length} / {item.group_personnel}
                            </Text>
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
                          {item.group_users.map(
                            (user, index) =>
                              index < 3 && (
                                <View key={index} style={styles.rowBox}>
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
                          {item.group_users?.length > 3 && (
                            <View>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  fontSize: 12,
                                  color: 'gray',
                                  textAlign: 'center',
                                }}>
                                {'+'}
                                {item.group_user.length - 3}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ),
            )}

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
              onPress={() => alert('미구현')}>
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
                          backgroundColor: '#D96F6F',
                          borderRadius: 10,
                          height: 56,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPressOut={() =>
                          navigation.navigate('커피매칭신청', {
                            screen: '커피매칭',
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
            {muggleClassList.map(
              (item, index) =>
                index < 3 && (
                  <TouchableOpacity
                    key={index}
                    style={styles.matchBox}
                    onPress={() =>
                      navigation.navigate('Home', {
                        screen: '모임상세',
                        params: {data: item},
                      })
                    }>
                    <View style={[styles.spaceBetween, styles.rowBox]}>
                      <View style={{gap: 10}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          {item.group_name}
                        </Text>
                        <View style={styles.rowBox}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              color: 'gray',
                            }}>
                            {formatDateTime(item.group_date)}
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
                              {displayDday(
                                calculateDday(formatDate(item.group_time)),
                              )}
                            </Text>
                          </View>
                        </View>

                        <View style={{gap: 5}}>
                          <View style={[styles.rowBox, {gap: 5}]}>
                            <Image
                              style={{width: 12, height: 12}}
                              source={require('../../assets/map.png')}
                            />
                            <Text>{item.group_place}</Text>
                          </View>
                          <View style={[styles.rowBox, {gap: 5}]}>
                            <Image
                              style={{width: 12, height: 12}}
                              source={require('../../assets/money.png')}
                            />
                            <Text>나누기</Text>
                            <Image
                              style={{width: 12, height: 12}}
                              source={require('../../assets/mypage.png')}
                            />
                            <Text>
                              {item.group_users.length} / {item.group_personnel}
                            </Text>
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
                          {item.group_users.map(
                            (user, index) =>
                              index < 3 && (
                                <View key={index} style={styles.rowBox}>
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
                          {item.group_users?.length > 3 && (
                            <View>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  fontSize: 12,
                                  color: 'gray',
                                  textAlign: 'center',
                                }}>
                                {'+'}
                                {item.group_user.length - 3}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ),
            )}

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
            {muggleBusinessList.map(
              (item, index) =>
                index < 3 && (
                  <TouchableOpacity
                    key={index}
                    style={styles.matchBox}
                    onPress={() =>
                      navigation.navigate('Home', {
                        screen: '모임상세',
                        params: {data: item},
                      })
                    }>
                    <View style={[styles.spaceBetween, styles.rowBox]}>
                      <View style={{gap: 10}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          {item.group_name}
                        </Text>
                        <View style={styles.rowBox}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              color: 'gray',
                            }}>
                            {formatDateTime(item.group_date)}
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
                              {displayDday(
                                calculateDday(formatDate(item.group_time)),
                              )}
                            </Text>
                          </View>
                        </View>

                        <View style={{gap: 5}}>
                          <View style={[styles.rowBox, {gap: 5}]}>
                            <Image
                              style={{width: 12, height: 12}}
                              source={require('../../assets/map.png')}
                            />
                            <Text>{item.group_place}</Text>
                          </View>
                          <View style={[styles.rowBox, {gap: 5}]}>
                            <Image
                              style={{width: 12, height: 12}}
                              source={require('../../assets/money.png')}
                            />
                            <Text>나누기</Text>
                            <Image
                              style={{width: 12, height: 12}}
                              source={require('../../assets/mypage.png')}
                            />
                            <Text>
                              {item.group_users.length} / {item.group_personnel}
                            </Text>
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
                          {item.group_users.map(
                            (user, index) =>
                              index < 3 && (
                                <View key={index} style={styles.rowBox}>
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
                          {item.group_users?.length > 3 && (
                            <View>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  fontSize: 12,
                                  color: 'gray',
                                  textAlign: 'center',
                                }}>
                                {'+'}
                                {item.group_user.length - 3}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ),
            )}
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
          flex: 1,
          position: 'sticky',
          bottom: 60,
          left: 330,
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
