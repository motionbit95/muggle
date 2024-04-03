import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {align_center, f_full, justify_center} from '../../style/styles';
import {Dimensions, View} from 'react-native';

function Terms(props) {
  return (
    <SafeAreaView>
      <View style={[f_full, justify_center, align_center]}>
        <WebView
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/dinnermate-8d37b.appspot.com/o/files%2F%E1%84%86%E1%85%A5%E1%84%80%E1%85%B3%E1%86%AF%2B%E1%84%89%E1%85%A5%E1%84%87%E1%85%B5%E1%84%89%E1%85%B3%2B%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%80%E1%85%AA%E1%86%AB%2B%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%2B%E1%84%89%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%A6%2B%E1%84%87%E1%85%A9%E1%86%AB%2B240401.docx?alt=media&token=20c0dd2d-11af-4e71-8536-5f141f763983',
          }} // 표시할 웹 페이지의 URL
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default Terms;
