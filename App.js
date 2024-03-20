/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Image,
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
import Home from './src/pages/Main/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import User from './src/pages/MyPage/User';
import Chat from './src/pages/Chat/Chat';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Matching from './src/pages/Matching/Matching';
import SignUp from './src/pages/Account/Signup';
import Certificate from './src/pages/Account/Certificate';
import Interest from './src/pages/Account/Interest';
import Interest2 from './src/pages/Account/Interest2';
import Introduce from './src/pages/Account/Introduce';
import Profile from './src/pages/MyPage/Profile';
import ChatRoom from './src/pages/Chat/ChatRoom';

import GroupDetail from './src/pages/Main/GroupDetail';
import GroupCreate from './src/pages/Main/GroupCreate';
import MatchHistory from './src/pages/Matching/MatchHistory';
import MatchPayment from './src/pages/Matching/MatchPayment';

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
        name="Muggle"
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
      <HomeStack.Screen name="모임상세" component={GroupDetail} />
      <HomeStack.Screen name="모임개설" component={GroupCreate} />
    </HomeStack.Navigator>
  );

  const UserStackNavigate = () => (
    <UserStack.Navigator>
      <UserStack.Screen name="User" component={User} />
      <UserStack.Screen name="프로필 편집" component={Profile} />
      <UserStack.Screen name="매칭내역" component={MatchHistory} />
    </UserStack.Navigator>
  );

  const ChatStackNavigate = () => (
    <ChatStack.Navigator>
      <ChatStack.Screen name="채팅" component={Chat} />
      <ChatStack.Screen name="채팅룸" component={ChatRoom} />
    </ChatStack.Navigator>
  );

  const MatchingStackNavigate = () => (
    <MatchingStack.Navigator>
      <MatchingStack.Screen name="커피매칭" component={Matching} />
      <MatchingStack.Screen name="매칭중" component={MatchPayment} />
    </MatchingStack.Navigator>
  );
  const SignUpStackNavigate = () => (
    <SignUpStack.Navigator>
      <SignUpStack.Screen name="SignUp" component={SignUp} />
      <SignUpStack.Screen name="휴대폰 본인인증" component={Certificate} />
      <SignUpStack.Screen name="관심사 선택" component={Interest} />
      <SignUpStack.Screen name="상세 관심사 선택" component={Interest2} />
      <SignUpStack.Screen name="인트로" component={Introduce} />
    </SignUpStack.Navigator>
  );

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStackNavigate}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image source={require('./src/assets/home.png')} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="커피매칭신청"
          component={MatchingStackNavigate}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image source={require('./src/assets/CoffeeBlack.png')} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatStackNavigate}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image source={require('./src/assets/Chat.png')} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="마이페이지"
          component={UserStackNavigate}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image source={require('./src/assets/mypage.png')} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Account"
          component={SignUpStackNavigate}
          options={{headerShown: false}}
        />
        <Tab.Screen name="채팅룸" component={ChatRoom} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
