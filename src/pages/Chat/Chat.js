import * as React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styles, {
  blackAlpha500,
  blackAlpha900,
  center,
  f_full,
  flex_row,
  fw_bold,
  img_sm,
  radius_full,
  sp_1,
  sp_2,
} from '../../style/styles';
import {singleQuery, userGroups} from '../../firebase/firebase_func';
import auth from '@react-native-firebase/auth';
import {formatDateTime, primary_color} from '../../firebase/api';

const ChatTabBar = props => (
  <TabBar
    {...props}
    getLabelText={({route}) => route.title}
    indicatorStyle={{backgroundColor: 'red'}}
    renderLabel={({route, focused}) => (
      <Text style={{color: focused ? 'red' : 'gray', margin: 8}}>
        {route.title}
      </Text>
    )}
    style={{backgroundColor: 'white'}}
  />
);

const Chat = ({navigation}) => {
  const layout = useWindowDimensions();
  const [groups, setGroups] = React.useState([]);
  React.useEffect(() => {
    const getUserGroups = async () => {
      await userGroups(auth().currentUser.uid).then(res => {
        setGroups(res);
      });
    };
    getUserGroups();
  }, []);

  const ClassRoute = () => {
    return (
      // 모임 채팅방 목록
      <View style={[f_full]}>
        {groups?.length === 0 && (
          <View style={[f_full, center, flex_row, sp_2]}>
            <Text style={{color: blackAlpha500}}>채팅 내역이 없어요</Text>
            <Image
              style={img_sm}
              source={require('../../assets/icons/BsChat.png')}
            />
          </View>
        )}
        {groups?.map((group, index) => (
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 20,
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            // onPress={() => alert('채팅하겠습니까')}
            onPress={() =>
              navigation.navigate('Chat', {
                screen: '채팅룸',
                params: {data: {...group, group: group.doc_id}},
              })
            }>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <View>
                <View style={styles.Avartar50}>
                  <Image
                    style={[f_full, radius_full]}
                    source={require('../../assets/avartar.png')}
                  />
                </View>
              </View>
              <View style={sp_1}>
                <Text style={{color: blackAlpha900, fontWeight: fw_bold}}>
                  {group?.group_name}
                </Text>
                <Text style={{color: blackAlpha500}}>
                  {formatDateTime(group?.group_time)}
                </Text>
              </View>
            </View>
            <View style={flex_row}>
              <Text
                style={{
                  color: blackAlpha900,
                  fontWeight: fw_bold,
                  color: primary_color,
                }}>
                {group?.group_users.length}{' '}
              </Text>
              <Text style={{color: blackAlpha900}}>
                / {group?.group_personnel}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const MatchingRoute = () => {
    return (
      // 매칭 채팅방 목록
      <View style={[f_full]}>
        <View style={[f_full, flex_row, center, sp_2]}>
          <Text style={{color: blackAlpha500}}>채팅 내역이 없어요</Text>
          <Image
            style={img_sm}
            source={require('../../assets/icons/BsChat.png')}
          />
        </View>
        {/* <View>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 20,
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            // onPress={() => alert('채팅하겠습니까')}
            onPress={() =>
              navigation.navigate('Chat', {
                screen: '채팅룸',
              })
            }>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <View>
                <View style={styles.Avartar50}>
                  <Image
                    style={{width: '90%', height: '90%'}}
                    source={require('../../assets/avartar.png')}
                  />
                </View>
              </View>
              <View>
                <Text style={{color: 'black'}}>홍*경</Text>
                <Text style={{color: 'black'}}>식사 어때?</Text>
              </View>
            </View>
            <Text style={{color: 'black'}}>5분전</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  const renderScene = SceneMap({
    Class: ClassRoute,
    Matching: MatchingRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Class', title: '모임'},
    {key: 'Matching', title: '매칭'},
  ]);

  return (
    <TabView
      renderTabBar={ChatTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default Chat;
