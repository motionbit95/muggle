import React, {useEffect} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {
  blackAlpha100,
  f_full,
  flex_column,
  flex_row,
  img_ml_2,
  p_1,
  p_3,
  radius_full,
  sp_2,
  sp_3,
} from '../../style/styles';
import {getDocList} from '../../firebase/firebase_func';
import GroupBox from '../../Component/GroupBox';
import Typography from '../../Component/Typography';

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
              style={[img_ml_2, radius_full]}
            />
          </View>
          <View style={[flex_column, sp_2]}>
            <Typography size="xl" bold>
              {data?.user_name}
            </Typography>
            <Typography light>
              {data?.user_place} • {data?.user_birth.substring(0, 4)}.
              {data?.user_birth.substring(4, 6)}.
              {data?.user_birth.substring(6, 8)}
            </Typography>
            <Typography>{data?.user_info}</Typography>
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
              <Typography key={index}>{item}</Typography>
            </View>
          ))}
        </View>
      </View>

      <View style={[p_3, {backgroundColor: '#f1f1f1'}]}>
        <View style={{marginBottom: 10}}>
          <Typography size="lg" bold>
            가입한 모임
          </Typography>
        </View>
        <ScrollView>
          <ScrollView style={[f_full]}>
            {groupList?.map((item, index) => (
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
