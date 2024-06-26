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
import styles, {blackAlpha600, blackAlpha700} from '../../style/styles';
import {primary_color} from '../../firebase/api';
import auth from '@react-native-firebase/auth';
import {getUser} from '../../firebase/firebase_func';
import Typography from '../../Component/Typography';

<script src="https://democpay.payple.kr/js/cpay.payple.1.0.1.js"></script>;
<script src="https://cpay.payple.kr/js/cpay.payple.1.0.1.js"></script>;

const MatchPayment = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};
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
    card_ver: '01', // DEFAULT: 01 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼), 카드결제 시 필수
    payple_payer_id: '', // 결제자 고유ID (본인인증 된 결제회원 고유 KEY)
    buyer_no: '2335', // 가맹점 회원 고유번호
    buyer_name: '홍길동', // 결제자 이름
    buyer_hp: '01012345678', // 결제자 휴대폰 번호
    buyer_email: 'test@payple.kr', // 결제자 Email
    buy_goods: '오프라인 커피 매칭권', // 결제 상품
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

  async function handlePayment() {
    // console.log(content.current);
    if (!auth().currentUser?.uid) {
      alert('로그인해주세요.');
      return;
    }

    // 유저정보
    const user = await getUser(auth().currentUser?.uid);
    // console.log(user.uid, '->', data.uid);

    // 구매정보 수정

    content.current.pay_type = pay_method;
    content.current.buyer_name = user?.user_name;
    content.current.buyer_hp = user?.user_phone;
    content.current.buyer_email = user?.user_email;
    content.current.buy_total = user?.user_price;
    content.current.order_num = createOid();

    setAmount(user?.user_price * 1000);

    navigation.navigate('매칭', {
      screen: '결제',
      params: {
        data: content.current,
        receiver: data.uid,
      },
    });
  }

  return (
    <View style={styles.screenStyle}>
      <ScrollView style={styles.scrollViewStyle}>
        <LinearGradient colors={[primary_color, '#AA4236']}>
          <SafeAreaView>
            <View style={styles.matchingBanner}>
              <View style={styles.textColumnBox}>
                <Typography size="3xl" bold white>
                  새로운 이성과
                </Typography>
                <Typography size="3xl" bold white>
                  커피 한잔 어떠신가요?
                </Typography>
              </View>
              <View style={styles.textColumnBox}>
                <Typography size="xl" white>
                  매칭권 결제 후 앱채팅으로
                </Typography>
                <Typography size="xl" white>
                  오프라인 커피 약속을 잡고 만나보세요.
                </Typography>
              </View>
              <View style={styles.matchCardBox}>
                <View style={styles.coffeeTagBox}>
                  <Typography bold size="sm" white>
                    오프라인 커피 매칭권
                  </Typography>
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
                    <Typography bold red>
                      매칭권 금액 {amount}만원
                    </Typography>
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
                    <Typography bold red>
                      채팅 미응답 시 전액 환불
                    </Typography>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
        <View>
          <View style={{padding: 20, gap: 10}}>
            <View style={{paddingVertical: 10, gap: 5}}>
              <Typography>매칭신청자가 지불한 매칭금액은</Typography>
              <Typography>매칭 수락자에게 부수입으로 정산됩니다!</Typography>
            </View>
            <Typography size="lg" bold>
              매칭 신청자
            </Typography>
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
                  <Typography size="sm">매칭 신청</Typography>
                  <Typography size="sm">및 결제</Typography>
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
                  <Typography size="sm">채팅으로</Typography>
                  <Typography size="sm">커피 약속잡기</Typography>
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
                  <Typography size="sm">오프라인</Typography>
                  <Typography size="sm">매칭</Typography>
                </View>
              </View>
            </View>
            <Typography color={blackAlpha700}>
              · 결제된 매칭권 사용기한 2주
            </Typography>
            <Typography color={blackAlpha700}>
              · 상대방이 매칭 거저 또는 채팅 미응답 시 전액 환불
            </Typography>
          </View>
          <View style={{padding: 20, gap: 10}}>
            <Typography size="lg" bold>
              매칭 수락자
            </Typography>
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
                  <Typography size="sm">수락 또는</Typography>
                  <Typography size="sm">거절</Typography>
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
                  <Typography size="sm">수락시 채팅으로</Typography>
                  <Typography size="sm">약속 잡기</Typography>
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
                  <Typography size="sm">오프라인</Typography>
                  <Typography size="sm">매칭</Typography>
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
                  <Typography size="sm">매칭권</Typography>
                  <Typography size="sm">부수입 정산</Typography>
                </View>
              </View>
            </View>
            <Typography color={blackAlpha700}>
              · 내가 설정한 매칭권 금액의 70%가 부수입으로 정산됩니다.
            </Typography>
            <View>
              <Typography color={blackAlpha700}>
                · 오프라인 매칭 완료 후 2영업일 내에 기재해주신
              </Typography>
              <Typography color={blackAlpha700}>
                {''}
                {'  '}수락자 계좌로 정산됩니다.
              </Typography>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={[styles.button, styles.buttonMargin]}
          onPress={handlePayment}>
          <Typography size="lg" bold white>
            결제하기
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatchPayment;
