import React, {useRef, useState} from 'react';
import {ImageBackground, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {defaultFemale, defaultMale, useShoppingState} from '../firebase/api';
import {
  blackAlpha100,
  blackAlpha700,
  f_full,
  flex_column,
  flex_row,
  img_xl,
  justify_between,
  justify_end,
  p_4,
  radius_lg,
  sp_1,
  sp_3,
  w_full,
} from '../style/styles';
import Typography from './Typography';
import ConnectButtons from './ConnectButtons';

const MatchBox = ({user, index, view, navigation}) => {
  return (
    <ImageBackground
      key={index}
      imageStyle={radius_lg}
      source={{
        uri: user.user_profile
          ? user.user_profile
          : user.user_gender === 'male' || user.user_gender === '남'
          ? defaultMale
          : defaultFemale,
      }}
      style={[view === 'grid' ? {aspectRatio: 1} : img_xl, radius_lg]}>
      <LinearGradient colors={[blackAlpha100, blackAlpha700]} style={radius_lg}>
        <View style={[sp_3, justify_end, f_full, radius_lg, p_4]}>
          <View
            style={[
              view === 'grid' ? flex_column : flex_row,
              w_full,
              justify_between,
              sp_3,
            ]}>
            <View style={sp_1}>
              <Typography size={'lg'} white bold>
                {user.user_name}
              </Typography>
              <Typography white>{user.user_place?.[0]}</Typography>
            </View>
            <ConnectButtons size={50} user={user} navigation={navigation} />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default MatchBox;
