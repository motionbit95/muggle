import React, {Component} from 'react';
import {Button, ImageBackground, StyleSheet, Text, View} from 'react-native';
class Matching extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.screenStyle}>
        <View style={{width: '100%', height: '100%'}}>
          <ImageBackground
            imageStyle={{borderRadius: 20}}
            // source={{uri: user.user_profile}}
            style={{
              flex: 1,
              backgroundColor: 'red',
            }}>
            <View
              style={{
                gap: 5,
                justifyContent: 'flex-end',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
                {/* {user.user_name} */} 유저 이름
              </Text>
              <Text style={{color: 'white', fontSize: 18}}>
                {/* {user.user_place?.[0]} */} 장소
              </Text>
              <View
                style={{
                  backgroundColor: 'rgba(255, 206, 79, 1)',
                  borderRadius: 10,
                  height: 56,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Button
                  color={'black'}
                  onPress={() => navigation.navigate('매칭중')}
                  title="커피 매칭 신청"
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

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
