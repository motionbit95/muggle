import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, Text, View} from 'react-native';
import {
  align_center,
  blackAlpha500,
  f_full,
  fs_md,
  justify_center,
} from '../../style/styles';
import WebView from 'react-native-webview';
import firestore from '@react-native-firebase/firestore';
import {addDocument, getUser} from '../../firebase/firebase_func';
import auth from '@react-native-firebase/auth';

function WebViewPayment({nacvigation, route}) {
  const {data} = route.params ? route.params : {data: null};
  const [queryParams, setQueryParams] = useState(null);

  useEffect(() => {
    let queryParams = new URLSearchParams();
    queryParams.append('buyer_name', data.buyer_name);
    queryParams.append('buy_goods', data.buy_goods);
    queryParams.append('buy_istax', data.buy_istax);
    queryParams.append('buy_total', data.buy_total);
    queryParams.append('buy_taxtotal', data.buy_taxtotal);
    queryParams.append('buyer_email', data.buyer_email);
    queryParams.append('buyer_no', data.buyer_no);
    queryParams.append('card_ver', data.card_ver);
    queryParams.append('is_direct', data.is_direct);
    queryParams.append('is_reguler', data.is_reguler);
    queryParams.append('is_taxsave', data.is_taxsave);
    queryParams.append('order_num', data.order_num);
    queryParams.append('pay_month', data.pay_month);
    queryParams.append('pay_type', data.pay_type);
    queryParams.append('pay_year', data.pay_year);
    queryParams.append('payple_payer_id', data.payple_payer_id);
    queryParams.append('simple_flag', data.simple_flag);
    queryParams.append('work_type', data.work_type);

    setQueryParams(queryParams.toString());

    console.log(queryParams.toString());

    const unsubscribe = firestore()
      .collection('payment')
      .doc(data.order_num)
      .onSnapshot(documentSnapshot => {
        // 문서가 업데이트될 때 호출되는 콜백 함수
        if (documentSnapshot.exists) {
          // 문서가 존재하는 경우
          // setDocData(documentSnapshot.data());
          console.log('결제가 완료되었습니다. ===> ', documentSnapshot.data());
        } else {
          // 문서가 존재하지 않는 경우
          // setDocData(null);
        }
      });

    // 구독 해제 함수 반환
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView>
      <View style={[f_full, justify_center, align_center]}>
        <WebView
          source={{
            uri: 'https://dinnermate.kr/muggle_payment?' + queryParams,
            // uri: 'https://dinnermate.kr/muggle_payment_result',
          }} // 표시할 웹 페이지의 URL
          style={{width: Dimensions.get('window').width, height: 'auto'}}
        />
      </View>
    </SafeAreaView>
  );
}

export default WebViewPayment;
