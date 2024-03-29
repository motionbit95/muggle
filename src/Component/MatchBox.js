import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {defaultFemale, defaultMale, font_md} from '../firebase/api';
import {
  align_center,
  blackAlpha100,
  blackAlpha700,
  btn_primary,
  f_full,
  flex_row,
  fs_lg,
  fs_md,
  fs_xs,
  fw_bold,
  fw_medium,
  img_sm,
  img_xl,
  justify_center,
  justify_end,
  p_1,
  p_4,
  radius_full,
  radius_lg,
  sp_1,
  sp_3,
  whiteAlpha900,
} from '../style/styles';

const MatchBox = ({user, index, navigation}) => {
  return (
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
      style={[img_xl, radius_lg]}>
      <LinearGradient colors={[blackAlpha100, blackAlpha700]} style={radius_lg}>
        <View style={[sp_3, justify_end, f_full, radius_lg, p_4]}>
          <View
            style={[
              radius_full,
              flex_row,
              align_center,
              justify_center,
              p_1,
              sp_1,
              {borderWidth: 1, borderColor: whiteAlpha900, width: '25%'},
            ]}>
            <Image
              style={img_sm}
              source={require('../assets/icons/subtract.png')}
            />
            <Text
              style={{
                color: whiteAlpha900,
                fontSize: fs_xs,
                fontWeight: '400',
              }}>
              근처
            </Text>
          </View>

          <Text
            style={{
              color: whiteAlpha900,
              fontSize: fs_lg,
              fontWeight: fw_bold,
            }}>
            {user.user_name}
          </Text>
          <Text
            style={{
              color: whiteAlpha900,
              fontSize: fs_md,
              fontWeight: fw_medium,
            }}>
            {user.user_place?.[0]}
          </Text>
          <TouchableOpacity
            style={btn_primary}
            onPressOut={() =>
              navigation.navigate('홈', {
                screen: '커피매칭',
                params: {data: user},
              })
            }>
            <Text
              style={{
                color: 'black',
                fontSize: font_md,
                fontWeight: 'bold',
              }}>
              커피 매칭 신청
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default MatchBox;
