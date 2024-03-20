import React from 'react';
import {
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
          <TouchableOpacity
            style={[styles.button, styles.buttonBox]}
            onPress={() => navigation.navigate('상세 관심사 선택')}>
            <Text>상세 관심사로 ㄱ</Text>
          </TouchableOpacity>
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
