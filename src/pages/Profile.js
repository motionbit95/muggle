import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from '../style/styles';
import DropDown from '../Component/PickerComponent';
import {banks, cities, districts} from '../firebase/api';

const Profile = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};

  const [userName, serUserName] = useState(data?.user_name);
  const [userPrice, setUserPrice] = useState('');

  const [selectedGender, setSelectedGender] = useState(data?.user_gender);

  const [selectedCity, setSelectedCity] = useState(
    data?.user_place[0].split(' ')[0],
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    data?.user_place[0].split(' ')[1],
  );

  const [selectyear, setSelectyear] = useState(data?.user_birth.slice(0, 4));
  const [selectmonth, setSelectmonth] = useState(data?.user_birth.slice(4, 6));
  const [selectday, setSelectday] = useState(data?.user_birth.slice(6, 8));

  const [selectbank, setSelectbank] = useState(data?.user_bank.bank_name);
  const [accountNumber, setAccountNumber] = useState(
    data?.user_bank.account_number,
  );

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

  return (
    <View style={styles.screenStyle}>
      <ScrollView style={styles.scrollViewStyle}>
        <View style={[styles.contentStyle, {gap: 20}]}>
          <View
            style={{
              width: '100%',
              gap: 20,
            }}>
            <View>
              <View style={styles.Avartar70}>
                <Image
                  style={{width: '90%', height: '90%'}}
                  source={
                    data?.user_profile
                      ? {uri: data?.user_profile}
                      : require('../assets/avartar.png')
                  }
                />
              </View>
            </View>
            <View style={styles.rowBox}>
              <View style={{flex: 1}}>
                <Text style={styles.contentTitle}>이름</Text>
              </View>
              <TextInput
                style={[
                  {
                    flex: 4,
                    height: 50,
                  },
                  styles.contentBox,
                ]}
                placeholder="변경할 이름을 입력해주세요"
                defaultValue={userName}
              />
            </View>
            <View style={styles.rowBox}>
              <View style={{flex: 1}}>
                <Text style={styles.contentTitle}>소개</Text>
              </View>
              <TextInput
                multiline
                style={[
                  {
                    flex: 4,
                    height: 100,
                  },
                  styles.contentBox,
                ]}
                placeholder="자기소개 내용을 입력해주세요"
              />
            </View>
          </View>
          <View style={styles.hr} />
          <View style={{gap: 20}}>
            <View style={styles.columnBox}>
              <Text style={styles.contentTitle}>성별</Text>
              <View style={styles.buttoncontainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    (selectedGender === 'male' || selectedGender === '남') &&
                      styles.selectedButton,
                  ]}
                  onPress={() => selectGender('male')}>
                  <Text
                    style={[
                      styles.genderbuttonText,
                      (selectedGender === 'male' || selectedGender === '남') &&
                        styles.selectedButtonText,
                    ]}>
                    남성
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    (selectedGender === 'female' || selectedGender === '여') &&
                      styles.selectedButton,
                  ]}
                  onPress={() => selectGender('female')}>
                  <Text
                    style={[
                      styles.genderbuttonText,
                      (selectedGender === 'female' ||
                        selectedGender === '여') &&
                        styles.selectedButtonText,
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
                  style={[{flex: 1.5}, styles.contentBox]}
                  placeholder="번호를 입력해주세요."
                  defaultValue={accountNumber}
                  onChange={e => setAccountNumber(e.nativeEvent.text)}
                />
              </View>
            </View>
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={styles.contentTitle}>관심사</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={[styles.button, styles.buttonMargin]}
          onPress={() => alert('저장')}>
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
