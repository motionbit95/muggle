import React from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../style/styles';
const User = ({navigation}) => {
  return (
    <View style={styles.screenStyle}>
      <View style={styles.bgStyle} />
      <View style={styles.contentStyle}>
        <View style={styles.UserStackStyle}>
          <View style={styles.rowBox}>
            <View style={styles.Avartar70} />
            <View style={{justifyContent: 'center', gap: 5}}>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Text style={{fontSize: 20, color: 'white'}}>홍길동</Text>
                <Text style={{fontSize: 14, color: 'white'}}>5.0</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Text style={{fontSize: 16, color: 'white'}}>20세</Text>
                <Text style={{fontSize: 16, color: 'white'}}>남자</Text>
                <Text
                  style={{fontSize: 16, color: 'white', textAlign: 'center'}}>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('프로필 편집')}>
              <Image source={require('../assets/Setting.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.shadowBoxStyle}>
          <View style={[styles.rowBox, styles.itembox]}>
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
          <View
            style={{backgroundColor: 'white', borderRadius: 10, padding: 10}}>
            <TouchableOpacity
              style={styles.TouchButtonStyle}
              onPress={() => navigation.navigate('매칭내역')}>
              <View style={styles.rowBox}>
                <View style={styles.icon24} />
                <Text>매칭내역</Text>
              </View>
              <View style={styles.icon24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.TouchButtonStyle}
              onPress={() => alert('눌렀엉')}>
              <View style={styles.rowBox}>
                <View style={styles.icon24} />
                <Text>메뉴02</Text>
              </View>
              <View style={styles.icon24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.TouchButtonStyle}
              onPress={() => alert('눌렀엉')}>
              <View style={styles.rowBox}>
                <View style={styles.icon24} />
                <Text>메뉴 03</Text>
              </View>
              <View style={styles.icon24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default User;
