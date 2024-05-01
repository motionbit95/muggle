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
import {
  getDocList,
  getDocument,
  getUser,
  getUserName,
  singleQuery,
  userGroups,
} from '../../firebase/firebase_func';
import auth from '@react-native-firebase/auth';
import {
  compareTimestampWithCurrentTime,
  formatDateTime,
  primary_color,
} from '../../firebase/api';
import Typography from '../../Component/Typography';

const DmBox = ({navigation, data}) => {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    getUser(
      data?.receiver === auth().currentUser.uid ? data?.sender : data?.receiver,
    ).then(data => {
      // console.log(data);
      setUser(data);
    });
  }, []);

  return (
    <View>
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
          navigation.navigate('채팅', {
            screen: '매칭룸',
            params: {data},
          })
        }>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <View>
            {/* <View style={styles.Avartar50}> */}
            <Image
              style={styles.Avartar50}
              source={
                user?.user_profile
                  ? {uri: user?.user_profile}
                  : require('../../assets/avartar.png')
              }
            />
            {/* </View> */}
          </View>
          <View>
            <Typography>{user?.user_name}</Typography>
            <Typography>{data?.last_message}</Typography>
          </View>
        </View>
        <Typography>
          {compareTimestampWithCurrentTime(data?.timestamp)}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const ChatTabBar = props => (
  <TabBar
    {...props}
    getLabelText={({route}) => route.title}
    indicatorStyle={{backgroundColor: 'red'}}
    renderLabel={({route, focused}) => (
      <Typography red={focused} style={{margin: 8}}>
        {route.title}
      </Typography>
    )}
    style={{backgroundColor: 'white'}}
  />
);

const Chat = ({navigation}) => {
  const layout = useWindowDimensions();
  const [groups, setGroups] = React.useState([]);
  const [matchings, setMatchings] = React.useState([]);
  const [dmList, setDmList] = React.useState([]);
  React.useEffect(() => {
    const getUserGroups = async () => {
      await userGroups(auth().currentUser.uid).then(res => {
        setGroups(res);
      });
    };

    const getUserMatchings = async () => {
      let sendMatching = [];
      await singleQuery('matching', 'sender', auth().currentUser.uid).then(
        res => {
          sendMatching = res;
        },
      );

      let receiveMatching = [];
      await singleQuery('matching', 'receiver', auth().currentUser.uid).then(
        res => {
          receiveMatching = res;
        },
      );

      let matchings = [...sendMatching, ...receiveMatching].sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        return 0;
      });
      setMatchings(matchings);

      let dmList = [];
      matchings.forEach(async matching => {
        await getDocument(`message-${matching.doc_id}`, 'chat_info').then(
          res => {
            dmList.push(res);
            setDmList(dmList);
          },
        );
      });
    };

    getUserMatchings();
    getUserGroups();
  }, []);

  const ChoreRoute = () => {
    return (
      // 모임 채팅방 목록
      <View style={[f_full]}>
        {groups?.length === 0 && (
          <View style={[f_full, center, flex_row, sp_2]}>
            <Typography light>채팅 내역이 없어요</Typography>
            <Image
              style={img_sm}
              source={require('../../assets/icons/BsChat.png')}
            />
          </View>
        )}
        {groups?.map(
          (group, index) =>
            group.group_type === '일상 모임' && (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                // onPress={() => alert('채팅하겠습니까')}
                onPress={() => {
                  navigation.navigate('채팅', {
                    screen: '채팅룸',
                    params: {
                      data: {
                        ...group,
                        group:
                          group.group_type === '일상 모임'
                            ? group?.doc_id +
                              '_' +
                              auth().currentUser.uid +
                              '_' +
                              group?.group_admin
                            : group.doc_id,
                      },
                    },
                  });
                }}>
                <View
                  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                  <View>
                    <View style={styles.Avartar50}>
                      <Image
                        style={[f_full, radius_full]}
                        source={
                          group
                            ? {uri: group?.group_image}
                            : require('../../assets/avartar.png')
                        }
                      />
                    </View>
                  </View>
                  <View style={sp_1}>
                    <Typography size="md" bold>
                      {group?.group_name}
                    </Typography>
                    {/* <Typography light>{group?.group_place}</Typography> */}
                  </View>
                </View>
                {/* <View style={flex_row}>
                  <Typography red bold>
                    {group?.group_users.length}{' '}
                  </Typography>
                  <Typography>/ {group?.group_personnel}</Typography>
                </View> */}
              </TouchableOpacity>
            ),
        )}
      </View>
    );
  };

  const ClassRoute = () => {
    return (
      // 모임 채팅방 목록
      <View style={[f_full]}>
        {groups?.length === 0 && (
          <View style={[f_full, center, flex_row, sp_2]}>
            <Typography light>채팅 내역이 없어요</Typography>
            <Image
              style={img_sm}
              source={require('../../assets/icons/BsChat.png')}
            />
          </View>
        )}
        {groups?.map(
          (group, index) =>
            group.group_type === '원데이 클래스' && (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                // onPress={() => alert('채팅하겠습니까')}
                onPress={() => {
                  navigation.navigate('채팅', {
                    screen: '채팅룸',
                    params: {
                      data: {
                        ...group,
                        group:
                          group.group_type === '일상 모임'
                            ? group?.doc_id +
                              '_' +
                              auth().currentUser.uid +
                              '_' +
                              group?.group_admin
                            : group.doc_id,
                      },
                    },
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    width: '80%',
                  }}>
                  <View>
                    <View style={styles.Avartar50}>
                      <Image
                        style={[f_full, radius_full]}
                        source={
                          group
                            ? {uri: group?.group_image}
                            : require('../../assets/avartar.png')
                        }
                      />
                    </View>
                  </View>
                  <View style={[sp_1, {width: '80%'}]}>
                    <Typography size="md" bold numberOfLines={1}>
                      {group?.group_name}
                    </Typography>
                    <Typography light>
                      {formatDateTime(group?.group_time)}
                    </Typography>
                  </View>
                </View>
                <View style={[flex_row, {width: '10%'}]}>
                  <Typography red bold>
                    {group?.group_users.length}{' '}
                  </Typography>
                  <Typography>/ {group?.group_personnel}</Typography>
                </View>
              </TouchableOpacity>
            ),
        )}
      </View>
    );
  };

  const MatchingRoute = () => {
    return (
      // 매칭 채팅방 목록
      <View style={[f_full]}>
        {matchings?.length === 0 && (
          <View style={[f_full, flex_row, center, sp_2]}>
            <Typography light>채팅 내역이 없어요</Typography>
            <Image
              style={img_sm}
              source={require('../../assets/icons/BsChat.png')}
            />
          </View>
        )}
        {dmList?.map((dm, index) => (
          <DmBox key={index} navigation={navigation} data={dm} />
        ))}
      </View>
    );
  };

  const renderScene = SceneMap({
    Chore: ChoreRoute,
    Matching: MatchingRoute,
    Class: ClassRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Chore', title: '일상'},
    {key: 'Matching', title: '커피'},
    {key: 'Class', title: '모임'},
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
