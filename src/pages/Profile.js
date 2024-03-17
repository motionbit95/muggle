import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from '../style/styles';

const Profile = ({navigation}) => {
  return (
    <View style={styles.screenStyle}>
      <ScrollView style={{width: '100%'}}>
        <View style={[styles.contentStyle, {gap: 20}]}>
          <View
            style={{
              width: '100%',
              gap: 20,
            }}>
            <View>
              <View style={styles.Avartar70} />
            </View>
            <View style={styles.rowBox}>
              <View style={{flex: 1}}>
                <Text>이름</Text>
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
              />
            </View>
            <View style={styles.rowBox}>
              <View style={{flex: 1}}>
                <Text>소개</Text>
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
            <View style={styles.rowBox}>
              <View style={{flex: 1}}>
                <Text>MBTI</Text>
              </View>
              <TextInput
                style={[
                  {
                    flex: 4,
                    height: 50,
                  },
                  styles.contentBox,
                ]}
                placeholder="MBTI를 입력해주세요"
              />
            </View>
          </View>
          <View style={styles.hr} />
          <View style={{gap: 20}}>
            <View style={styles.rowBox}>
              <View style={{flex: 1}}>
                <Text>지역</Text>
              </View>
              <TextInput
                style={[
                  {
                    flex: 4,
                    height: 50,
                  },
                  styles.contentBox,
                ]}
                placeholder="지역 선택 버튼"
              />
            </View>
            <View style={styles.rowBox}>
              <TextInput
                style={[
                  {
                    flex: 1,
                    height: 50,
                  },
                  styles.contentBox,
                ]}
                placeholder="남여 선택 버튼"
              />
              <TextInput
                style={[
                  {
                    flex: 1,
                    height: 50,
                  },
                  styles.contentBox,
                ]}
                placeholder="생년월일 선택 버튼"
              />
            </View>
          </View>
          <View style={styles.hr} />
          <View>
            <Text>관심사</Text>
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
