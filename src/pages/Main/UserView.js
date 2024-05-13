import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles, {
  align_end,
  blackAlpha100,
  blackAlpha400,
  f_full,
  flex_column,
  flex_row,
  font_family,
  img_ml_2,
  img_sm,
  justify_around,
  justify_between,
  justify_end,
  p_1,
  p_3,
  p_6,
  radius_full,
  sp_2,
  sp_3,
  sp_6,
  w_full,
} from '../../style/styles';
import {addDocument, getDocList} from '../../firebase/firebase_func';
import GroupBox from '../../Component/GroupBox';
import Typography from '../../Component/Typography';

function UserView({navigation, route}) {
  const [openAlert, setOpenAlert] = useState(false);
  const [reportText, setReportText] = useState('');

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
              // console.log('gid ==>', group.doc_id);
              groupList.push(group);
            }
          });
        });
        // console.log('groupList ==>', groupList);
        setGroupList(groupList);
      });
    };
    getGroups();
  }, []);

  const addReort = async () => {
    addDocument('report', {
      gid: data?.doc_id,
      uid: auth().currentUser.uid,
      createAt: new Date(),
      description: reportText,
    });
  };

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
          <View style={[{flex: 1}, flex_column, sp_2]}>
            <View style={[flex_row, justify_between]}>
              <Typography size="xl" bold>
                {data?.user_name}
              </Typography>
              <TouchableOpacity onPress={() => setOpenAlert(true)}>
                <Typography light>신고하기</Typography>
              </TouchableOpacity>
            </View>

            <Modal
              visible={openAlert}
              animationType="fade"
              transparent={true}
              style={styles.dropdown}>
              <View
                style={[
                  w_full,
                  align_end,
                  justify_end,
                  {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'},
                ]}>
                <View
                  style={[
                    w_full,
                    flex_column,
                    justify_end,
                    align_end,
                    p_6,
                    {
                      backgroundColor: 'white',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    },
                  ]}>
                  <TouchableOpacity onPress={() => setOpenAlert(false)}>
                    <Image
                      source={require('../../assets/icons/_x.png')}
                      style={[img_sm, {opacity: 0.5}]}
                    />
                  </TouchableOpacity>

                  <View style={[w_full, sp_6]}>
                    <Typography size="xl" bold>
                      신고내용을 기재해주세요.
                    </Typography>
                    <TextInput
                      placeholderTextColor={blackAlpha400}
                      onChange={e => setReportText(e.nativeEvent.text)}
                      multiline
                      style={[
                        {
                          fontFamily: font_family,
                          color: 'black',
                          height: 100,
                          textAlignVertical: 'top',
                        },
                        styles.contentBox,
                      ]}
                      placeholder="허위신고시 이용이 제한될 수 있습니다."
                    />

                    <View
                      style={[
                        flex_row,
                        w_full,
                        justify_around,
                        {paddingHorizontal: 20},
                      ]}>
                      <TouchableOpacity onPress={() => setOpenAlert(false)}>
                        <Typography size="md">취소</Typography>
                      </TouchableOpacity>
                      <Typography light>|</Typography>

                      <TouchableOpacity
                        onPress={() => {
                          addReort();
                          setOpenAlert(false);
                          // setMessage({
                          //   mode: '',
                          //   isView: true,
                          //   message: '신고가 접수되었습니다.',
                          //   type: '',
                          // });
                        }}>
                        <Typography size="md">확인</Typography>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
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
      {/* 
      <Modal
        visible={openAlert}
        animationType="fade"
        transparent={true}
        style={styles.dropdown}>
        <View
          style={[
            w_full,
            align_end,
            justify_end,
            {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'},
          ]}>
          <View
            style={[
              w_full,
              flex_column,
              justify_end,
              align_end,
              p_6,
              {
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
            ]}>
            <TouchableOpacity onPress={() => setOpenAlert(false)}>
              <Image
                source={require('../../assets/icons/_x.png')}
                style={[img_sm, {opacity: 0.5}]}
              />
            </TouchableOpacity>

            <View style={[w_full, sp_6]}>
              <Typography size="xl" bold>
                신고내용을 기재해주세요.
              </Typography>
              <TextInput
                placeholderTextColor={blackAlpha400}
                onChange={e => setReportText(e.nativeEvent.text)}
                multiline
                style={[
                  {
                    fontFamily: font_family,
                    color: 'black',
                    height: 100,
                    textAlignVertical: 'top',
                  },
                  styles.contentBox,
                ]}
                placeholder="허위신고시 이용이 제한될 수 있습니다."
              />

              <View
                style={[
                  flex_row,
                  w_full,
                  justify_around,
                  {paddingHorizontal: 20},
                ]}>
                <TouchableOpacity onPress={() => setOpenAlert(false)}>
                  <Typography size="md">취소</Typography>
                </TouchableOpacity>
                <Typography light>|</Typography>

                <TouchableOpacity
                  onPress={() => {
                    addReort();
                    setOpenAlert(false);
                    setMessage({
                      mode: '',
                      isView: true,
                      message: '신고가 접수되었습니다.',
                      type: '',
                    });
                  }}>
                  <Typography size="md">확인</Typography>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal> */}

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
