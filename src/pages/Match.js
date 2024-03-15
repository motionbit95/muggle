import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';
class Match extends Component {
  render() {
    return (
      <View style={styles.screenStyle}>
        <ScrollView style={{width: '100%'}}>
          <View>
            <View
              style={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'red',
                padding: 50,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
                  새로운 이성과
                </Text>
                <Text
                  style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
                  커피 한잔 어떠신가요?
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: 'white'}}>
                  매칭권 결제 후 앱채팅으로
                </Text>
                <Text style={{fontSize: 18, color: 'white'}}>
                  오프라인 커피 약속을 잡고 만나보세요.
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  width: 'auto',
                  height: 270,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                  gap: 30,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'red',
                    alignItems: 'center',
                    gap: 10,
                    padding: 5,
                  }}>
                  <Text style={{color: 'white'}}>오프라인 커피 매칭권</Text>
                </View>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: 'red',
                    borderRadius: 50,
                  }}
                />
                <View style={{alignItems: 'center', gap: 10}}>
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 99, 79, 0.1)',
                      borderRadius: 10,
                      flexDirection: 'row',
                      gap: 5,
                      padding: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{width: 14, height: 14, backgroundColor: 'red'}}
                    />
                    <Text style={{color: 'rgba(255, 99, 79, 1)'}}>
                      매칭권 금액 5만원
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 99, 79, 0.1)',
                      borderRadius: 10,
                      flexDirection: 'row',
                      gap: 10,
                      padding: 5,
                    }}>
                    <View
                      style={{width: 14, height: 14, backgroundColor: 'red'}}
                    />
                    <Text style={{color: 'rgba(255, 99, 79, 1)'}}>
                      채팅 미응답 시 전액 환불
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={{padding: 20}}>
                <Text>매칭신청자가 지불한 매칭금액은</Text>
                <Text>매칭 수락자에게 부수입으로 정산됩니다!</Text>
              </View>
              <View style={{padding: 20, gap: 10, backgroundColor: '#f1f1f1'}}>
                <Text>매칭 신청자</Text>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    padding: 20,
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(255, 99, 79, 0.1)',
                    borderRadius: 20,
                  }}>
                  <View style={{alignItems: 'center', gap: 10}}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                        borderRadius: 50,
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: 'white',
                        }}
                      />
                    </View>
                    <View style={{alignItems: 'center', gap: 5}}>
                      <Text>매칭 신청</Text>
                      <Text>및 결제</Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center', gap: 10}}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                        borderRadius: 50,
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: 'white',
                        }}
                      />
                    </View>
                    <View style={{alignItems: 'center', gap: 5}}>
                      <Text>채팅으로</Text>
                      <Text>커피 약속잡기</Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center', gap: 10}}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                        borderRadius: 50,
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: 'white',
                        }}
                      />
                    </View>
                    <View style={{alignItems: 'center', gap: 5}}>
                      <Text>오프라인</Text>
                      <Text>매칭</Text>
                    </View>
                  </View>
                </View>
                <Text>결제된 매칭권 사용기한 2주</Text>
                <Text>상대방이 매칭 거저 또는 채팅 미응답 시 전액 환불</Text>
              </View>
              <View style={{padding: 20, gap: 10, backgroundColor: '#f1f1f1'}}>
                <Text>매칭 수락자</Text>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    padding: 20,
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(255, 99, 79, 0.1)',
                    borderRadius: 20,
                  }}>
                  <View style={{alignItems: 'center', gap: 10}}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                        borderRadius: 50,
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: 'white',
                        }}
                      />
                    </View>
                    <View style={{alignItems: 'center', gap: 5}}>
                      <Text>수락 또는</Text>
                      <Text>거절</Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center', gap: 10}}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                        borderRadius: 50,
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: 'white',
                        }}
                      />
                    </View>
                    <View style={{alignItems: 'center', gap: 5}}>
                      <Text>수락시 채팅으로</Text>
                      <Text>약속 잡기</Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center', gap: 10}}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                        borderRadius: 50,
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: 'white',
                        }}
                      />
                    </View>
                    <View style={{alignItems: 'center', gap: 5}}>
                      <Text>오프라인</Text>
                      <Text>매칭</Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center', gap: 10}}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                        borderRadius: 50,
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: 'white',
                        }}
                      />
                    </View>
                    <View style={{alignItems: 'center', gap: 5}}>
                      <Text>매장권</Text>
                      <Text>부수익 정산</Text>
                    </View>
                  </View>
                </View>
                <Text>
                  내가 설정한 매칭권 금액의 70%가 부수입으로 정산됩니다.
                </Text>
                <Text>
                  오프라인 매칭 완료 후 2영업일 내에 기재해주신 수락자 계좌로
                  정산됩니다.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            padding: 10,
            borderTopWidth: 1,
            borderColor: '#f1f1f1',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(255, 206, 79, 1)',
              borderRadius: 15,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              color={'black'}
              onPress={() => alert('button눌렀엉')}
              title="결제하기"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Match;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
