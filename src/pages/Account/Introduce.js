import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  component_height,
  component_radius,
  primary_color,
  font_lg,
  font_md,
} from '../../firebase/api';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

const Intro1 = () => (
  <View style={{flex: 1, padding: 20, gap: 20}}>
    <View style={{alignItems: 'center', gap: 10}}>
      <Text style={{fontSize: 26, color: 'black', fontWeight: 'bold'}}>
        우리 동네, 밥 머글 사람?
      </Text>
    </View>
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize: 15, color: 'gray'}}>
        지역별로 식사 모임, 비즈니스 모임을
      </Text>
      <Text style={{fontSize: 15, color: 'gray'}}>
        참여하고 만들 수 있어요.
      </Text>
    </View>
  </View>
);

const Intro2 = () => (
  <View style={{flex: 1, padding: 20, gap: 20}}>
    <View style={{alignItems: 'center', gap: 10}}>
      <Text style={{fontSize: 26, color: 'black', fontWeight: 'bold'}}>
        새로운 이성과
      </Text>
      <Text style={{fontSize: 26, color: 'black', fontWeight: 'bold'}}>
        커피 한잔 어떠신가요?
      </Text>
    </View>
    <View style={{alignItems: 'center', gap: 10}}>
      <Text style={{fontSize: 15, color: 'gray'}}>
        내가 원하는 새로운 이성과
      </Text>
      <Text style={{fontSize: 15, color: 'gray'}}>
        오프라인 커피 매칭 시켜 드려요.
      </Text>
    </View>
    <Image
      source={require('../../assets/introimage1.png')}
      style={{
        width: '100%',
        height: 300,
        resizeMode: 'contain',
      }}
    />
    <View style={{alignItems: 'center', gap: 10}}>
      <Text style={{fontSize: 15, color: 'gray'}}>
        나의 매칭권 금액을 설정하고
      </Text>
      <Text style={{fontSize: 15, color: 'gray'}}>부수입을 만들어보세요.</Text>
    </View>
  </View>
);

const renderScene = SceneMap({
  1: Intro1,
  2: Intro2,
});

const Introduce = ({navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: '1', title: '인트로1'},
    {key: '2', title: '인트로2'},
  ]);

  const renderTabBar = props => (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
      }}>
      {props.navigationState.routes.map((route, i) => (
        <View
          key={route.key}
          style={{
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: index === i ? 30 : 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: index === i ? 'black' : '#ccc',
            }}
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.screenStyle}>
      <TabView
        renderScene={renderScene}
        onIndexChange={setIndex}
        navigationState={{index, routes}}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
        style={{flexDirection: 'column-reverse'}}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Introduce;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: primary_color,
    borderRadius: component_radius,
    height: component_height,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnBox: {
    flexDirection: 'column',
    gap: 10,
  },
  contentTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  contentText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(187, 187, 187, 1)',
  },
  contentBox: {
    borderColor: 'rgba(221, 221, 221, 1)',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    fontSize: font_md,
  },
});
