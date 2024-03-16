import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  component_height,
  component_radius,
  font_lg,
  font_md,
  primary_color,
} from '../firebase/api';
import auth from '@react-native-firebase/auth';

const Certificate = ({navigation}) => {
  // 테스트 정보 : 번호 01012341234 / 코드 101010
  const [tempAgree, setTempAgree] = useState(false); // 이용약관 동의 여부
  const [phoneNumber, setPhoneNumber] = useState(''); // 입력한 전화번호
  const [code, setCode] = useState(''); // 입력한 인증코드
  const [confirmation, setConfirmation] = useState(null); // 인증 정보
  const [sendCode, setSendCode] = useState(false); // 인증 요청 했는지 여부

  // 전화번호 요청 함수
  const signInWithPhoneNumber = async () => {
    try {
      console.log(phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(
        '+82' + phoneNumber,
      );
      setConfirmation(confirmation);
      setSendCode(true);
      // 전화번호가 확인되면 인증 코드를 사용하여 사용자가 인증할 수 있도록 저장
    } catch (error) {
      console.error('전화번호 인증 요청 실패');
    }
  };

  // 인증 코드 확인 함수
  const confirmCode = async () => {
    try {
      await confirmation.confirm(code);
      alert('인증 성공');
    } catch (error) {
      alert('인증 실패:', error);
    }
  };

  return (
    <View style={styles.screenStyle}>
      <View style={{width: '100%', gap: 10, paddingTop: 10}}>
        <Text style={{fontSize: font_lg, fontWeight: 'bold'}}>
          휴대폰 본인인증
        </Text>
        <Text style={{fontSize: font_md, color: 'gray'}}>
          전화번호를 입력하세요.
        </Text>
      </View>
      <View style={{width: '100%', gap: 10}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: 10,
          }}>
          <TextInput
            style={{
              flex: 7,
              height: component_height,
              borderColor: '#d9d9d9',
              borderWidth: 1,
              paddingHorizontal: 10,
              borderRadius: component_radius,
              fontSize: font_md,
            }}
            placeholder="휴대폰번호 입력"
            keyboardType="number-pad"
            onChange={e => setPhoneNumber(e.nativeEvent.text)}
          />
          <TouchableOpacity
            onPress={signInWithPhoneNumber}
            style={{
              flex: 3,
              height: component_height,
              borderRadius: component_radius,
              backgroundColor: primary_color,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{fontSize: font_md, fontWeight: 'bold', color: 'black'}}>
              인증 요청
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            width: '100%',
            height: component_height,
            borderColor: '#d9d9d9',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: component_radius,
            fontSize: font_md,
          }}
          placeholder="인증번호를 입력하세요"
          keyboardType="number-pad"
          onChange={e => setCode(e.nativeEvent.text)}
        />
        {sendCode && <Button title="인증 확인" onPress={confirmCode} />}
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'stretch',
        }}>
        {/* 체크박스가 없어서 일단 보류 */}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => setTempAgree(!tempAgree)}>
          <View style={{width: 20, height: 20, justifyContent: 'center'}}>
            <Image
              source={
                tempAgree
                  ? require('../assets/checked.png')
                  : require('../assets/unchecked.png')
              }
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 9,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'stretch',
          }}>
          <Text style={{flex: 9, fontSize: 15, fontWeight: 'bold'}}>
            서비스 이용약관 동의
          </Text>
          <TouchableOpacity onPress={() => alert('약관 표시')}>
            <View style={{width: 20, height: 20, justifyContent: 'center'}}>
              <Image source={require('../assets/rightarrow.png')} />
            </View>
          </TouchableOpacity>
        </View>
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
