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
import Login from './src/pages/Login';
import User from './src/pages/User';
import Chat from './src/pages/Chat';
import MeetingForm from './src/Component/MeetingForm';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Matching from './src/Component/Matching';
import Match from './src/pages/Match';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
            headerStyle: {
              backgroundColor: '#29b6f6',
            },
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
                style={{padding: 10}}
                onPress={() => alert('여긴 홈인데용!')}>
                <Text style={{fontSize: 20}}>MUGGLE</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{padding: 10}}
                onPress={() => alert('알림!')}>
                <Text>알림</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="마이페이지" component={User} />
        <Tab.Screen name="비즈니스모임" component={MeetingForm} />
        <Tab.Screen name="커피매칭신청" component={Matching} />
        <Tab.Screen name="매칭중" component={Match} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
