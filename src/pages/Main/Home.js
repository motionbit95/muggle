import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getDocList} from '../../firebase/firebase_func';
import styles, {
  align_center,
  align_start,
  banner,
  bg_body,
  blackAlpha500,
  center,
  description,
  flex_column,
  flex_row,
  fs_2xl,
  fs_3xl,
  fs_lg,
  fs_md,
  fs_sm,
  fs_xl,
  fw_bold,
  img_full,
  img_sm,
  img_sm_2,
  img_xs,
  justify_between,
  m_4,
  p_0,
  p_1,
  p_2,
  p_3,
  p_4,
  radius_full,
  radius_lg,
  radius_md,
  radius_sm,
  sp_2,
  sp_3,
  sp_4,
  sp_5,
  sp_6,
  text_selected,
  title,
  under_button,
  w_full,
  whiteAlpha50,
  whiteAlpha500,
  whiteAlpha700,
  whiteAlpha800,
  whiteAlpha900,
} from '../../style/styles';
import {font_md, font_sm, getIcon} from '../../firebase/api';
import Swiper from 'react-native-swiper';
import GroupBox from '../../Component/GroupBox';
import MatchBox from '../../Component/MatchBox';

// icon
import alertIcon from '../../assets/icons/alert.png';
import _x from '../../assets/icons/_x.png';

export const {width: screenWidth} = Dimensions.get('window');

export const group_category = [
  '머글 모임',
  '커피 친구 추천',
  '원데이 클래스',
  '비지니스 모임',
];
const Home = ({navigation}) => {
  const [userList, setUserList] = useState(null);

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

  const updateUser = async () => {
    let list = await getDocList('user');
    // console.log('유저리스트 ===> ', list);
    setUserList(list);
  };

  const updateGroup = async () => {
    let list = await getDocList('group');
    // console.log('그룹리스트 ===> ', list);

    let muggleGroupList = list.filter(
      group => group.group_type === group_category[0],
    );
    let muggleClassList = list.filter(
      group => group.group_type === group_category[1],
    );
    let muggleBusinessList = list.filter(
      group => group.group_type === group_category[2],
    );

    setMuggleGroupList(muggleGroupList);
    setMuggleClassList(muggleClassList);
    setMuggleBusinessList(muggleBusinessList);
  };

  return (
    <View>
      <ScrollView
        style={[w_full]}
        ref={scrollViewRef}
        stickyHeaderIndices={[0]}>
        {/* TAB */}
        <View style={[bg_body, align_start, w_full, p_3, {paddingBottom: 0}]}>
          <View style={[flex_row, sp_2]}>
            {group_category.map(
              (category, index) =>
                index !== 1 && (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedGroup(category);
                      scrollToComponent(firstComponentRef);
                    }}>
                    <View style={[under_button(selectedGroup === category)]}>
                      <Text style={[text_selected(selectedGroup === category)]}>
                        {category}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ),
            )}
          </View>
        </View>
        {/* ALERT */}
        <View style={[w_full, p_4, sp_4]}>
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
            <View style={[flex_row, sp_4, p_2, align_center]}>
              <Image style={img_sm_2} source={alertIcon} />
              <Text>새로운 업데이트 소식 전해드릴게요.</Text>
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
                  <Text
                    style={{
                      fontSize: fs_xl,
                      fontWeight: fw_bold,
                      color: whiteAlpha900,
                    }}>
                    Title
                  </Text>
                  <Text style={{fontSize: fs_md, color: whiteAlpha800}}>
                    서브텍스트가 들어갑니다
                  </Text>
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
                    <Text style={{fontSize: fs_sm, color: whiteAlpha900}}>
                      {index + 1} / {bannerList.image?.length}
                    </Text>
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
                  : index === 1
                  ? secondComponentRef
                  : thirdComponentRef
              }>
              <View style={[flex_column, sp_2]}>
                <Text style={title}>{category}</Text>
                <Text style={description}>
                  {index === 0 || index === 2
                    ? '우리 동네, 밥 머글 사람?'
                    : index === 1
                    ? '새로운 이성과 커피 친구 해보세요.'
                    : '각 분야 정보를 공유해보세요.'}
                </Text>
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
                      />
                    ))}
                  </ScrollView>
                </View>
              ) : (
                <View>
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
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
