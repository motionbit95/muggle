import React, {Component} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const User = ({navigation}) => {
  return (
    <View style={styles.screenStyle}>
      <View style={styles.bgStyle} />
      <View style={styles.UserStackStyle}>
        <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
          <View style={styles.AvartarStyle} />
          <View style={{justifyContent: 'center', gap: 5}}>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={{fontSize: 20, color: 'white'}}>홍길동</Text>
              <Text style={{fontSize: 14, color: 'white'}}>5.0</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={{fontSize: 16, color: 'white'}}>20세</Text>
              <Text style={{fontSize: 16, color: 'white'}}>남자</Text>
              <Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>
                서울특별시 압구정
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <View
                style={{
                  padding: 5,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'white',
                }}>
                <Text style={{fontSize: 12, color: 'white'}}>취미</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Button
            color={'white'}
            style={{
              width: 24,
              height: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => alert('설정인데용')}
            title="설정"
          />
        </View>
      </View>
      <View style={styles.shadowBoxStyle}>
        <View style={styles.rowBoxStyle}>
          <View style={styles.one_thirdBoxStyle}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>8</Text>
            <Text>찜모임</Text>
          </View>
          <View style={styles.one_thirdBoxStyle}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>5</Text>
            <Text>최근 본 모임</Text>
          </View>
          <View style={styles.one_thirdBoxStyle}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>3</Text>
            <Text>초대받은 모임</Text>
          </View>
        </View>
        <View style={{backgroundColor: 'white', borderRadius: 10, padding: 10}}>
          <TouchableOpacity
            style={styles.TouchButtonStyle}
            onPress={() => navigation.navigate('매칭내역')}>
            <View style={styles.ButtonTextStyle}>
              <View style={styles.iconStyle} />
              <Text>매칭내역</Text>
            </View>
            <View style={styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TouchButtonStyle}
            onPress={() => alert('눌렀엉')}>
            <View style={styles.ButtonTextStyle}>
              <View style={styles.iconStyle} />
              <Text>메뉴02</Text>
            </View>
            <View style={styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TouchButtonStyle}
            onPress={() => alert('눌렀엉')}>
            <View style={styles.ButtonTextStyle}>
              <View style={styles.iconStyle} />
              <Text>메뉴 03</Text>
            </View>
            <View style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  bgStyle: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(255, 121, 79, 1)',
    width: '100%',
    height: 200,
  },
  UserStackStyle: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  AvartarStyle: {
    width: 80,
    height: 80,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  iconStyle: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
  },
  rowBoxStyle: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  one_thirdBoxStyle: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  shadowBoxStyle: {
    width: '100%',
    padding: 20,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  TouchButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    height: 70,
    alignItems: 'center',
  },
  ButtonTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default User;
