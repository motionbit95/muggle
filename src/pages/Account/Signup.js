import React, {useState} from 'react';
import {
  Image,
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
import styles, {
  align_center,
  blackAlpha400,
  blackAlpha900,
  flex_row,
  font_family,
  fs_md,
  img_sm_2,
  justify_center,
} from '../../style/styles';
import auth from '@react-native-firebase/auth';
import Typography from '../../Component/Typography';
import MessageBox from '../../Component/MessageBox';
import Tooltip from 'react-native-walkthrough-tooltip';

const SignUp = ({navigation}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [message, setMessage] = useState({
    mode: 'error',
    isView: false,
    message: '',
    type: '',
  });
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
      setMessage({
        mode: 'error',
        isView: true,
        message: '사용자 이름를 입력하세요.',
      });
      return;
    }

    if (!selectedGender) {
      setMessage({
        mode: 'error',
        isView: true,
        message: '성별을 선택하세요.',
      });
      return;
    }

    if (!selectyear || !selectmonth || !selectday) {
      setMessage({
        mode: 'error',
        isView: true,
        message: '생년월일을 선택하세요.',
      });
      return;
    }

    if (!userPrice) {
      setMessage({
        mode: 'error',
        isView: true,
        message: '매칭권 금액을 입력하세요.',
      });
      return;
    }

    if (userPrice < 2) {
      setMessage({
        mode: 'error',
        isView: true,
        message: '매칭권 금액을 2만원 이상으로 설정하세요.',
      });
      return;
    }

    if (!selectedCity || !selectedDistrict) {
      setMessage({
        mode: 'error',
        isView: true,
        message: '지역을 선택하세요.',
      });
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
      {message.isView && (
        <MessageBox
          visible={message.isView}
          message={message.message}
          mode={message.mode}
          onCancel={() =>
            setMessage({mode: 'error', isView: false, message: ''})
          }
          onOK={() => {
            setMessage({mode: 'error', isView: false, message: ''});
          }}
        />
      )}
      <SafeAreaView style={{width: '100%'}}>
        <ScrollView style={styles.scrollViewStyle}>
          <View style={{width: '100%', gap: 15, padding: 20}}>
            <View style={{width: '100%'}}>
              <Typography bold size={'xl'}>
                회원가입
              </Typography>
            </View>
            <View style={styles.columnBox}>
              <Typography bold size={'lg'}>
                이름
              </Typography>
              <TextInput
                placeholderTextColor={blackAlpha400}
                style={[
                  {
                    fontFamily: font_family,
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
              <Typography bold size={'lg'}>
                성별
              </Typography>
              <View style={styles.buttoncontainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    selectedGender === '남' && styles.selectedButton,
                  ]}
                  onPress={() => selectGender('남')}>
                  <Typography red={selectedGender === '남'}>남성</Typography>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    selectedGender === '여' && styles.selectedButton,
                  ]}
                  onPress={() => selectGender('여')}>
                  <Typography red={selectedGender === '여'}>여성</Typography>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.columnBox}>
              <Typography bold size={'lg'}>
                생년월일
              </Typography>
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
              <Typography bold size={'lg'}>
                지역
              </Typography>
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
              <View style={flex_row}>
                <Typography bold size={'lg'}>
                  내 커피 매칭권 금액
                </Typography>
                <Tooltip
                  backgroundColor="rgba(0,0,0,0)"
                  contentStyle={{
                    backgroundColor: '#f1f1f1',
                    width: 200,
                    height: 70,
                  }}
                  isVisible={tooltipVisible}
                  content={
                    <View>
                      <Typography light size="sm">
                        커피 매칭권 신청을 받으시면 설정하신 금액의 70%를
                        수익으로 정산해드립니다.
                      </Typography>
                    </View>
                  }
                  placement="top"
                  onClose={() => setTooltipVisible(false)}>
                  <TouchableOpacity onPress={() => setTooltipVisible(true)}>
                    <Image
                      style={[img_sm_2, {opacity: 0.5}]}
                      source={require('../../assets/Question.png')}
                    />
                  </TouchableOpacity>
                </Tooltip>
              </View>
              <View
                style={[
                  flex_row,
                  justify_center,
                  align_center,
                  styles.contentBox,
                  {height: 50},
                ]}>
                <TextInput
                  placeholderTextColor={blackAlpha400}
                  keyboardType="numeric"
                  style={[
                    {
                      fontFamily: font_family,
                      color: blackAlpha900,
                      fontSize: fs_md,
                      padding: 0,
                    },
                  ]}
                  placeholder="0"
                  onChange={e => setUserPrice(e.nativeEvent.text)}
                  // defaultValue={userPrice}
                />
                <Typography>만원</Typography>
              </View>
            </View>
            <View style={styles.columnBox}>
              <Typography bold size={'lg'}>
                커피ㅣ 매칭 부수입 정산 받으실 계좌(선택)
              </Typography>
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
                  placeholderTextColor={blackAlpha400}
                  keyboardType="numeric"
                  style={[
                    {fontFamily: font_family, flex: 1.5, color: 'black'},
                    styles.contentBox,
                  ]}
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
              <Typography bold size={'md'} white>
                다음
              </Typography>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUp;
