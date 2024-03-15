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
import MeetingForm from './src/pages/MeetingForm';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Matching from './src/pages/Matching';
import Match from './src/pages/Match';
import SignUp from './src/pages/Signup';
import Certificate from './src/pages/\bCertificate';

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
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
        <Tab.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="마이페이지" component={User} />
        <Tab.Screen name="모임" component={MeetingForm} />
        <Tab.Screen name="커피매칭신청" component={Matching} />
        <Tab.Screen name="매칭중" component={Match} />
        <Tab.Screen name="회원가입" component={SignUp} />
        <Tab.Screen name="휴대폰 본인인증" component={Certificate} />
      </Tab.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <StackNavigation />
    //   <TabNavigation />
    // </NavigationContainer>
  );
};

// const StackNavigation = () => {
//   <Stack.Navigator>

//   </Stack.Navigator>
// }

// const TabNavigation = () => {
//   <Tab.Navigator>

//   </Tab.Navigator>
// }

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
