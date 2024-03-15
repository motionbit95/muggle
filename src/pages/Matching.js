import React, {Component, useEffect} from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Matching = ({navigation, route}) => {
  const {data} = route.params;

  return (
    <View style={styles.screenStyle}>
      <View style={{width: '100%', height: '100%'}}>
        <ImageBackground
          source={{uri: data.user_profile}}
          style={{
            flex: 1,
          }}>
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}>
            <View
              style={{
                gap: 5,
                justifyContent: 'flex-end',
                width: '100%',
                height: '100%',
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  width: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Text>✭</Text>
                <Text style={{color: 'white', fontSize: 14}}>근처</Text>
              </View>

              <Text style={{color: 'white', fontSize: 22}}>
                {data.user_name}
              </Text>
              <Text style={{color: 'white', fontSize: 18}}>
                {data.user_place?.[0]}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(255, 206, 79, 1)',
                  borderRadius: 10,
                  height: 56,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('매칭중')}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  커피 매칭 신청
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Matching;
const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerStyle: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
});
