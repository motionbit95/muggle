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
import Profile from './src/pages/Profile';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const Tab = createBottomTabNavigator();

  const HomeStack = createNativeStackNavigator();
  const UserStack = createNativeStackNavigator();
  const ChatStack = createNativeStackNavigator();
  const MatchingStack = createNativeStackNavigator();
  const SignUpStack = createNativeStackNavigator();

  const HomeStackNavigate = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerTintColor: '#ffffff',
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
      <HomeStack.Screen name="모임상세" component={MatchingForm} />
      <HomeStack.Screen name="커피매칭신청" component={Matching} />
    </HomeStack.Navigator>
  );

  const UserStackNavigate = () => (
    <UserStack.Navigator>
      <UserStack.Screen name="마이페이지" component={User} />
      <UserStack.Screen name="프로필 편집" component={Profile} />
      <UserStack.Screen name="매칭내역" component={MatchDetails} />
    </UserStack.Navigator>
  );

  const ChatStackNavigate = () => (
    <ChatStack.Navigator>
      <ChatStack.Screen name="Chat" component={Chat} />
    </ChatStack.Navigator>
  );

  const MatchingStackNavigate = () => (
    <MatchingStack.Navigator>
      <MatchingStack.Screen name="커피매칭" component={Matching} />
      <MatchingStack.Screen name="모임상세" component={MatchingForm} />
      <MatchingStack.Screen name="모임 개설" component={MatchCreate} />
      <MatchingStack.Screen name="매칭중" component={Match} />
    </MatchingStack.Navigator>
  );
  const SignUpStackNavigate = () => (
    <SignUpStack.Navigator>
      <SignUpStack.Screen name="회원가입" component={SignUp} />
      <SignUpStack.Screen name="휴대폰 본인인증" component={Certificate} />
      <SignUpStack.Screen name="관심사 선택" component={Interest} />
      <SignUpStack.Screen name="상세 관심사 선택" component={Interest2} />
      <SignUpStack.Screen name="인트로" component={Introduce} />
    </SignUpStack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStackNavigate}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="커피매칭신청"
          component={MatchingStackNavigate}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Chat"
          component={ChatStackNavigate}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="마이페이지"
          component={UserStackNavigate}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="회원가입"
          component={SignUpStackNavigate}
          options={{headerShown: false}}
        />
        <Tab.Screen name="모임 개설" component={MatchCreate} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
