import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  defaultFemale,
  defaultMale,
  font_md,
  font_sm,
  font_xxs,
} from '../firebase/api';

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
      style={{
        width: 280 * 0.7,
        height: 300 * 0.7,
        borderRadius: 16,
      }}>
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
        style={{borderRadius: 16}}>
        <View
          style={{
            gap: 8,
            justifyContent: 'flex-end',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 20,
            padding: 16,
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
              padding: 4,
              gap: 5,
            }}>
            <Image
              style={{width: 16, height: 16}}
              source={require('../assets/icons/subtract.png')}
            />
            <Text
              style={{
                color: 'white',
                fontSize: font_xxs,
                fontWeight: '400',
              }}>
              근처
            </Text>
          </View>

          <Text style={{color: 'white', fontSize: font_md, fontWeight: 'bold'}}>
            {user.user_name}
          </Text>
          <Text style={{color: 'white', fontSize: font_sm}}>
            {user.user_place?.[0]}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#D96F6F',
              borderRadius: 10,
              height: 40,
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
