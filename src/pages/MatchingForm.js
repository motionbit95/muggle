import React from 'react';
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../style/styles';

const MatchingForm = ({navigation}) => {
  return (
    <View style={styles.screenStyle}>
      <ScrollView style={styles.scrollViewStyle}>
        <Image
          source={require('../assets/banner1.png')}
          style={styles.banner}
        />
        <View style={styles.contentStyle}>
          <View
            style={{
              width: '100%',
              flex: 1,
              gap: 20,
            }}>
            <View style={[{justifyContent: 'space-between'}, styles.rowBox]}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>
                퇴근 후 역삼역 근처에서 저녁
              </Text>
              <View style={styles.d_daytag}>
                <Text style={styles.dayText}>D-3</Text>
              </View>
            </View>
            <View style={styles.gap10}>
              <View style={styles.rowBox}>
                <View style={styles.icon18} />
                <Text style={{fontSize: 16}}>2023.03.09(토) 17:00</Text>
              </View>
              <View style={styles.rowBox}>
                <View style={styles.icon18} />
                <Text style={{fontSize: 16}}>서울 강남 역삼동</Text>
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => alert('지도보기')}>
                  <Text style={{fontSize: 14}}>지도보기</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rowBox}>
                <View style={styles.icon18} />
                <Text style={{fontSize: 16}}>나누기</Text>
              </View>
              <View style={styles.rowBox}>
                <View style={styles.icon18} />
                <Text style={{fontSize: 16}}>5 / 30 (25자리남음)</Text>
              </View>
            </View>

            <View style={{flex: 1, width: '50%'}}>
              <Text>
                여기 삼겹살 진짜 맛있어요 퇴근 후 같이 드시러 가실 분~! 밥값은
                나누기입니다.
              </Text>
            </View>
            <View style={styles.hr} />
          </View>
          <View
            style={{
              width: '100%',
              flex: 1,
              paddingTop: 20,
              gap: 20,
            }}>
            <View>
              <Text>참여인원 ( 5 )</Text>
            </View>
            <View gap={10}>
              <View style={styles.rowBox}>
                <View style={styles.Avartar30} />
                <Text>홍길동</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.buttonBox, styles.rowBox]}>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'gray'}}
          onPress={() => alert('참여하기')}>
          <View style={styles.icon24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {flex: 5}]}
          onPress={() => alert('참여하기')}>
          <Text style={styles.buttonText}>참여하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatchingForm;
