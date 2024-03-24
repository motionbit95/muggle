import React from 'react';
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
import styles from '../../style/styles';

const Interest = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};

  const signupUser = () => {
    addDocument('user', data);
    navigation.navigate('인트로');
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
                      : require('../../assets/avartar.png')
                  }
                />
              </View>
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
          <View>
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
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                    width: '20%',
                  }}
                  onPress={() => Alert.alert('미구현')}>
                  <View style={styles.interestButton}></View>
                  <Text style={{fontSize: 12}}>{item}</Text>
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
