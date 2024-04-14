import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Typography from '../../Component/Typography';
import {
  align_start,
  center,
  f_full,
  flex_row,
  p_1,
  p_2,
  p_3,
  sp_2,
  t_align_center,
  w_full,
} from '../../style/styles';
import {primary_color} from '../../firebase/api';
import {getDocList} from '../../firebase/firebase_func';
import GroupBox from '../../Component/GroupBox';
import MatchHistory from '../Matching/MatchHistory';

function MyActivity({navigation, route}) {
  const [tab, setTab] = useState(route.params.tab ? route.params.tab : 0);
  const [groupList, setGroupList] = useState([]);
  const {myInfo} = route.params ? route.params : {myInfo: null};

  const getGroups = async () => {
    const groupList = [];
    await getDocList('group').then(res => {
      res.forEach(group => groupList.push(group));
      setGroupList(groupList);
    });
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <View style={[f_full, {backgroundColor: 'white'}]}>
      <View
        style={[
          align_start,
          w_full,
          p_3,
          {paddingBottom: 0, backgroundColor: 'white'},
        ]}>
        <View style={[flex_row, sp_2]}>
          <TouchableOpacity
            style={[
              p_1,
              {
                flex: 1,
                borderBottomColor: tab === 0 ? primary_color : 'white',
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => {
              setTab(0);
            }}>
            <View style={[center]}>
              <Typography bold red={tab === 0} light={tab !== 0}>
                {'일상'}
              </Typography>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              p_1,
              {
                flex: 1,
                borderBottomColor: tab === 1 ? primary_color : 'white',
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => {
              setTab(1);
            }}>
            <View style={[center]}>
              <Typography bold red={tab === 1} light={tab !== 1}>
                {'커피'}
              </Typography>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              p_1,
              {
                flex: 1,
                borderBottomColor: tab === 2 ? primary_color : 'white',
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => {
              setTab(2);
            }}>
            <View style={[center]}>
              <Typography bold red={tab === 2} light={tab !== 2}>
                {'클래스'}
              </Typography>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {tab == 0 && (
        <ScrollView style={[w_full, p_3]}>
          {groupList?.map(
            (item, index) =>
              item?.group_users.includes(myInfo?.uid) &&
              item?.group_type === '일상 모임' && (
                <GroupBox
                  key={index}
                  // userList={userList}
                  index={index}
                  item={item}
                  navigation={navigation}
                  myInfo={myInfo}
                />
              ),
          )}
        </ScrollView>
      )}

      {tab == 1 && (
        <View style={{flex: 1}}>
          <MatchHistory navigation={navigation} myInfo={myInfo} />
        </View>
      )}

      {tab == 2 && (
        <ScrollView style={[w_full, p_3]}>
          {groupList?.map(
            (item, index) =>
              item?.group_users.includes(myInfo?.uid) &&
              item?.group_type === '원데이 클래스' && (
                <GroupBox
                  key={index}
                  // userList={userList}
                  index={index}
                  item={item}
                  navigation={navigation}
                  myInfo={myInfo}
                />
              ),
          )}
        </ScrollView>
      )}
    </View>
  );
}

export default MyActivity;
