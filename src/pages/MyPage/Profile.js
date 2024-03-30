import React, {useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import styles, {
  align_center,
  blackAlpha100,
  blackAlpha300,
  blackAlpha900,
  btn_primary,
  btn_secondary,
  center,
  flex_row,
  fs_md,
  fs_xs,
  justify_center,
} from '../../style/styles';
import DropDown from '../../Component/PickerComponent';
import {banks, cities, districts} from '../../firebase/api';
import ImagePicker from '../../Component/ProfilePicker';
import ProfilePicker from '../../Component/ProfilePicker';
import {updateDocument} from '../../firebase/firebase_func';

const Profile = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};

  const [userName, setUserName] = useState(data?.user_name);
  const [userInfo, setUserInfo] = useState(data?.user_info);
  const [interest, setInterest] = useState(data?.user_interest);

  const [userPrice, setUserPrice] = useState(data?.user_price);

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

  const handleInterest = content => {
    if (interest.includes(content)) {
      setInterest(interest.filter(item => item !== content));
    } else {
      setInterest([...interest, content]);
    }
  };

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

  const handleSaveProfile = () => {
    updateDocument('user', data?.doc_id, {
      ...data,
      user_name: userName,
      user_info: userInfo,
      user_interest: interest,
      user_price: userPrice,
      user_gender: selectedGender,
      user_place: [`${selectedCity} ${selectedDistrict}`],
      user_birth: `${selectyear}${selectmonth}${selectday}`,
      user_bank: {
        bank_name: selectbank,
        account_number: accountNumber,
      },
    });

    Alert.alert('확인', '프로필이 수정되었습니다.', [
      {
        text: '확인',
        onPress: () => navigation.goBack(),
      },
    ]);
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
            <ProfilePicker
              defaultValue={data?.user_profile}
              onChangeValue={uri => (data.user_profile = uri)}
            />
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
                onChange={e => setUserName(e.nativeEvent.text)}
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
                    textAlignVertical: 'top',
                  },
                  styles.contentBox,
                ]}
                placeholder="자기소개 내용을 입력해주세요"
                defaultValue={userInfo}
                onChange={e => setUserInfo(e.nativeEvent.text)}
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
              <Text style={styles.contentTitle}>나의 커피 매칭권 금액은?</Text>
              <View style={styles.contentBox}>
                <View
                  style={[
                    flex_row,
                    justify_center,
                    align_center,
                    {height: 30},
                  ]}>
                  <TextInput
                    keyboardType="numeric"
                    style={[{color: blackAlpha900, fontSize: fs_md}]}
                    placeholder="0"
                    onChange={e => setUserPrice(e.nativeEvent.text)}
                    defaultValue={userPrice}
                  />
                  <Text style={[{color: blackAlpha900, fontSize: fs_md}]}>
                    {' '}
                    만원
                  </Text>
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
          <View style={center}>
            <View
              style={{
                rowGap: 20,
                columnGap: 0,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {[
                '아웃도어/여행',
                '운동/스포츠',
                '인문학/책/글',
                '외국/언어',
                '문화/공연/축제',
                '음악/악기',
                '공예/만들기',
                '댄스/무용',
                '봉사활동',
                '사교/인맥',
                '차/오토바이',
                '사진/영상',
                '스포츠관람',
                '게임/오락',
                '요리/제조',
                '반려동물',
                '자기계발',
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 5,
                    margin: 2,
                    width: 65,
                    height: 100,
                    backgroundColor: interest.includes(item)
                      ? blackAlpha100
                      : 'white',
                    padding: 5,
                    borderRadius: 10,
                  }}
                  onPress={() => handleInterest(item)}>
                  <View style={styles.interestButton}></View>
                  <Text
                    style={{
                      color: blackAlpha900,
                      fontSize: fs_xs,
                      textAlign: 'center',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>저장</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
