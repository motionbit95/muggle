import React from 'react';
import {Dimensions, SafeAreaView, View} from 'react-native';
import Typography from '../../Component/Typography';
import {center, f_full} from '../../style/styles';

import WebView from 'react-native-webview';

function Kakao(props) {
  return (
    <SafeAreaView style={f_full}>
      <View
        style={[
          f_full,
          center,
          {
            position: 'absolute',
          },
        ]}>
        <Typography>카카오톡 채널 연결중...</Typography>
      </View>
      <View style={[f_full, center]}>
        <WebView
          source={{
            uri: 'https://pf.kakao.com/_AWeWG',
          }} // 표시할 웹 페이지의 URL
          style={{width: Dimensions.get('window').width, height: 'auto'}}
        />
      </View>
    </SafeAreaView>
  );
}

export default Kakao;
