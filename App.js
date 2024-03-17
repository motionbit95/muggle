/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/pages/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import User from './src/pages/User';
import Chat from './src/pages/Chat';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Matching from './src/pages/Matching';
import Match from './src/pages/Match';
import SignUp from './src/pages/Signup';
import Certificate from './src/pages/Certificate';
import MatchCreate from './src/pages/MatchCreate';
import MatchingForm from './src/pages/MatchingForm';
import Interest from './src/pages/Interest';
import Interest2 from './src/pages/Interest2';
import Introduce from './src/pages/Introduce';
import MatchDetails from './src/pages/MatchDetails';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            // Header 블록에 대한 스타일
            // headerStyle: {
            //   backgroundColor: '#29b6f6',
            // },
            // Header의 텍스트, 버튼 색상
            headerTintColor: '#ffffff',
            // 타이틀 텍스트의 스타일
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerBackVisible: false,
            headerTitle: '',
            headerLeft: ({onPress}) => (
              <TouchableOpacity
                style={{marginLeft: 20}}
                onPress={() => alert('여긴 홈인데용!')}>
                <Text style={{fontSize: 20}}>MUGGLE</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => alert('알림!')}>
                <Text>알림</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="마이페이지" component={User} />
        <Tab.Screen name="모임상세" component={MatchingForm} />
        <Tab.Screen name="커피매칭신청" component={Matching} />
        <Tab.Screen name="매칭중" component={Match} />
        <Tab.Screen name="회원가입" component={SignUp} />
        <Tab.Screen name="휴대폰 본인인증" component={Certificate} />
        <Tab.Screen name="모임 개설" component={MatchCreate} />
        <Tab.Screen name="관심사 선택" component={Interest} />
        <Tab.Screen name="상세 관심사 선택" component={Interest2} />
        <Tab.Screen name="인트로" component={Introduce} />
        <Tab.Screen name="매칭내역" component={MatchDetails} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
