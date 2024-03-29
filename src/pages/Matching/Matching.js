import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, {
  align_center,
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
  img_sm,
  justify_between,
  justify_center,
  justify_end,
  p_1,
  p_2,
  p_4,
  radius_full,
  sp_1,
  sp_3,
  w_full,
  whiteAlpha900,
} from '../../style/styles';
import {defaultFemale, defaultMale, getDisplayAge} from '../../firebase/api';

const Matching = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};

  return (
    <View style={styles.screenStyle}>
      <ImageBackground
        source={{
          uri: data?.user_profile
            ? data?.user_profile
            : data?.user_gender === '남'
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
                    {borderWidth: 1, borderColor: whiteAlpha900, width: '30%'},
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
                  {data?.user_name}{' '}
                  {getDisplayAge(data?.user_birth).slice(0, 2)}
                </Text>
                <Text
                  style={{
                    color: whiteAlpha900,
                    fontSize: fs_lg,
                    fontWeight: fw_medium,
                  }}>
                  {data?.user_place?.[0]}
                </Text>
              </View>
              <TouchableOpacity
                // style={btn_primary}
                onPressOut={() =>
                  navigation.navigate('커피매칭신청', {
                    screen: '매칭중',
                    params: {data: data},
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
    </View>
  );
};

export default Matching;
