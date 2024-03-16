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
import {
  component_height,
  component_radius,
  font_lg,
  font_md,
  primary_color,
  cities,
  districts,
  banks,
} from '../firebase/api';
import DropDown from '../Component/PickerComponent';

const SignUp = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [selectyear, setSelectyear] = useState('');
  const [selectmonth, setSelectmonth] = useState('');
  const [selectday, setSelectday] = useState('');

  const [selectbank, setSelectbank] = useState('');

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
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', gap: 15, padding: 20}}>
          <View style={{width: '100%', paddingTop: 10}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>회원가입</Text>
          </View>
          <View style={styles.columnBox}>
            <Text style={styles.contentTitle}>이름</Text>
            <TextInput
              style={[
                {
                  width: '100%',
                  height: 50,
                },
                styles.contentBox,
              ]}
              placeholder="이름을 입력해주세요."
            />
          </View>
          <View style={styles.columnBox}>
            <Text style={styles.contentTitle}>성별</Text>
            <View style={styles.container}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === 'male' && styles.selectedButton,
                ]}
                onPress={() => selectGender('male')}>
                <Text
                  style={[
                    styles.genderbuttonText,
                    selectedGender === 'male' && styles.selectedButtonText,
                  ]}>
                  남성
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGender === 'female' && styles.selectedButton,
                ]}
                onPress={() => selectGender('female')}>
                <Text
                  style={[
                    styles.genderbuttonText,
                    selectedGender === 'female' && styles.selectedButtonText,
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
                style={[{width: '100%', height: 50}, styles.contentBox]}
                placeholder="최소 2만원 이상"
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
                style={[{flex: 1.5}, styles.contentBox]}
                placeholder="번호를 입력해주세요."
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('button눌렀엉')}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
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
  genderButton: {
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
  genderbuttonText: {
    color: 'gray',
    fontSize: 16,
  },
  selectedButtonText: {
    color: 'rgba(255, 99, 79, 1)', // 선택된 상태의 버튼 텍스트 색
  },
  button: {
    backgroundColor: primary_color,
    borderRadius: component_radius,
    height: component_height,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnBox: {
    flexDirection: 'column',
    gap: 10,
  },
  contentTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  contentText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(187, 187, 187, 1)',
  },
  contentBox: {
    borderColor: 'rgba(221, 221, 221, 1)',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    fontSize: font_md,
  },
});
