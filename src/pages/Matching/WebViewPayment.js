import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, Text, View} from 'react-native';
import {align_center, f_full, justify_center} from '../../style/styles';
import WebView from 'react-native-webview';

function WebViewPayment({nacvigation, route}) {
  const {data} = route.params ? route.params : {data: null};
  const [queryParams, setQueryParams] = useState(null);

  useEffect(() => {
    console.log('data ===> ', data);

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
  }, []);

  return (
    <SafeAreaView>
      <View style={[f_full, justify_center, align_center]}>
        <WebView
          source={{
            uri: 'http://dinnermate.kr/order_confirm_view?' + queryParams,
          }} // 표시할 웹 페이지의 URL
          style={{width: Dimensions.get('window').width, height: 'auto'}}
        />
      </View>
    </SafeAreaView>
  );
}

export default WebViewPayment;
