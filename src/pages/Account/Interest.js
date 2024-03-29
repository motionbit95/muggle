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
  blackAlpha900,
  center,
  fs_xs,
} from '../../style/styles';
import ProfilePicker from '../../Component/ProfilePicker';

const Interest = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};
  const [interest, setInterest] = useState([]);

  const signupUser = () => {
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
            <ProfilePicker />
            <View style={styles.rowBox}>
              <View style={{flex: 1}}>
                <Text style={styles.contentTitle}>소개</Text>
              </View>
              <TextInput
                multiline
                style={[
                  {color: 'black', flex: 4, height: 100},
                  styles.contentBox,
                ]}
                placeholder="자기소개 내용을 입력해주세요"
              />
            </View>
          </View>
          <View style={styles.hr} />
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

          {/* <TouchableOpacity
            style={[styles.button, styles.buttonBox]}
            onPress={() => navigation.navigate('상세 관심사 선택')}>
            <Text>상세 관심사 선택</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={signupUser}>
          <Text style={styles.buttonText}>가입완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interest;
