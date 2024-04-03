import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, {
  align_center,
  center,
  f_full,
  flex_column,
  flex_row,
  fs_2xl,
  fs_lg,
  fs_md,
  fs_sm,
  fs_xl,
  fs_xs,
  fw_bold,
  fw_medium,
  img_lg,
  img_ml,
  img_sm,
  justify_between,
  justify_center,
  justify_end,
  p_1,
  p_2,
  p_3,
  p_4,
  radius_full,
  sp_1,
  sp_3,
  w_full,
  whiteAlpha900,
} from '../../style/styles';
import {defaultFemale, defaultMale, getDisplayAge} from '../../firebase/api';
import {InnerScreen} from 'react-native-screens';
import {getDocList} from '../../firebase/firebase_func';
import Swiper from 'react-native-swiper';

const Matching = ({navigation, route}) => {
  const [userList, setUserList] = React.useState(
    route.params ? route.params.userList : null,
  );

  const [data, setData] = React.useState(
    route.params ? route.params.data : null,
  );
  const [index, setIndex] = React.useState(
    route.params ? route.params.index : 0,
  );

  const updateUser = async () => {
    let list = await getDocList('user');
    // console.log('유저리스트 ===> ', list);
    setUserList(list);
    setData(list[index]);
  };

  useEffect(() => {
    updateUser();
  }, []);

  useEffect(() => {
    if (userList && userList.length > 0) setData(userList[index]);
  }, [index]);

  return (
    <Swiper
      autoplay={false}
      loop={true}
      showsPagination={false}
      autoplayTimeout={5}
      index={index}>
      {userList ? (
        userList?.map((item, index) => (
          <ImageBackground
            source={{
              uri: item?.user_profile
                ? item?.user_profile
                : item?.user_gender === '남'
                ? defaultMale
                : defaultFemale,
            }}
            style={{
              flex: 1,
              width: '100%',
            }}>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}>
              <View style={[sp_3, justify_end, f_full, p_4]}>
                <View
                  style={[
                    flex_row,
                    sp_3,
                    w_full,
                    justify_between,
                    p_2,
                    {marginBottom: 50},
                  ]}>
                  <View style={[flex_column, sp_3, {flex: 1}]}>
                    <View
                      style={[
                        radius_full,
                        flex_row,
                        align_center,
                        justify_center,
                        p_1,
                        sp_1,
                        {
                          borderWidth: 1,
                          borderColor: whiteAlpha900,
                          width: '30%',
                        },
                      ]}>
                      <Image
                        style={img_sm}
                        source={require('../../assets/icons/subtract.png')}
                      />
                      <Text
                        style={{
                          color: whiteAlpha900,
                          fontSize: fs_sm,
                          fontWeight: '400',
                        }}>
                        근처
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: whiteAlpha900,
                        fontSize: fs_2xl,
                        fontWeight: '900',
                      }}>
                      {item?.user_name} {getDisplayAge(item?.user_birth)}
                    </Text>
                    <Text
                      style={{
                        color: whiteAlpha900,
                        fontSize: fs_lg,
                        fontWeight: fw_medium,
                      }}>
                      {item?.user_place?.[0]}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPressOut={() =>
                      navigation.navigate('매칭', {
                        screen: '매칭중',
                        params: {data: item},
                      })
                    }>
                    <Image
                      style={img_lg}
                      source={require('../../assets/icons/matching_button.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        ))
      ) : (
        <View style={f_full}></View>
      )}
    </Swiper>
  );
};

export default Matching;
