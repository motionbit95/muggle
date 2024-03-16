import React, {useState} from 'react';
import {
  Button,
  ScrollView,
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
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', gap: 15, padding: 20}}>
          <View style={{width: '100%', paddingTop: 10}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>회원가입</Text>
          </View>
          <View style={{width: '100%', gap: 10}}>
            <Text style={{fontSize: 15}}>이름</Text>
            <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: 'red',
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
            <Text style={{fontSize: 15}}>생년월일</Text>
            <View style={styles.rowBox}>
              <View
                style={{
                  width: '44%',
                  height: 50,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  width: '25%',
                  height: 50,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  width: '25%',
                  height: 50,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
          <View style={{width: '100%', gap: 10}}>
            <Text style={{fontSize: 15}}>지역</Text>
            <View style={styles.rowBox}>
              <View
                style={{
                  width: '48.5%',
                  height: 50,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  width: '48.5%',
                  height: 50,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
          <View style={{width: '100%', gap: 10}}>
            <Text style={{fontSize: 15}}>나의 커피 매칭권 금액은?</Text>
            <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
            />
          </View>
          <View style={{width: '100%', gap: 10}}>
            <Text style={{fontSize: 15}}>
              커피 매칭 부수입 정산 받으실 계좌(선택)
            </Text>
            <View style={styles.rowBox}>
              <View
                style={{
                  width: '39%',
                  height: 50,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  width: '58%',
                  height: 50,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
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
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '48%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
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
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
