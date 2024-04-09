/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
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
  align_center,
  center,
  circle_30,
  circle_40,
  circle_50,
  f_full,
  flex_column,
  flex_row,
  fs_sm,
  fs_xs,
  img_sm,
  img_xs,
  justify_around,
  justify_between,
  justify_center,
  p_2,
  p_3,
  radius_full,
  sp_1,
  xs,
} from './src/style/styles';
import {primary_color} from './src/firebase/api';
import WebViewPayment from './src/pages/Matching/WebViewPayment';
import DirectRoom from './src/pages/Chat/DirectRoom';
import {getDocList} from './src/firebase/firebase_func';
import GroupView from './src/pages/Main/GroupView';
import Typography from './src/Component/Typography';
import Alarm from './src/pages/MyPage/Alarm';
import UserView from './src/pages/Main/UserView';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const tabBarSelectIcon = [
    require('./src/assets/navIcon/home_select.png'),
    require('./src/assets/navIcon/user_select.png'),
    require('./src/assets/Plus.png'),
    require('./src/assets/navIcon/chat_select.png'),
    require('./src/assets/navIcon/user_select.png'),
  ];

  const tabBarIcon = [
    require('./src/assets/navIcon/home_unselect.png'),
    require('./src/assets/navIcon/user_unselect.png'),
    require('./src/assets/Plus.png'),
    require('./src/assets/navIcon/chat_unselect.png'),
    require('./src/assets/navIcon/user_unselect.png'),
  ];

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
              style={{height: 79.61 * 0.25, width: 515.92 * 0.25}}
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
        name="모임리스트"
        component={GroupView}
        options={({navigation}) => ({
          title: '모임리스트',
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
      <HomeStack.Screen
        name="유저"
        component={UserView}
        options={({navigation}) => ({
          title: '유저',
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
      <UserStack.Screen name="알림" component={Alarm} />
    </UserStack.Navigator>
  );

  const ChatStackNavigate = () => (
    <ChatStack.Navigator>
      <ChatStack.Screen name="채팅방" component={Chat} />
      <ChatStack.Screen
        name="채팅룸"
        component={ChatRoom}
        options={({navigation}) => ({
          title: '채팅룸',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('채팅방')}>
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
      <MatchingStack.Screen
        name="커피친구"
        component={Matching}
        options={({navigation}) => ({
          title: '',
          headerLeft: ({onPress}) => (
            <Image
              style={{height: 79.61 * 0.25, width: 515.92 * 0.25}}
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
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
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

  const CustomTabBar = ({state, descriptors, navigation}) => {
    return (
      <SafeAreaView>
        <View style={styles.tabContainer}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[{flex: 1}, center]}
                key={index}>
                <View
                  style={
                    index === 2
                      ? [center, radius_full, circle_40, p_2]
                      : [styles.tabItem, sp_1]
                  }>
                  <Image
                    style={{width: 20, height: 20}}
                    source={
                      isFocused ? tabBarSelectIcon[index] : tabBarIcon[index]
                    }
                  />
                  {label && (
                    <Typography
                      size={'sm'}
                      style={{
                        color: isFocused ? primary_color : '#8c8c8c',
                      }}>
                      {label}
                    </Typography>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabContainer: {
      flexDirection: 'row',
      // height: 60,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#f1f1f1',
      backgroundColor: '#fff',
    },
    tabItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="모임"
          component={HomeStackNavigate}
          options={{
            tabBarActiveTintColor: '#FF634F',
            headerShown: false,
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
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="매칭"
          component={MatchingStackNavigate}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#FF634F',
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="모임생성"
          component={GroupCreate}
          options={{
            tabBarLabel: '',
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="채팅"
          component={ChatStackNavigate}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#FF634F',
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="마이"
          component={UserStackNavigate}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#FF634F',
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
