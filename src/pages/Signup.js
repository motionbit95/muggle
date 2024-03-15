import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SignUp = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const selectGender = gender => {
    setSelectedGender(gender);
  };

  return (
    <View style={styles.screenStyle}>
      <View style={{width: '100%', padding: 20, gap: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>회원가입</Text>
        <View style={{width: '100%', gap: 10}}>
          <Text>이름</Text>
          <TextInput
            placeholder="이름을 입력해주세요"
            style={{
              width: '100%',
              height: 40,
              borderColor: '#d9d9d9',
              borderWidth: 1,
              marginBottom: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
          />
        </View>
        <View style={{width: '100%', gap: 10}}>
          <Text style={{fontSize: 18}}>성별</Text>
          <View style={styles.container}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedGender === 'male' && styles.selectedButton,
              ]}
              onPress={() => selectGender('male')}>
              <Text
                style={[
                  styles.buttonText,
                  selectedGender === 'male' && styles.selectedButtonText,
                ]}>
                남성
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selectedGender === 'female' && styles.selectedButton,
              ]}
              onPress={() => selectGender('female')}>
              <Text
                style={[
                  styles.buttonText,
                  selectedGender === 'female' && styles.selectedButtonText,
                ]}>
                여성
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', gap: 10}}>
          <Text style={{fontSize: 18}}>생년월일</Text>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() => alert('연 입력')}
              style={styles.dateButton}>
              <Text>연</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert('연 입력')}
              style={styles.dateButton}>
              <Text>월</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert('연 입력')}
              style={styles.dateButton}>
              <Text>일</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', gap: 10}}>
          <Text style={{fontSize: 18}}>지역</Text>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() => alert('지역 선택')}
              style={styles.button}>
              <Text>지역</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert('구 선택')}
              style={styles.button}>
              <Text>구</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', gap: 10}}>
          <Text style={{fontSize: 16}}>매칭 부수입 정산 받으실 계좌(선택)</Text>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() => alert('계좌 선택')}
              style={styles.button}>
              <Text>계좌 선택</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.button}
              placeholder="번호를 입력해주세요."
            />
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: '#f1f1f1',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255, 206, 79, 1)',
            borderRadius: 15,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => alert('button눌렀엉')}>
          <Text>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    gap: 30,
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
  },
  selectedButton: {
    backgroundColor: 'white',
    borderColor: 'rgba(255, 99, 79, 1)',
  },
  buttonText: {
    color: 'gray',
    fontSize: 16,
  },
  selectedButtonText: {
    color: 'rgba(255, 99, 79, 1)', // 선택된 상태의 버튼 텍스트 색
  },
  dateButton: {
    width: '30%',
    height: 40,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
