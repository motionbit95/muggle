import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles, {
  align_center,
  btn_primary,
  f_full,
  flex_row,
  img_md,
  img_ml,
  img_ml_2,
  p_3,
  sp_2,
  sp_3,
  sp_4,
} from '../../style/styles';
import Typography from '../../Component/Typography';
import {getDocList} from '../../firebase/firebase_func';
import GroupBox from '../../Component/GroupBox';

function MatchingView({navigation, route}) {
  const {myInfo} = route.params ? route.params : {myInfo: null};
  const [order, setOrder] = useState(0);
  const [groupList, setGroupList] = React.useState([]);

  useEffect(() => {
    // console.log(data);
    const getGroups = async () => {
      const groupList = [];
      await getDocList('group').then(res => {
        res.forEach(
          group => group.group_type === '일상 모임' && groupList.push(group),
        );
        console.log('groupList ==>', groupList);
        setGroupList(groupList);
      });
    };
    getGroups();
  }, []);
  return (
    <View style={[f_full, p_3, sp_4, {backgroundColor: 'white'}]}>
      <View style={[flex_row, sp_2]}>
        <TouchableOpacity onPress={() => setOrder(0)}>
          <Typography light={order !== 0}>최신순</Typography>
        </TouchableOpacity>
        <Typography light>|</Typography>
        <TouchableOpacity onPress={() => setOrder(1)}>
          <Typography light={order !== 1}>가까운순</Typography>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {groupList?.map((item, index) => (
          <GroupBox
            key={index}
            // userList={userList}
            index={index}
            item={item}
            navigation={navigation}
            myInfo={myInfo}
          />
        ))}
      </ScrollView>
      <View style={[flex_row, align_center, sp_3]}>
        <TouchableOpacity
          style={[styles.button, {flex: 1}]}
          onPress={() =>
            navigation.navigate('일상모임생성', {data: {type: 'personal'}})
          }>
          <Typography size="lg" bold white>
            무료 일상 모임 만들기
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/menuIcon.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MatchingView;
