import React, {useEffect, useRef, useState} from 'react';
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
import styles from '../../style/styles';
import {font_md, font_sm} from '../../firebase/api';
import Swiper from 'react-native-swiper';
import GroupBox from '../../Component/GroupBox';
import MatchBox from '../../Component/MatchBox';

const Home = ({navigation}) => {
  const [userList, setUserList] = useState(null);

  const [muggleGroupList, setMuggleGroupList] = useState(null);
  const [muggleClassList, setMuggleClassList] = useState(null);
  const [muggleBusinessList, setMuggleBusinessList] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('머글 모임');

  // 각 컴포넌트에 대한 ref 선언
  const scrollViewRef = useRef(null);

  const firstComponentRef = useRef(null);
  const secondComponentRef = useRef(null);
  const thirdComponentRef = useRef(null);
  const scrollToComponent = ref => {
    ref.current.measureLayout(
      scrollViewRef.current,
      (x, y) => {
        scrollViewRef.current.scrollTo({y, animated: true});
      },
      () => console.error('측정 실패'),
    );
  };

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
    if (!userList) updateUser();

    if (!muggleGroupList || !muggleClassList || !muggleBusinessList)
      updateGroup();
  }, []);

  const updateUser = async () => {
    let list = await getDocList('user');
    // console.log('유저리스트 ===> ', list);
    setUserList(list);
  };

  const updateGroup = async () => {
    let list = await getDocList('group');
    // console.log('그룹리스트 ===> ', list);

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
  };

  return (
    <View>
      <ScrollView
        style={{width: '100%'}}
        ref={scrollViewRef}
        stickyHeaderIndices={[0]}>
        <View
          style={[
            styles.screenStyle,
            {
              width: '100%',
              alignItems: 'flex-start',
              paddingHorizontal: 20,
              paddingTop: 10,
            },
          ]}>
          <View style={[styles.rowBox, {width: '100%'}]}>
            <TouchableOpacity
              onPress={() => {
                setSelectedGroup('머글 모임');
                scrollToComponent(firstComponentRef);
              }}>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor:
                    selectedGroup === '머글 모임' ? 'black' : 'white',
                  padding: 5,
                }}>
                <Text
                  style={{
                    fontSize: font_md,
                    color: selectedGroup === '머글 모임' ? 'black' : 'gray',
                    fontWeight: 'bold',
                  }}>
                  머글 모임
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedGroup('클래스 모임');
                scrollToComponent(secondComponentRef);
              }}>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor:
                    selectedGroup === '클래스 모임' ? 'black' : 'white',
                  padding: 5,
                }}>
                <Text
                  style={{
                    fontSize: font_md,
                    color: selectedGroup === '클래스 모임' ? 'black' : 'gray',
                    fontWeight: 'bold',
                  }}>
                  클래스 모임
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedGroup('비즈니스 모임');
                scrollToComponent(thirdComponentRef);
              }}>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor:
                    selectedGroup === '비즈니스 모임' ? 'black' : 'white',
                  padding: 5,
                }}>
                <Text
                  style={{
                    fontSize: font_md,
                    color: selectedGroup === '비즈니스 모임' ? 'black' : 'gray',
                    fontWeight: 'bold',
                  }}>
                  비즈니스 모임
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.screenStyle, styles.contentStyle]}>
          <View
            style={{
              backgroundColor: '#D96F6F',
              width: '100%',
              borderRadius: 10,
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
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
            autoplay={false}
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
            ref={firstComponentRef}
            style={{
              width: '100%',
              marginBottom: 16,
              gap: 20,
            }}>
            <View style={[styles.rowBox, styles.spaceBetween]}>
              <View style={{gap: 5}}>
                <Text
                  style={{
                    fontSize: font_md,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  머글 모임
                </Text>
                <Text style={{fontSize: font_sm, color: 'gray'}}>
                  우리 동네, 밥 머글 사람?
                </Text>
              </View>
            </View>
            {muggleGroupList?.map(
              (item, index) =>
                index < 3 && (
                  <GroupBox
                    key={index}
                    userList={userList}
                    index={index}
                    item={item}
                    navigation={navigation}
                  />
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
            <View style={[styles.rowBox, styles.spaceBetween]}>
              <View style={{gap: 5}}>
                <Text
                  style={{
                    fontSize: font_md,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  커피 매칭 친구 추천
                </Text>
                <Text style={{fontSize: font_sm, color: 'gray'}}>
                  새로운 이성과 커피 친구 해보세요.
                </Text>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                gap: 10,
              }}
              showsHorizontalScrollIndicator={false}>
              {userList?.map((user, index) => (
                <MatchBox
                  key={index}
                  user={user}
                  index={index}
                  navigation={navigation}
                />
              ))}
            </ScrollView>
          </View>

          <View
            ref={secondComponentRef}
            style={{
              width: '100%',
              marginBottom: 20,
              gap: 20,
            }}>
            <View style={[styles.rowBox, styles.spaceBetween]}>
              <View style={{gap: 5}}>
                <Text
                  style={{
                    fontSize: font_md,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  클래스 모임
                </Text>
                <Text style={{fontSize: font_sm, color: 'gray'}}>
                  우리 동네, 밥 머글 사람?
                </Text>
              </View>
            </View>
            {muggleClassList?.map(
              (item, index) =>
                index < 3 && (
                  <GroupBox
                    key={index}
                    userList={userList}
                    index={index}
                    item={item}
                    navigation={navigation}
                  />
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
            ref={thirdComponentRef}
            style={{
              width: '100%',
              marginBottom: 20,
              gap: 20,
            }}>
            <View style={[styles.rowBox, styles.spaceBetween]}>
              <View style={{gap: 5}}>
                <Text
                  style={{
                    fontSize: font_md,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  비지니스 모임
                </Text>
                <Text style={{fontSize: font_sm, color: 'gray'}}>
                  우리 동네, 밥 머글 사람?
                </Text>
              </View>
            </View>
            {muggleBusinessList?.map(
              (item, index) =>
                index < 3 && (
                  <GroupBox
                    key={index}
                    userList={userList}
                    index={index}
                    item={item}
                    navigation={navigation}
                  />
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
