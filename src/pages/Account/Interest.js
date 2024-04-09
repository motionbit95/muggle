import React, {useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';

import {addDocument} from '../../firebase/firebase_func';
import styles, {
  blackAlpha50,
  center,
  p_2,
  radius_full,
} from '../../style/styles';
import ProfilePicker from '../../Component/ProfilePicker';
import Typography from '../../Component/Typography';
import {primary_color} from '../../firebase/api';
import MessageBox from '../../Component/MessageBox';

const Interest = ({navigation, route}) => {
  const {data} = route.params ? route.params : {data: null};
  const [message, setMessage] = useState({
    mode: '',
    isView: false,
    message: '',
  });
  const [interest, setInterest] = useState(null);

  const signupUser = () => {
    if (!data.user_profile) {
      setMessage({
        mode: 'error',
        isView: true,
        message: '프로필 사진을 등록하세요',
      });
      return;
    }

    if (!data.user_info) {
      setMessage({
        mode: 'error',
        isView: true,
        message: '소개말을 입력하세요.',
      });
      return;
    }

    if (!interest && interest?.length < 2) {
      setMessage({
        mode: 'error',
        isView: true,
        message: '관심사를 2개 이상 선택해주세요.',
      });
      return;
    }

    setMessage({
      mode: 'confirm',
      isView: true,
      message: '가입을 완료하시겠습니까?',
      type: 'success',
    });

    data.user_interest = interest;
    // console.log('data ===> ', data);
  };

  const handleInterest = content => {
    if (interest?.includes(content)) {
      setInterest(interest?.filter(item => item !== content));
    } else {
      setInterest([...interest, content]);
    }
  };
  return (
    <View style={styles.screenStyle}>
      {message.isView && (
        <MessageBox
          visible={message.isView}
          message={message.message}
          mode={message.mode}
          onCancel={() =>
            setMessage({mode: 'error', isView: false, message: ''})
          }
          onOK={() => {
            if (message.type === 'success') {
              addDocument('user', data);
              navigation.navigate('인트로');
            }
            setMessage({mode: 'error', isView: false, message: ''});
          }}
        />
      )}
      <ScrollView style={styles.scrollViewStyle}>
        <View style={[styles.contentStyle, {gap: 20}]}>
          <View
            style={{
              width: '100%',
              gap: 20,
            }}>
            <ProfilePicker
              onChangeValue={uri => {
                data.user_profile = uri;
              }}
            />
            <View style={styles.rowBox}>
              <View style={{flex: 1}}>
                <Typography size={'lg'} bold>
                  소개
                </Typography>
              </View>
              <TextInput
                onChange={e => (data.user_info = e.nativeEvent.text)}
                multiline
                style={[
                  {
                    color: 'black',
                    flex: 4,
                    height: 100,
                    textAlignVertical: 'top',
                  },
                  styles.contentBox,
                ]}
                placeholder="자기소개 내용을 입력해주세요"
              />
            </View>
          </View>
          <View style={styles.hr} />
          <View style={{flex: 1}}>
            <Typography size={'lg'} bold>
              관심사
            </Typography>
          </View>
          <View style={center}>
            <View
              style={{
                rowGap: 5,
                columnGap: 5,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {[
                '아웃도어/여행',
                '운동/스포츠',
                '인문학/책/글',
                '외국/언어',
                '문화/공연/축제',
                '음악/악기',
                '공예/만들기',
                '댄스/무용',
                '봉사활동',
                '사교/인맥',
                '차/오토바이',
                '사진/영상',
                '스포츠관람',
                '게임/오락',
                '요리/제조',
                '반려동물',
                '자기계발',
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    p_2,
                    radius_full,
                    {
                      backgroundColor: interest?.includes(item)
                        ? primary_color
                        : blackAlpha50,
                    },
                  ]}
                  onPress={() => handleInterest(item)}>
                  <Typography size={'md'}>{item}</Typography>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={signupUser}>
          <Typography size={'lg'} bold white>
            가입완료
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interest;
