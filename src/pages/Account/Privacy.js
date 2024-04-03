import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {align_center, f_full, justify_center} from '../../style/styles';
import {Dimensions, View} from 'react-native';

function Privacy(props) {
  return (
    <SafeAreaView style={[f_full, {backgroundColor: 'white'}]}>
      <View style={[f_full, justify_center, align_center]}>
        <WebView
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/dinnermate-8d37b.appspot.com/o/files%2F%E1%84%86%E1%85%A5%E1%84%80%E1%85%B3%E1%86%AF%2B%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5%E1%84%87%E1%85%A1%E1%86%BC%E1%84%8E%E1%85%B5%E1%86%B7%2B%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%2B%E1%84%89%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%A6%E1%84%87%E1%85%A9%E1%86%AB%2B240401.docx?alt=media&token=c88e43c5-af85-4184-8504-9b54b7d81ae3',
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

export default Privacy;
