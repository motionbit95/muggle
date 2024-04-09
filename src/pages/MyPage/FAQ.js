import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Typography from '../../Component/Typography';
import {
  align_center,
  align_start,
  f_full,
  flex_column,
  flex_row,
  img_lg,
  img_md,
  img_sm_2,
  img_xs,
  justify_between,
  p_4,
  p_5,
  radius_lg,
  shadow_lg,
  shadow_xs,
  sp_2,
  sp_4,
  w_full,
} from '../../style/styles';

function FAQ(props) {
  const [isView, setIsView] = useState(-1);
  return (
    <>
      <View style={[f_full, flex_column, p_4, sp_4]}>
        <Typography bold size="3xl">
          자주묻는질문
        </Typography>
        <ScrollView style={[f_full, flex_column, sp_4]}>
          <View
            style={[
              w_full,
              p_4,
              radius_lg,
              flex_column,
              align_center,
              justify_between,
              sp_2,
              {backgroundColor: 'white', marginBottom: 10},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setIsView(isView === 0 ? -1 : 0);
              }}>
              <View
                style={[
                  w_full,
                  radius_lg,
                  flex_row,
                  align_center,
                  justify_between,
                  {backgroundColor: 'white'},
                ]}>
                <View style={[flex_row, align_center]}>
                  <Image
                    style={img_md}
                    source={require('../../assets/icons/Q.png')}
                  />
                  <Typography bold size="lg">
                    머글은 어떤 서비스인가요?
                  </Typography>
                </View>
                <Image
                  style={img_xs}
                  source={
                    isView === 0
                      ? require('../../assets/BsChevronUp.png')
                      : require('../../assets/BsChevronDown.png')
                  }
                />
              </View>
            </TouchableOpacity>

            {isView === 0 && (
              <View style={[flex_row, align_start, p_4, sp_2]}>
                <Image
                  style={[img_md, {marginLeft: 2}]}
                  source={require('../../assets/icons/A.png')}
                />
                <Typography>
                  {`머글은 모임, 이성 매칭 2가지 카테고리로 운영되고 있으며 모임에는 식사모임, 원데이 클래스, 비지니스 모임으로 다양한 취미 및 정보 공유의 커뮤니티를 제공합니다.

이성 매칭은 오프라인 커피 이성 친구 매칭으로 남성유저의 경우 매칭권을 결제하여 마음에 드는 여성 유저에게 매칭 신청을 할 수 있는 시스템입니다.`}
                </Typography>
              </View>
            )}
          </View>
          <View
            style={[
              w_full,
              p_4,
              radius_lg,
              flex_column,
              align_center,
              justify_between,
              sp_2,
              {backgroundColor: 'white', marginBottom: 10},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setIsView(isView === 1 ? -1 : 1);
              }}>
              <View
                style={[
                  w_full,
                  radius_lg,
                  flex_row,
                  align_center,
                  justify_between,
                  {backgroundColor: 'white'},
                ]}>
                <View style={[flex_row, align_center]}>
                  <Image
                    style={img_md}
                    source={require('../../assets/icons/Q.png')}
                  />
                  <Typography bold size="lg">
                    머글의 모임방 입장은 무료인가요?
                  </Typography>
                </View>
                <Image
                  style={img_xs}
                  source={
                    isView === 1
                      ? require('../../assets/BsChevronUp.png')
                      : require('../../assets/BsChevronDown.png')
                  }
                />
              </View>
            </TouchableOpacity>

            {isView === 1 && (
              <View style={[flex_row, align_start, p_4, sp_2]}>
                <Image
                  style={[img_md, {marginLeft: 2}]}
                  source={require('../../assets/icons/A.png')}
                />
                <Typography>
                  {`네! 무료입니다. 현재 머글의 모든 모임 서비스 입장은 무료로 운영되고 있어요
단, 원데이 클래스 등의 회비는 개인적으로 부담하셔야합니다!

유료 서비스는 커피 이성친구 매칭 서비스이며 매칭 신청자(남성)는 금액을 지불하고 매칭 수락자(여성)은 수익을 창출하는 시스템입니다!`}
                </Typography>
              </View>
            )}
          </View>
          <View
            style={[
              w_full,
              p_4,
              radius_lg,
              flex_column,
              align_center,
              justify_between,
              sp_2,
              {backgroundColor: 'white', marginBottom: 10},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setIsView(isView === 2 ? -1 : 2);
              }}>
              <View
                style={[
                  w_full,
                  radius_lg,
                  flex_row,
                  align_center,
                  justify_between,
                  {backgroundColor: 'white'},
                ]}>
                <View style={[flex_row, align_center]}>
                  <Image
                    style={img_md}
                    source={require('../../assets/icons/Q.png')}
                  />
                  <Typography bold size="lg">
                    커피 이성친구 매칭 서비스는 무엇인가요?
                  </Typography>
                </View>
                <Image
                  style={img_xs}
                  source={
                    isView === 2
                      ? require('../../assets/BsChevronUp.png')
                      : require('../../assets/BsChevronDown.png')
                  }
                />
              </View>
            </TouchableOpacity>

            {isView === 2 && (
              <View style={[flex_row, align_start, p_4, sp_2]}>
                <Image
                  style={[img_md, {marginLeft: 2}]}
                  source={require('../../assets/icons/A.png')}
                />
                <Typography>
                  {`호감 가는 이성과 오프라인 커피 자리를 매칭해주는 서비스입니다.

여성 유저
1.내 커피 매칭권 금액 설정
(최소 2만원에서 최대20만원)
2. 남성 유저에게 매칭 신청 받기
3. 오프라인 커피 매칭 완료
4. 내가 설정한 매칭권 금액의 70% 수익 정산 신청

남성 유저
1.호감가는 여성 유저의 매칭권 금액 결제
2.여성 유저 승낙 시 앱채팅으로 약속 잡기
3. 오프라인 커피 매칭`}
                </Typography>
              </View>
            )}
          </View>
          <View
            style={[
              w_full,
              p_4,
              radius_lg,
              flex_column,
              align_center,
              justify_between,
              sp_2,
              {backgroundColor: 'white'},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setIsView(isView === 3 ? -1 : 3);
              }}>
              <View
                style={[
                  w_full,
                  radius_lg,
                  flex_row,
                  align_center,
                  justify_between,
                  {backgroundColor: 'white'},
                ]}>
                <View style={[flex_row, align_center]}>
                  <Image
                    style={img_md}
                    source={require('../../assets/icons/Q.png')}
                  />
                  <Typography bold size="lg">
                    커피 매칭 후 정산은 어떻게 이루어지나요?
                  </Typography>
                </View>
                <Image
                  style={img_xs}
                  source={
                    isView === 3
                      ? require('../../assets/BsChevronUp.png')
                      : require('../../assets/BsChevronDown.png')
                  }
                />
              </View>
            </TouchableOpacity>

            {isView === 3 && (
              <View style={[flex_row, align_start, p_4, sp_2]}>
                <Image
                  style={[img_md, {marginLeft: 2}]}
                  source={require('../../assets/icons/A.png')}
                />
                <Typography>
                  {`남성 유저에게 매칭 신청을 받고 커피 매칭을 완료한 여성 유저는 2영업일 내로 회원가입시 기재해주신 정산 계좌로 매칭권의 70%의 대금을 정산해드립니다!

회원가입시 계좌를 기입하지 않으셨다면 앱 내 마이페이지 프로필 수정에 계좌를 기재하여 주시고 마이페이지 - 정산 신청 해주시면 됩니다!`}
                </Typography>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default FAQ;
