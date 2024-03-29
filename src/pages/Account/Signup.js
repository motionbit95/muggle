import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  cities,
  districts,
  banks,
  font_lg,
  formatTwoDigits,
} from '../../firebase/api';
import DropDown from '../../Component/PickerComponent';
import styles from '../../style/styles';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [userName, serUserName] = useState('');
  const [userPrice, setUserPrice] = useState('');

  const [selectedGender, setSelectedGender] = useState(null);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [selectyear, setSelectyear] = useState('');
  const [selectmonth, setSelectmonth] = useState('');
  const [selectday, setSelectday] = useState('');

  const [selectbank, setSelectbank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const years = [];
  for (let year = 2005; year >= 1900; year--) {
    years.push(year);
  }

  const months = [];
  for (let month = 1; month <= 12; month++) {
    months.push(month);
  }

  const days = [];
  for (let day = 1; day <= 31; day++) {
    days.push(day);
  }

  const handleYearChange = year => {
    setSelectyear(year);
    setSelectmonth('');
  };

  const handleMonthChange = month => {
    setSelectmonth(month);
    setSelectday('');
  };

  const handleDayChange = day => {
    setSelectday(day);
  };

  const selectGender = gender => {
    setSelectedGender(gender);
  };

  const handleCityChange = value => {
    setSelectedCity(value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = value => {
    setSelectedDistrict(value);
  };

  const handleBankChange = value => {
    setSelectbank(value);
  };

  const handleSignup = () => {
    if (!userName) {
      alert('회원 이름을 입력하세요.');
      return;
    }

    if (!selectedGender) {
      alert('성별을 선택하세요.');
      return;
    }

    if (!selectyear || !selectmonth || !selectday) {
      alert('생년월일을 선택하세요.');
      return;
    }

    if (!selectedCity || !selectedDistrict) {
      alert('지역을 선택하세요.');
      return;
    }

    if (!userPrice) {
      alert('매칭권 금액을 입력하세요.');
      return;
    }

    if (userPrice < 2) {
      alert('매칭권 금액을 2만원 이상으로 입력하세요.');
      return;
    }

    const userInfo = {
      uid: auth().currentUser?.uid,
      user_phone: auth().currentUser?.phoneNumber,
      user_name: userName,
      user_gender: selectedGender,
      user_birth:
        selectyear + formatTwoDigits(selectmonth) + formatTwoDigits(selectday),
      user_place: [selectedCity + ' ' + selectedDistrict],
      user_price: userPrice,
      user_bank: {
        account_number: accountNumber,
        bank_name: selectbank,
      },
    };
    navigation.navigate('프로필 설정', {data: userInfo});
  };

  return (
    <View style={styles.screenStyle}>
      <SafeAreaView style={{width: '100%'}}>
        <ScrollView style={styles.scrollViewStyle}>
          <View style={{width: '100%', gap: 15, padding: 20}}>
            <View style={{width: '100%'}}>
              <Text
                style={{color: 'black', fontSize: font_lg, fontWeight: 'bold'}}>
                회원가입
              </Text>
            </View>
            <View style={styles.columnBox}>
              <Text style={styles.contentTitle}>이름</Text>
              <TextInput
                style={[
                  {
                    color: 'black',
                    width: '100%',
                    height: 50,
                  },
                  styles.contentBox,
                ]}
                placeholder="이름을 입력해주세요."
                onChange={e => serUserName(e.nativeEvent.text)}
              />
            </View>
            <View style={styles.columnBox}>
              <Text style={styles.contentTitle}>성별</Text>
              <View style={styles.buttoncontainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    selectedGender === '남' && styles.selectedButton,
                  ]}
                  onPress={() => selectGender('남')}>
                  <Text
                    style={[
                      styles.genderbuttonText,
                      selectedGender === '남' && styles.selectedButtonText,
                    ]}>
                    남성
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    selectedGender === '여' && styles.selectedButton,
                  ]}
                  onPress={() => selectGender('여')}>
                  <Text
                    style={[
                      styles.genderbuttonText,
                      selectedGender === '여' && styles.selectedButtonText,
                    ]}>
                    여성
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.columnBox}>
              <Text style={styles.contentTitle}>생년월일</Text>
              <View
                style={{
                  justifyContent: 'stretch',
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <View style={{flex: 2}}>
                  <DropDown
                    items={years}
                    defaultValue={selectyear ? selectyear : '년도'}
                    onChangeValue={handleYearChange}
                  />
                </View>
                <View style={{flex: 1}}>
                  <DropDown
                    items={months}
                    defaultValue={selectmonth ? selectmonth : '월'}
                    onChangeValue={handleMonthChange}
                  />
                </View>
                <View style={{flex: 1}}>
                  <DropDown
                    items={days}
                    defaultValue={selectday ? selectday : '일'}
                    onChangeValue={handleDayChange}
                  />
                </View>
              </View>
            </View>
            <View style={styles.columnBox}>
              <Text style={styles.contentTitle}>지역</Text>
              <View
                style={{
                  justifyContent: 'stretch',
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <View style={{flex: 1}}>
                  <DropDown
                    items={cities}
                    defaultValue={selectedCity ? selectedCity : '전체'}
                    onChangeValue={handleCityChange}
                  />
                </View>
                <View style={{flex: 1}}>
                  <DropDown
                    items={districts[selectedCity]}
                    defaultValue={selectedDistrict ? selectedDistrict : '전체'}
                    onChangeValue={handleDistrictChange}
                  />
                </View>
              </View>
            </View>
            <View style={styles.columnBox}>
              <Text style={styles.contentTitle}>나의 커피 매칭권 금액은?</Text>
              <View>
                <TextInput
                  keyboardType="numeric"
                  style={[
                    {color: 'black', width: '100%', height: 50},
                    styles.contentBox,
                  ]}
                  placeholder="최소 2만원 이상"
                  onChange={e => setUserPrice(e.nativeEvent.text)}
                />
              </View>
            </View>
            <View style={styles.columnBox}>
              <Text style={styles.contentTitle}>
                커피ㅣ 매칭 부수입 정산 받으실 계좌(선택)
              </Text>
              <View
                style={{
                  justifyContent: 'stretch',
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <View style={{flex: 1}}>
                  <DropDown
                    items={banks}
                    defaultValue={selectbank ? selectbank : '계좌 선택'}
                    onChangeValue={handleBankChange}
                  />
                </View>
                <TextInput
                  keyboardType="numeric"
                  style={[{flex: 1.5, color: 'black'}, styles.contentBox]}
                  placeholder="번호를 입력해주세요."
                  onChange={e => setAccountNumber(e.nativeEvent.text)}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonBox}>
            <TouchableOpacity
              style={[styles.button, styles.buttonMargin]}
              onPress={handleSignup}>
              <Text style={styles.buttonText}>다음</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUp;
