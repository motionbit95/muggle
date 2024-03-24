import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../style/styles';

const Matching = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};

  return (
    <View style={styles.screenStyle}>
      <ImageBackground
        source={{uri: data?.user_profile}}
        style={{
          flex: 1,
          width: '100%',
        }}>
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}>
          <View style={[styles.MatchComponentBox, {borderRadius: 0}]}>
            <View style={styles.MatchiconBox}>
              <Image source={require('../../assets/Subtract.png')} />
              <Text style={{color: 'white', fontSize: 14}}>근처</Text>
            </View>

            <Text style={{color: 'white', fontSize: 22}}>
              {data?.user_name}
            </Text>
            <Text style={{color: 'white', fontSize: 18}}>
              {data?.user_place?.[0]}
            </Text>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => navigation.navigate('매칭중')}>
              <Text style={styles.buttonText}>커피 매칭 신청</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Matching;
