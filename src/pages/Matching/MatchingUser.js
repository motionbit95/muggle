import React from 'react';
import {ImageBackground, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, {
  f_full,
  flex_column,
  flex_row,
  justify_between,
  justify_end,
  p_4,
  sp_3,
} from '../../style/styles';
import {defaultFemale, defaultMale, getDisplayAge} from '../../firebase/api';
import Typography from '../../Component/Typography';
import ConnectButtons from '../../Component/ConnectButtons';

const MatchingUser = ({route}) => {
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
                f_full,
                justify_end,
                {
                  paddingBottom: 60,
                },
              ]}>
              <View style={[flex_row, justify_between]}>
                <View style={[flex_row]}>
                  <View style={[justify_end]}>
                    <View style={[flex_column, sp_3, {marginLeft: 24}]}>
                      <Typography white bold size="2xl">
                        {data?.user_name} {getDisplayAge(data?.user_birth)}
                      </Typography>
                      <Typography white size="md">
                        {data?.user_place?.[0]}
                      </Typography>
                    </View>
                  </View>
                </View>
                <ConnectButtons size={60} user={data} navigation={navigation} />
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default MatchingUser;
