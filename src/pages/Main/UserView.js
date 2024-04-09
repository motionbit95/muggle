import React, {useEffect} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {
  blackAlpha100,
  blackAlpha500,
  f_full,
  flex_column,
  flex_row,
  fs_lg,
  fs_md,
  fs_xl,
  img_lg,
  img_md,
  img_ml_2,
  p_1,
  p_3,
  radius_full,
  radius_sm,
  sp_2,
  sp_3,
} from '../../style/styles';
import {getDocList} from '../../firebase/firebase_func';
import {auth} from '../../firebase/firebase_config';
import GroupBox from '../../Component/GroupBox';

function UserView({navigation, route}) {
  const {data, userList} = route.params;
  const [groupList, setGroupList] = React.useState([]);

  useEffect(() => {
    // console.log(data);
    const getGroups = async () => {
      const groupList = [];
      await getDocList('group').then(res => {
        res.forEach(group => {
          group.group_users?.forEach(async uid => {
            // console.log(uid, data?.uid);
            if (uid === data?.uid) {
              console.log('gid ==>', group.doc_id);
              groupList.push(group);
            }
          });
        });
        console.log('groupList ==>', groupList);
        setGroupList(groupList);
      });
    };
    getGroups();
  }, []);
  return (
    <View style={[flex_column, {backgroundColor: 'white'}]}>
      <View style={[p_3, sp_3]}>
        <View style={[flex_row, sp_3]}>
          <View style={[img_ml_2, radius_full, {backgroundColor: '#d9d9d9'}]}>
            <Image
              source={
                data?.user_profile
                  ? {uri: data?.user_profile}
                  : require('../../assets/avartar.png')
              }
              style={img_ml_2}
            />
          </View>
          <View style={[flex_column, sp_2]}>
            <Text style={{fontSize: fs_xl, fontWeight: 'bold'}}>
              {data?.user_name}
            </Text>
            <Text style={{fontSize: fs_md, color: blackAlpha500}}>
              {data?.user_place} • {data?.user_birth.substring(0, 4)}.
              {data?.user_birth.substring(4, 6)}.
              {data?.user_birth.substring(6, 8)}
            </Text>
            <Text>{data?.user_info}</Text>
          </View>
        </View>
        <View style={[flex_row, sp_2]}>
          {data?.user_interest?.map((item, index) => (
            <View
              key={index}
              style={[
                p_1,
                radius_full,
                {backgroundColor: blackAlpha100, paddingHorizontal: 6},
              ]}>
              <Text key={index}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[p_3, {backgroundColor: '#f1f1f1'}]}>
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize: fs_lg, fontWeight: 'bold'}}>가입한 모임</Text>
        </View>
        <ScrollView>
          <ScrollView style={[f_full]}>
            {groupList?.map((item, index) => (
              // <Text key={index}>{item?.doc_id}</Text>
              <GroupBox
                key={index}
                userList={userList}
                index={index}
                item={item}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
}

export default UserView;
