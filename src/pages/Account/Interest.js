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

import {addDocument} from '../../firebase/firebase_func';
import styles, {
  blackAlpha100,
  blackAlpha50,
  blackAlpha900,
  center,
  fs_xs,
  p_1,
  p_2,
  radius_full,
  radius_sm,
} from '../../style/styles';
import ProfilePicker from '../../Component/ProfilePicker';
import Typography from '../../Component/Typography';
import {primary_color} from '../../firebase/api';

const Interest = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};
  const [interest, setInterest] = useState([]);

  const signupUser = () => {
    data.user_interest = interest;
    // console.log('data ===> ', data);
    addDocument('user', data);
    navigation.navigate('인트로');
  };

  const handleInterest = content => {
    if (interest.includes(content)) {
      setInterest(interest.filter(item => item !== content));
    } else {
      setInterest([...interest, content]);
    }
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
            <ProfilePicker onChangeValue={uri => (data.user_profile = uri)} />
            <View style={styles.rowBox}>
              <View style={{flex: 1}}>
                <Typography size={'lg'} bold>
                  소개
                </Typography>
              </View>
              <TextInput
                onChange={e => (data.user_info = e.nativeEvent.text)}
                multiline
                style={[
                  {
                    color: 'black',
                    flex: 4,
                    height: 100,
                    textAlignVertical: 'top',
                  },
                  styles.contentBox,
                ]}
                placeholder="자기소개 내용을 입력해주세요"
              />
            </View>
          </View>
          <View style={styles.hr} />
          <View style={{flex: 1}}>
            <Typography size={'lg'} bold>
              관심사
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
                      backgroundColor: interest.includes(item)
                        ? primary_color
                        : blackAlpha50,
                    },
                  ]}
                  onPress={() => handleInterest(item)}>
                  <Typography size={'md'}>{item}</Typography>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={signupUser}>
          <Typography size={'lg'} bold>
            가입완료
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interest;
