import * as React from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const renderTabBar = props => (
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

const FirstRoute = () => (
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
      onPress={() => alert('채팅하겠습니까')}>
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: 'red',
            borderRadius: 50,
          }}
        />
        <View>
          <Text>홍*경</Text>
          <Text>식사 어때?</Text>
        </View>
      </View>
      <Text>5분전</Text>
    </TouchableOpacity>
    <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}} />
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={() => alert('채팅하겠습니까')}>
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: 'red',
            borderRadius: 50,
          }}
        />
        <View>
          <Text>홍*경</Text>
          <Text>식사 어때?</Text>
        </View>
      </View>
      <Text>5분전</Text>
    </TouchableOpacity>
    <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}} />
  </View>
);

const SecondRoute = () => (
  <View>
    <View>
      <Text>Hello</Text>
    </View>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function Chat() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: '모임'},
    {key: 'second', title: '매칭'},
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
