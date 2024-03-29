import * as React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styles from '../../style/styles';

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

  const ClassRoute = () => {
    return (
      // 모임 채팅방 목록
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
            navigation.navigate('Chat', {
              screen: '채팅룸',
              // params: {key: 'value'},
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
      </View>
    );
  };

  const MatchingRoute = () => {
    return (
      // 매칭 채팅방 목록
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
            navigation.navigate('Chat', {
              screen: '채팅룸',
              // params: {key: 'value'},
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
