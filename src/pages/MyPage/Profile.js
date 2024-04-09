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
  blackAlpha50,
  blackAlpha900,
  center,
  flex_row,
  fs_md,
  img_sm_2,
  justify_center,
  p_2,
  radius_full,
} from '../../style/styles';
import DropDown from '../../Component/PickerComponent';
import {banks, cities, districts, primary_color} from '../../firebase/api';
import ProfilePicker from '../../Component/ProfilePicker';
import {updateDocument} from '../../firebase/firebase_func';
import Typography from '../../Component/Typography';
import MessageBox from '../../Component/MessageBox';
import Tooltip from 'react-native-walkthrough-tooltip';

const Profile = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [message, setMessage] = useState({
    mode: 'error',
    isView: false,
    message: '',
    type: '',
  });

  const [userName, setUserName] = useState(data?.user_name);
  const [userInfo, setUserInfo] = useState(data?.user_info);
  const [interest, setInterest] = useState(
    data?.user_interest ? data?.user_interest : [],
  );

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
      if (interest.length < 3) {
        setInterest([...interest, content]);
      }
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

  const confirmSave = () => {
    setMessage({
      mode: 'confirm',
      isView: true,
      message: '프로필을 수정하시겠습니까?',
      type: 'success',
    });
  };

  const handleSaveProfile = () => {
    if (!userName) {
      setMessage({
        mode: 'error',
        isView: true,
        message: '사용자 이름를 입력하세요.',
      });
      return;
    }

    if (!userInfo) {
      setMessage({
        mode: 'error',
        isView: true,
        message: '소개말을 입력하세요.',
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

    navigation.navigate('User', {
      data: {
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
      },
    });
    //   {
    //     text: '확인',
    //     onPress: () =>
    //       navigation.navigate('User', {
    //         data: {
    //           ...data,
    //           user_name: userName,
    //           user_info: userInfo,
    //           user_interest: interest,
    //           user_price: userPrice,
    //           user_gender: selectedGender,
    //           user_place: [`${selectedCity} ${selectedDistrict}`],
    //           user_birth: `${selectyear}${selectmonth}${selectday}`,
    //           user_bank: {
    //             bank_name: selectbank,
    //             account_number: accountNumber,
    //           },
    //         },
    //       }),
    //   },
    // ]);
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
            if (message.type === 'success') {
              handleSaveProfile();
            }
            setMessage({mode: 'error', isView: false, message: ''});
          }}
        />
      )}
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
                <Typography size="lg" bold>
                  이름
                </Typography>
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
                <Typography size="lg" bold>
                  소개
                </Typography>
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
              <Typography size="lg" bold>
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
              <Typography size="lg" bold>
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
              <Typography size="lg" bold>
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
                  backgroundColor="rgba(0,0,0,0.1)"
                  contentStyle={{
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
                  keyboardType="numeric"
                  style={[
                    {
                      color: blackAlpha900,
                      fontSize: fs_md,
                      padding: 0,
                    },
                  ]}
                  placeholder="0"
                  onChange={e => setUserPrice(e.nativeEvent.text)}
                  defaultValue={userPrice}
                />
                <Typography>만원</Typography>
              </View>
            </View>
            <View style={styles.columnBox}>
              <Typography size="lg" bold>
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
          <View style={{flex: 1}}>
            <Typography size="lg" bold>
              관심사 (최대 3개까지 설정 가능합니다.)
            </Typography>
          </View>
          <View style={center}>
            <View
              style={{
                rowGap: 5,
                columnGap: 5,
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
                  style={[
                    p_2,
                    radius_full,
                    {
                      backgroundColor: interest?.includes(item)
                        ? primary_color
                        : blackAlpha50,
                    },
                  ]}
                  onPress={() => handleInterest(item)}>
                  {/* <View style={styles.interestButton}></View> */}
                  <Typography size={'md'}>{item}</Typography>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={confirmSave}>
            <Typography size="lg" bold white>
              저장
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
