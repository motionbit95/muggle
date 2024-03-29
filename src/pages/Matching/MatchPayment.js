import React, {useRef, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../style/styles';
import {primary_color} from '../../firebase/api';
import auth from '@react-native-firebase/auth';
import {getUser} from '../../firebase/firebase_func';

<script src="https://democpay.payple.kr/js/cpay.payple.1.0.1.js"></script>;
<script src="https://cpay.payple.kr/js/cpay.payple.1.0.1.js"></script>;

const MatchPayment = ({navigation, route}) => {
  const [amount, setAmount] = useState(1000);
  const [pay_method, setPayMethod] = useState('card');

  function createOid() {
    const now_date = new Date();
    let now_year = now_date.getFullYear();
    let now_month = now_date.getMonth() + 1;
    now_month = now_month < 10 ? '0' + now_month : now_month;
    let now_day = now_date.getDate();
    now_day = now_day < 10 ? '0' + now_day : now_day;
    const datetime = now_date.getTime();
    return now_year + now_month + now_day + datetime;
  }

  const content = useRef({
    // Default form set
    is_direct: 'Y', // 결제창 방식 (DIRECT: Y | POPUP: N)
    pay_type: 'card', // 결제수단
    work_type: 'CERT', // 결제요청방식
    card_ver: '', // DEFAULT: 01 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼), 카드결제 시 필수
    payple_payer_id: '', // 결제자 고유ID (본인인증 된 결제회원 고유 KEY)
    buyer_no: '2335', // 가맹점 회원 고유번호
    buyer_name: '홍길동', // 결제자 이름
    buyer_hp: '01012345678', // 결제자 휴대폰 번호
    buyer_email: 'test@payple.kr', // 결제자 Email
    buy_goods: '매칭 식사권', // 결제 상품
    buy_total: '1000', // 결제 금액
    buy_istax: 'Y', // 과세여부 (과세: Y | 비과세(면세): N)
    buy_taxtotal: '', // 부가세(복합과세인 경우 필수)
    order_num: createOid(), // 주문번호
    pay_year: '', // [정기결제] 결제 구분 년도
    pay_month: '', // [정기결제] 결제 구분 월
    is_reguler: 'N', // 정기결제 여부 (Y | N)
    is_taxsave: 'N', // 현금영수증 발행여부
    simple_flag: 'Y', // 간편결제 여부
    auth_type: 'sms', // [간편결제/정기결제] 본인인증 방식 (sms : 문자인증 | pwd : 패스워드 인증)
  });
  let [payResult] = useState({});

  const getResult = res => {
    if (res.PCD_PAY_RST === 'success') {
      payResult = res;

      // 전달받은 결제 파라미터값을 state에 저장 후  '/react/order_result'로 이동
      // navigate('/order_result', {state: {payResult: payResult}});
    } else {
      // 결제 실패일 경우 알림 메시지
      alert(res.PCD_PAY_MSG);
    }
  };

  async function handlePayment() {
    console.log(content.current);

    // 유저정보
    const user = await getUser(auth().currentUser?.uid);
    console.log('결제유저 정보 ===> ', user);

    // 구매정보 수정

    content.current.pay_type = pay_method;
    content.current.buyer_name = user?.user_name;
    content.current.buyer_hp = user?.user_phone;
    content.current.buyer_email = user?.user_email;
    content.current.buy_total = amount;
    content.current.order_num = createOid();

    navigation.navigate('커피매칭신청', {
      screen: '결제',
      params: {
        data: content.current,
      },
    });
  }

  return (
    <View style={styles.screenStyle}>
      <ScrollView style={styles.scrollViewStyle}>
        <SafeAreaView>
          <LinearGradient colors={['#FF794F', primary_color]}>
            <View style={styles.matchingBanner}>
              <View style={styles.textColumnBox}>
                <Text
                  style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
                  새로운 이성과
                </Text>
                <Text
                  style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
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
                    source={require('../../assets/coffee.png')}
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
                    <Image source={require('../../assets/check.png')} />
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
                    <Image source={require('../../assets/check.png')} />
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
        </SafeAreaView>
        <View>
          <View style={{padding: 20, gap: 10}}>
            <View style={{paddingVertical: 10, gap: 5}}>
              <Text style={{fontSize: 15, color: 'black'}}>
                매칭신청자가 지불한 매칭금액은
              </Text>
              <Text style={{fontSize: 15, color: 'black'}}>
                매칭 수락자에게 부수입으로 정산됩니다!
              </Text>
            </View>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
              매칭 신청자
            </Text>
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
                  <Image source={require('../../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12, color: 'black'}}>매칭 신청</Text>
                  <Text style={{fontSize: 12, color: 'black'}}>및 결제</Text>
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
                  <Image source={require('../../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12, color: 'black'}}>채팅으로</Text>
                  <Text style={{fontSize: 12, color: 'black'}}>
                    커피 약속잡기
                  </Text>
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
                  <Image source={require('../../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12, color: 'black'}}>오프라인</Text>
                  <Text style={{fontSize: 12, color: 'black'}}>매칭</Text>
                </View>
              </View>
            </View>
            <Text style={{color: 'black'}}>· 결제된 매칭권 사용기한 2주</Text>
            <Text style={{color: 'black'}}>
              · 상대방이 매칭 거저 또는 채팅 미응답 시 전액 환불
            </Text>
          </View>
          <View style={{padding: 20, gap: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
              매칭 수락자
            </Text>
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
                  <Image source={require('../../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12, color: 'black'}}>수락 또는</Text>
                  <Text style={{fontSize: 12, color: 'black'}}>거절</Text>
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
                  <Image source={require('../../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12, color: 'black'}}>
                    수락시 채팅으로
                  </Text>
                  <Text style={{fontSize: 12, color: 'black'}}>약속 잡기</Text>
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
                  <Image source={require('../../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12, color: 'black'}}>오프라인</Text>
                  <Text style={{fontSize: 12, color: 'black'}}>매칭</Text>
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
                  <Image source={require('../../assets/circlecheck.png')} />
                </View>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 12, color: 'black'}}>매칭권</Text>
                  <Text style={{fontSize: 12, color: 'black'}}>
                    부수입 정산
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{color: 'black'}}>
              · 내가 설정한 매칭권 금액의 70%가 부수입으로 정산됩니다.
            </Text>
            <View>
              <Text style={{color: 'black'}}>
                · 오프라인 매칭 완료 후 2영업일 내에 기재해주신
              </Text>
              <Text style={{color: 'black'}}> 수락자 계좌로 정산됩니다.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={[styles.button, styles.buttonMargin]}
          onPress={handlePayment}>
          <Text style={styles.buttonText}>결제하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatchPayment;
