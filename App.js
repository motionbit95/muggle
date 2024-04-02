/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
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
import Introduce from './src/pages/Account/Introduce';
import Profile from './src/pages/MyPage/Profile';
import ChatRoom from './src/pages/Chat/ChatRoom';

import GroupDetail from './src/pages/Main/GroupDetail';
import GroupCreate from './src/pages/Main/GroupCreate';
import MatchHistory from './src/pages/Matching/MatchHistory';
import MatchPayment from './src/pages/Matching/MatchPayment';
import {
  center,
  circle_30,
  circle_40,
  circle_50,
  img_sm,
  img_xs,
  radius_full,
  shadow_2xl,
  shadow_md,
  xs,
} from './src/style/styles';
import {primary_color} from './src/firebase/api';
import WebViewPayment from './src/pages/Matching/WebViewPayment';
import DirectRoom from './src/pages/Chat/DirectRoom';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  {
    /* 
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
            <Image
              style={{height: 26, width: 102}}
              source={require('./src/assets/icons/logo.png')}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => alert('알림 페이지 전달')}>
              <Image
                style={{width: 24, height: 24}}
                source={require('./src/assets/Notification.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="모임상세"
        component={GroupDetail}
        options={({navigation}) => ({
          title: '모임상세',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Muggle')}>
              <Image
                style={img_sm}
                source={require('./src/assets/icons/left_arrow.png')}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <HomeStack.Screen
        name="모임개설"
        component={GroupCreate}
        options={({navigation}) => ({
          title: '모임개설',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
    </HomeStack.Navigator>
  );

  const UserStackNavigate = () => (
    <UserStack.Navigator>
      <UserStack.Screen
        name="User"
        options={{headerShown: false}}
        component={User}
      />
      <UserStack.Screen name="프로필 편집" component={Profile} />
      <UserStack.Screen
        name="Account"
        component={SignUpStackNavigate}
        options={{headerShown: false}}
      />
    </UserStack.Navigator>
  );

  const ChatStackNavigate = () => (
    <ChatStack.Navigator>
      <ChatStack.Screen name="채팅" component={Chat} />
      <ChatStack.Screen
        name="채팅룸"
        component={ChatRoom}
        options={({navigation}) => ({
          title: '채팅룸',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('채팅')}>
              <Image
                style={img_sm}
                source={require('./src/assets/icons/left_arrow.png')}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <ChatStack.Screen
        name="매칭룸"
        component={DirectRoom}
        options={({navigation}) => ({
          title: '매칭룸',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('채팅')}>
              <Image
                style={img_sm}
                source={require('./src/assets/icons/left_arrow.png')}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
    </ChatStack.Navigator>
  );

  const MatchingStackNavigate = () => (
    <MatchingStack.Navigator>
      <MatchingStack.Screen name="매칭내역" component={MatchHistory} />
      <MatchingStack.Screen
        name="매칭중"
        component={MatchPayment}
        options={{headerShown: false}}
      />
      <MatchingStack.Screen
        name="결제"
        component={WebViewPayment}
        options={({navigation}) => ({
          headerShown: true,
          title: '결제',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('커피매칭신청', {screen: '매칭중'})
              }>
              <Image
                style={img_sm}
                source={require('./src/assets/icons/left_arrow.png')}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <MatchingStack.Screen
        name="커피매칭"
        component={Matching}
        options={({navigation}) => ({
          title: '',
          headerLeft: ({onPress}) => (
            <Image
              style={{height: 26, width: 102}}
              source={require('./src/assets/icons/logo.png')}
            />
            // <TouchableOpacity
            //   style={{marginLeft: 20}}
            //   onPress={() => alert('여긴 홈인데용!')}>
            // <Text
            //   style={[
            //     {
            //       color: 'black',
            //       marginLeft: 10,

            //       fontWeight: 'bold',
            //     },
            //     xs,
            //   ]}>
            //   MUGGLE
            // </Text>
            // </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => alert('알림 페이지 전달')}>
              <Image
                style={{width: 24, height: 24}}
                source={require('./src/assets/Notification.png')}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
    </MatchingStack.Navigator>
  );
  const SignUpStackNavigate = () => (
    <SignUpStack.Navigator>
      <SignUpStack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: '회원가입'}}
      />
      <SignUpStack.Screen name="휴대폰 본인인증" component={Certificate} />
      <SignUpStack.Screen name="프로필 설정" component={Interest} />
      <SignUpStack.Screen name="인트로" component={Introduce} />
    </SignUpStack.Navigator>
  );

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FF634F',
          unmountOnBlur: true,
          headerShown: false,
        }}>
        <Tab.Screen
          name="홈"
          component={HomeStackNavigate}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                style={{width: 26, height: 26}}
                source={
                  focused
                    ? require('./src/assets/navIcon/home_select.png')
                    : require('./src/assets/navIcon/home_unselect.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="커피매칭신청"
          component={MatchingStackNavigate}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                style={img_sm}
                source={
                  focused
                    ? require('./src/assets/navIcon/coffee_select.png')
                    : require('./src/assets/navIcon/coffee_unselect.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="모임생성"
          component={GroupCreate}
          options={{
            headerShown: true,
            tabBarLabel: '',

            tabBarIcon: ({focused}) => (
              <View style={{marginTop: 20}}>
                <View style={[center, radius_full, circle_40]}>
                  <Image
                    style={img_xs}
                    source={require('./src/assets/Plus.png')}
                  />
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatStackNavigate}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                style={img_sm}
                source={
                  focused
                    ? require('./src/assets/navIcon/chat_select.png')
                    : require('./src/assets/navIcon/chat_unselect.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="마이페이지"
          component={UserStackNavigate}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                style={img_sm}
                source={
                  focused
                    ? require('./src/assets/navIcon/user_select.png')
                    : require('./src/assets/navIcon/user_unselect.png')
                }
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
*/
  }

  // {
  //   /*
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const SignUpStack = createNativeStackNavigator();
  const PageStack = createNativeStackNavigator();

  const MyTab = () => (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF634F',
        unmountOnBlur: true,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Muggle"
        component={Home}
        options={{
          headerShown: true,
          title: 'Home',
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerBackVisible: false,
          headerTitle: '',
          headerLeft: ({onPress}) => (
            <Image
              style={{height: 26, width: 102, marginLeft: 10}}
              source={require('./src/assets/icons/logo.png')}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => alert('알림 페이지 전달')}>
              <Image
                style={{width: 24, height: 24}}
                source={require('./src/assets/Notification.png')}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              style={{width: 26, height: 26}}
              source={
                focused
                  ? require('./src/assets/navIcon/home_select.png')
                  : require('./src/assets/navIcon/home_unselect.png')
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="커피매칭신청"
        component={MatchHistory}
        options={{
          headerShown: true,
          tabBarIcon: ({focused}) => (
            <Image
              style={img_sm}
              source={
                focused
                  ? require('./src/assets/navIcon/coffee_select.png')
                  : require('./src/assets/navIcon/coffee_unselect.png')
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="모임생성"
        component={GroupCreate}
        options={{
          headerShown: true,
          tabBarLabel: '',

          tabBarIcon: ({focused}) => (
            <View style={{marginTop: 20}}>
              <View style={[center, radius_full, circle_40]}>
                <Image
                  style={img_xs}
                  source={require('./src/assets/Plus.png')}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: true,
          tabBarIcon: ({focused}) => (
            <Image
              style={img_sm}
              source={
                focused
                  ? require('./src/assets/navIcon/chat_select.png')
                  : require('./src/assets/navIcon/chat_unselect.png')
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={User}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={img_sm}
              source={
                focused
                  ? require('./src/assets/navIcon/user_select.png')
                  : require('./src/assets/navIcon/user_unselect.png')
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );

  const SignUpStackNavigate = () => (
    <SignUpStack.Navigator>
      <SignUpStack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: '회원가입'}}
      />
      <SignUpStack.Screen name="휴대폰 본인인증" component={Certificate} />
      <SignUpStack.Screen name="프로필 설정" component={Interest} />
      <SignUpStack.Screen name="인트로" component={Introduce} />
    </SignUpStack.Navigator>
  );

  const PageStackNavigate = () => (
    <PageStack.Navigator screenOptions={{headerShown: false}}>
      <PageStack.Screen name="매칭신청" component={Matching} />
      <PageStack.Screen name="프로필 편집" component={Profile} />
      <PageStack.Screen name="모임상세" component={GroupDetail} />
      <PageStack.Screen name="채팅룸" component={ChatRoom} />
      <PageStack.Screen name="매칭룸" component={DirectRoom} />
      <PageStack.Screen name="매칭중" component={MatchPayment} />
      <PageStack.Screen name="결제" component={WebViewPayment} />
    </PageStack.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="tab"
          component={MyTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpStackNavigate}
          options={{title: '회원가입'}}
        />
        <Stack.Screen
          name="Page"
          component={PageStackNavigate}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // */
  // }
};

export default App;
