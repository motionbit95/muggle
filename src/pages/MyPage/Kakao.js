import React from 'react';
import {Dimensions, SafeAreaView, View} from 'react-native';
import Typography from '../../Component/Typography';
import {center, f_full} from '../../style/styles';

import WebView from 'react-native-webview';

function Kakao(props) {
  return (
    <SafeAreaView>
      <View style={[f_full, center]}>
        <WebView
          source={{
            uri: 'http://pf.kakao.com/_AWeWG',
          }} // 표시할 웹 페이지의 URL
          style={{width: Dimensions.get('window').width, height: 'auto'}}
        />
      </View>
    </SafeAreaView>
  );
}

export default Kakao;
