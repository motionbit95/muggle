import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {getDocList} from '../../firebase/firebase_func';
import {
  align_center,
  align_start,
  banner,
  bg_body,
  blackAlpha500,
  btn_secondary,
  flex_column,
  flex_row,
  img_full,
  img_sm_2,
  img_xs,
  img_xxs,
  justify_between,
  justify_center,
  m_4,
  p_0,
  p_3,
  p_4,
  radius_full,
  radius_lg,
  sp_2,
  sp_3,
  sp_4,
  under_button,
  w_full,
} from '../../style/styles';
import Swiper from 'react-native-swiper';
import GroupBox from '../../Component/GroupBox';
import MatchBox from '../../Component/MatchBox';

// icon
import alertIcon from '../../assets/icons/alert.png';
import _x from '../../assets/icons/_x.png';
import Typography from '../../Component/Typography';

import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';

export const group_category = [
  '머글 모임',
  '커피 친구 추천',
  '원데이 클래스',
  '비지니스 모임',
];
const Home = ({navigation}) => {
  const [userList, setUserList] = useState(null);
  const [myInfo, setMyInfo] = useState(null);

  const [muggleGroupList, setMuggleGroupList] = useState(null);
  const [muggleClassList, setMuggleClassList] = useState(null);
  const [muggleBusinessList, setMuggleBusinessList] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(group_category[0]);

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

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );

  const handleScreenSizeChange = ({window}) => {
    setScreenWidth(window.width);
    setScreenHeight(window.height);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handleScreenSizeChange);
    return () => {
      // Dimensions.removeEventListener('change', handleScreenSizeChange);
    };
  }, []);

  const updateUser = async () => {
    let list = await getDocList('user');
    // console.log('유저리스트 ===> ', list);
    setUserList(list);

    setMyInfo(list.find(user => user.uid === auth().currentUser?.uid));
  };

  const [goods, setGoods] = useState(null);

  useEffect(() => {
    const getGroups = async () => {
      await getDocList('group').then(res => {
        let goodList = [];
        res.forEach(group => {
          myInfo?.goods?.forEach(async gid => {
            if (gid === group.doc_id) {
              goodList.push(group);
              // console.log(new Date(), '찜했습니다.', goodList);
              setGoods(goodList);
            }
          });
        });
      });
    };

    getGroups();
  }, [myInfo]);

  const updateGroup = async () => {
    let list = await getDocList('group');
    // console.log('그룹리스트 ===> ', list);

    let muggleGroupList = list.filter(
      group => group.group_type === group_category[0],
    );
    let muggleClassList = list.filter(
      group => group.group_type === group_category[2],
    );
    let muggleBusinessList = list.filter(
      group => group.group_type === group_category[3],
    );

    setMuggleGroupList(muggleGroupList);
    setMuggleClassList(muggleClassList);
    setMuggleBusinessList(muggleBusinessList);
  };

  useEffect(() => {
    firestore()
      .collection('group')
      .onSnapshot(() => {
        updateGroup();
        console.log('그룹이 업데이트 되었습니다!!!');
      });

    firestore()
      .collection('user')
      .onSnapshot(() => {
        updateUser();
        console.log('유저가 업데이트 되었습니다!!!');
      });
  }, []);

  const ItemList = ({items, index}) => {
    const [visibleItems, setVisibleItems] = useState(3);

    const handleLoadMore = () => {
      setVisibleItems(prevVisibleItems => prevVisibleItems + 3);
    };

    return (
      <View>
        <View>
          {items?.slice(0, visibleItems)?.map((item, index) => (
            <GroupBox
              myInfo={myInfo}
              key={index}
              userList={userList}
              index={index}
              item={item}
              navigation={navigation}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[btn_secondary, {marginVertical: 10}]}
          onPress={() =>
            navigation.navigate('모임', {
              screen: '모임리스트',
              params: {
                data: items,
                userList: userList,
                title: group_category[index],
              },
            })
          }>
          <View style={[flex_row, justify_center, align_center, sp_2]}>
            <Typography>{`더보기`}</Typography>
            <Image
              style={img_xxs}
              source={require('../../assets/icons/right_arrow.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <SafeAreaView>
        <View
          style={[
            w_full,
            flex_row,
            justify_between,
            {marginTop: 10, paddingHorizontal: 20},
          ]}>
          <Image
            source={require('../../assets/muggle.png')}
            style={{height: 25, width: 100}}
          />
          <View style={flex_row}>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() =>
                navigation.navigate('모임', {
                  screen: '모임리스트',
                  params: {
                    data: goods,
                    // userList: userList,
                    title: '찜모임',
                  },
                })
              }>
              <Image
                style={{width: 24, height: 24}}
                source={require('../../assets/icons/heart_black.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => alert('알림 페이지 전달')}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../../assets/Notification.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={[w_full]}
          ref={scrollViewRef}
          stickyHeaderIndices={[0]}>
          {/* TAB */}
          <View
            style={[
              align_start,
              w_full,
              p_3,
              {paddingBottom: 0, backgroundColor: 'white'},
            ]}>
            <View style={[flex_row, sp_2]}>
              <TouchableOpacity
                onPress={() => {
                  // setSelectedGroup('일상 모임');
                  navigation.navigate('일상 모임', {myInfo: myInfo});
                }}>
                <View style={[under_button(selectedGroup === '일상 모임')]}>
                  <Typography
                    bold
                    black={selectedGroup === '일상 모임'}
                    light={selectedGroup !== '일상 모임'}>
                    {'일상모임'}
                  </Typography>
                </View>
              </TouchableOpacity>
              {group_category.map(
                (category, index) =>
                  index !== 1 && (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        console.log('category ===> ', category, index);
                        setSelectedGroup(category);
                        scrollToComponent(
                          index === 0
                            ? firstComponentRef
                            : index === 2
                            ? secondComponentRef
                            : thirdComponentRef,
                        );
                      }}>
                      <View style={[under_button(selectedGroup === category)]}>
                        <Typography
                          bold
                          black={selectedGroup === category}
                          light={selectedGroup !== category}>
                          {category}
                        </Typography>
                      </View>
                    </TouchableOpacity>
                  ),
              )}
            </View>
          </View>
          {/* ALERT */}
          <View style={[w_full, p_4, sp_4, bg_body]}>
            <View
              style={[
                banner(true),
                radius_lg,
                flex_row,
                w_full,
                sp_4,
                p_0,
                justify_between,
                align_center,
                {paddingHorizontal: 10},
              ]}>
              <View style={[flex_row, sp_4, p_3, align_center]}>
                <Image style={img_sm_2} source={alertIcon} />
                <Typography>새로운 업데이트 소식 전해드릴게요.</Typography>
              </View>
              <Image style={img_xs} source={_x} />
            </View>
            {/* SLIDER */}
            <Swiper
              autoplay={false}
              loop={true}
              showsPagination={false}
              autoplayTimeout={5}
              containerStyle={{
                width: screenWidth - 16 * 2,
                height: screenWidth - 16 * 2,
              }}>
              {bannerList.image.map((image, index) => (
                <ImageBackground
                  key={index}
                  imageStyle={radius_lg}
                  style={img_full}
                  source={bannerList.image[index]}>
                  <View style={[sp_3, align_center, m_4]}>
                    <Typography white bold size={'xl'}>
                      Title
                    </Typography>
                    <Typography white>서브텍스트가 들어갑니다</Typography>
                    <View
                      style={[
                        {
                          backgroundColor: blackAlpha500,
                          paddingHorizontal: 16,
                          paddingVertical: 4,
                        },
                        radius_full,
                        align_center,
                      ]}>
                      <Typography white size={'sm'}>
                        {index + 1} / {bannerList.image?.length}
                      </Typography>
                    </View>
                  </View>
                </ImageBackground>
              ))}
            </Swiper>

            {group_category.map((category, index) => (
              <View
                key={index}
                style={[w_full, sp_3]}
                ref={
                  index === 0
                    ? firstComponentRef
                    : index === 2
                    ? secondComponentRef
                    : thirdComponentRef
                }>
                <View style={[flex_column, sp_2]}>
                  <Typography size={'lg'} bold>
                    {category}
                  </Typography>
                  <Typography size={'md'} light>
                    {index === 0 || index === 2
                      ? '우리 동네, 밥 머글 사람?'
                      : index === 1
                      ? '새로운 이성과 커피 친구 해보세요.'
                      : '각 분야 정보를 공유해보세요.'}
                  </Typography>
                </View>

                {index === 1 ? (
                  <View
                    style={{
                      width: '100%',
                      marginBottom: 20,
                      gap: 20,
                    }}>
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
                          userList={userList}
                        />
                      ))}
                    </ScrollView>
                  </View>
                ) : (
                  <ItemList
                    index={index}
                    items={
                      index === 0
                        ? muggleGroupList
                        : index === 2
                        ? muggleClassList
                        : muggleBusinessList
                    }
                  />
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
