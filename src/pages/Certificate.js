import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Certificate = ({navigation}) => {
  return (
    <View style={styles.screenStyle}>
      <View style={{width: '100%', gap: 10, paddingTop: 10}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>휴대폰 본인인증</Text>
        <Text style={{fontSize: 16, color: 'gray'}}>
          전화번호를 입력하세요.
        </Text>
      </View>
      <View style={{width: '100%', gap: 10}}>
        <View style={{width: '100%', flexDirection: 'row', gap: 10}}>
          <TextInput
            style={{
              width: '70%',
              height: 40,
              borderColor: '#d9d9d9',
              borderWidth: 1,
              marginBottom: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            placeholder="01012345678"
            keyboardType="number-pad"
          />
          <TouchableOpacity
            onPress={() => alert('인증 요청이요')}
            style={{
              width: '30%',
              height: 40,
              borderRadius: 10,
              backgroundColor: 'rgba(255, 206, 79, 1)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>인증 요청</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            width: '100%',
            height: 40,
            borderColor: '#d9d9d9',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
          placeholder="01012345678"
          keyboardType="number-pad"
        />
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        {/* 체크박스가 없어서 일단 보류 */}
        <View style={{width: 20, height: 20, backgroundColor: 'gray'}} />
        <TouchableOpacity
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => alert('약관동의 하실래용')}>
          <Text>서비스 이용약관 동의</Text>
          <View style={{width: 20, height: 20, backgroundColor: 'gray'}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Certificate;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    gap: 30,
  },
});
