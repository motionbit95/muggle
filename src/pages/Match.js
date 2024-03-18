import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../style/styles';

const Match = ({navigation}) => {
  return (
    <View style={styles.screenStyle}>
      <ScrollView style={styles.scrollViewStyle}>
        <LinearGradient
          colors={['rgba(255, 132, 79, 1)', 'rgba(255, 50, 79, 1)']}>
          <View style={styles.matchingBanner}>
            <View style={styles.textColumnBox}>
              <Text style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
                새로운 이성과
              </Text>
              <Text style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
                커피 한잔 어떠신가요?
              </Text>
            </View>
            <View style={styles.textColumnBox}>
              <Text style={{fontSize: 18, color: 'white'}}>
                매칭권 결제 후 앱채팅으로
              </Text>
              <Text style={{fontSize: 18, color: 'white'}}>
                오프라인 커피 약속을 잡고 만나보세요.
              </Text>
            </View>
            <View style={styles.matchCardBox}>
              <View style={styles.coffeeTagBox}>
                <Text
                  style={{fontSize: 12, color: 'white', fontWeight: 'bold'}}>
                  오프라인 커피 매칭권
                </Text>
              </View>
              <View style={styles.Avartar80}>
                <Image
                  source={require('../assets/coffee.png')}
                  styles={styles.icon40}
                />
              </View>
              <View style={[styles.gap10, {alignItems: 'center'}]}>
                <View
                  style={[
                    styles.rowBox,
                    {
                      backgroundColor: 'rgba(255, 99, 79, 0.1)',
                      borderRadius: 25,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      justifyContent: 'center',
                    },
                  ]}>
                  <Image source={require('../assets/check.png')} />
                  <Text
                    style={{
                      color: 'rgba(255, 99, 79, 1)',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    매칭권 금액 5만원
                  </Text>
                </View>
                <View
                  style={[
                    styles.rowBox,
                    {
                      backgroundColor: 'rgba(255, 99, 79, 0.1)',
                      borderRadius: 25,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      justifyContent: 'center',
                    },
                  ]}>
                  <Image source={require('../assets/check.png')} />
                  <Text
                    style={{
                      color: 'rgba(255, 99, 79, 1)',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    채팅 미응답 시 전액 환불
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View>
          <View style={{padding: 20, gap: 10}}>
            <View style={{paddingVertical: 10, gap: 5}}>
              <Text style={{fontSize: 15}}>매칭신청자가 지불한 매칭금액은</Text>
              <Text style={{fontSize: 15}}>
                매칭 수락자에게 부수입으로 정산됩니다!
              </Text>
            </View>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>매칭 신청자</Text>
            <View style={[styles.rowBox, styles.matchingBox]}>
              <View style={styles.matchingContents}>
                <View
                  style={[
                    styles.icon40,
                    styles.iconBox,
                    {
                      backgroundColor: 'rgba(255, 99, 79, 0.1)',
                    },
                  ]}>
                  <Image source={require('../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12}}>매칭 신청</Text>
                  <Text style={{fontSize: 12}}>및 결제</Text>
                </View>
              </View>
              <View style={styles.matchingContents}>
                <View
                  style={[
                    styles.icon40,
                    styles.iconBox,
                    {
                      backgroundColor: 'rgba(255, 99, 79, 0.1)',
                    },
                  ]}>
                  <Image source={require('../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12}}>채팅으로</Text>
                  <Text style={{fontSize: 12}}>커피 약속잡기</Text>
                </View>
              </View>
              <View style={styles.matchingContents}>
                <View
                  style={[
                    styles.icon40,
                    styles.iconBox,
                    {
                      backgroundColor: 'rgba(255, 99, 79, 0.1)',
                    },
                  ]}>
                  <Image source={require('../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12}}>오프라인</Text>
                  <Text style={{fontSize: 12}}>매칭</Text>
                </View>
              </View>
            </View>
            <Text>· 결제된 매칭권 사용기한 2주</Text>
            <Text>· 상대방이 매칭 거저 또는 채팅 미응답 시 전액 환불</Text>
          </View>
          <View style={{padding: 20, gap: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>매칭 수락자</Text>
            <View style={[styles.rowBox, styles.matchingBox]}>
              <View style={styles.matchingContents}>
                <View
                  style={[
                    styles.icon40,
                    styles.iconBox,
                    {
                      backgroundColor: 'rgba(255, 99, 79, 0.1)',
                    },
                  ]}>
                  <Image source={require('../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12}}>수락 또는</Text>
                  <Text style={{fontSize: 12}}>거절</Text>
                </View>
              </View>
              <View style={styles.matchingContents}>
                <View
                  style={[
                    styles.icon40,
                    styles.iconBox,
                    {
                      backgroundColor: 'rgba(255, 99, 79, 0.1)',
                    },
                  ]}>
                  <Image source={require('../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12}}>수락시 채팅으로</Text>
                  <Text style={{fontSize: 12}}>약속 잡기</Text>
                </View>
              </View>
              <View style={styles.matchingContents}>
                <View
                  style={[
                    styles.icon40,
                    styles.iconBox,
                    {
                      backgroundColor: 'rgba(255, 99, 79, 0.1)',
                    },
                  ]}>
                  <Image source={require('../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12}}>오프라인</Text>
                  <Text style={{fontSize: 12}}>매칭</Text>
                </View>
              </View>
              <View style={styles.matchingContents}>
                <View
                  style={[
                    styles.icon40,
                    styles.iconBox,
                    {
                      backgroundColor: 'rgba(255, 99, 79, 0.1)',
                    },
                  ]}>
                  <Image source={require('../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12}}>매칭권</Text>
                  <Text style={{fontSize: 12}}>부수입 정산</Text>
                </View>
              </View>
            </View>
            <Text>
              · 내가 설정한 매칭권 금액의 70%가 부수입으로 정산됩니다.
            </Text>
            <View>
              <Text>· 오프라인 매칭 완료 후 2영업일 내에 기재해주신</Text>
              <Text> 수락자 계좌로 정산됩니다.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={[styles.button, styles.buttonMargin]}
          onPress={() => alert('결제하기로 ㄱㄱ')}>
          <Text style={styles.buttonText}>결제하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Match;
