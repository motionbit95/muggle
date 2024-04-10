import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
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
} from '../../firebase/api';
import auth from '@react-native-firebase/auth';
import {singleQuery} from '../../firebase/firebase_func';
import PopupBase from '../../Component/PopupBase';
import Typography from '../../Component/Typography';
import {
  blackAlpha400,
  blackAlpha500,
  blackAlpha900,
  flex_row,
  font_family,
} from '../../style/styles';
import WebView from 'react-native-webview';

const Certificate = ({navigation}) => {
  // 테스트 정보 : 번호 01012341234 / 코드 101010
  const [tempAgree, setTempAgree] = useState(false); // 이용약관 동의 여부
  const [phoneNumber, setPhoneNumber] = useState(''); // 입력한 전화번호
  const [code, setCode] = useState(''); // 입력한 인증코드
  const [confirmation, setConfirmation] = useState(null); // 인증 정보
  const [sendCode, setSendCode] = useState(false); // 인증 요청 했는지 여부
  const [isActive, setIsActive] = useState(false); //

  // 전화번호 요청 함수
  const signInWithPhoneNumber = async () => {
    try {
      // console.log(phoneNumber);
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
      // alert('인증 성공');
      setIsActive(true);
    } catch (error) {
      setIsActive(false);
      // alert('인증 실패:', error);
    }
  };

  const moveNextStep = async () => {
    // 인증 후 가입 된 회원이 있는지 확인하고, 없으면 회원가입 패이지로, 있으면 홈으로 이동한다.
    let req = await singleQuery('user', 'uid', auth().currentUser.uid);
    // console.log(req[0]);

    if (req?.length > 0) {
      navigation.navigate('모임');
    } else {
      navigation.navigate('SignUp');
    }
  };

  return (
    <View style={styles.screenStyle}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{gap: 20}}>
          <View style={{width: '100%', gap: 15, paddingTop: 10}}>
            <Typography size={'xl'} bold>
              휴대폰 본인인증
            </Typography>
            <Typography size={'md'} light>
              전화번호를 입력하세요.
            </Typography>
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
                placeholderTextColor={blackAlpha400}
                style={{
                  fontFamily: font_family,
                  flex: 7,
                  height: component_height,
                  borderColor: '#d9d9d9',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: component_radius,
                  fontSize: font_md,
                  color: 'black',
                }}
                keyboardType="phone-pad" // 전화번호 입력용 키보드
                maxLength={11} // 최대 길이 설정
                placeholder="휴대폰번호 입력"
                onChange={e => setPhoneNumber(e.nativeEvent.text)}
                autoComplete="tel-device"
              />
              <TouchableOpacity
                disabled={!phoneNumber}
                onPress={signInWithPhoneNumber}
                style={{
                  flex: 3,
                  height: component_height,
                  borderRadius: component_radius,
                  backgroundColor: !phoneNumber ? '#d9d9d9' : primary_color,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Typography
                  size={'md'}
                  bold
                  white
                  style={{
                    color: !phoneNumber ? blackAlpha500 : blackAlpha900,
                  }}>
                  인증 요청
                </Typography>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholderTextColor={blackAlpha400}
              style={{
                fontFamily: font_family,
                width: '100%',
                height: component_height,
                borderColor: '#d9d9d9',
                borderWidth: 1,
                marginBottom: 10,
                paddingHorizontal: 10,
                borderRadius: component_radius,
                fontSize: font_md,
                color: 'black',
              }}
              placeholder="인증번호를 입력하세요"
              keyboardType="number-pad"
              onChange={e => setCode(e.nativeEvent.text)}
              autoComplete="one-time-code"
            />
            {sendCode && (
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: '#f1f1f1',
                }}>
                <TouchableOpacity
                  style={[
                    flex_row,
                    {
                      backgroundColor: primary_color,
                      borderRadius: component_radius,
                      height: component_height,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                  onPress={confirmCode}>
                  {isActive && (
                    <Image source={require('../../assets/checked.png')} />
                  )}
                  <Typography bold white>
                    인증확인
                  </Typography>
                </TouchableOpacity>
              </View>
            )}
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
                      ? require('../../assets/checked.png')
                      : require('../../assets/unchecked.png')
                  }
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flex: 9,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Typography bold>서비스 이용약관 동의</Typography>
              <PopupBase
                button={
                  <Image source={require('../../assets/rightarrow.png')} />
                }>
                <WebView
                  source={{
                    uri: 'https://muggle.life/terms',
                  }} // 표시할 웹 페이지의 URL
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                  }}
                />
              </PopupBase>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#f1f1f1',
        }}>
        <TouchableOpacity
          disabled={!tempAgree || !isActive}
          style={{
            backgroundColor:
              !tempAgree || !isActive ? '#d9d9d9' : primary_color,
            borderRadius: component_radius,
            height: component_height,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={moveNextStep}>
          <Typography
            white
            bold
            light={!tempAgree || !isActive}
            black={tempAgree && isActive}>
            다음
          </Typography>
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
    justifyContent: 'space-between',
  },
});
