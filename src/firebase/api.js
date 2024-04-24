import React, {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {
  InAppPurchase,
  PurchaseError,
  getProducts,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import * as RNIap from 'react-native-iap';

export const primary_color = '#FF238D';
// export const primary_color = '#FF5E5B';
// export const primary_color = '#D96F6F';
export const component_height = 50;
export const component_radius = 10;
export const font_xxs = 10;
export const font_xs = 12;
export const font_sm = 14;
export const font_md = 16;
export const font_lg = 24;

export const defaultFemale =
  'https://firebasestorage.googleapis.com/v0/b/dinnermate-8d37b.appspot.com/o/assets%2FFemale.png?alt=media&token=247bbd91-9ebf-4f5a-8911-b8d6b9c89e58';

export const defaultMale =
  'https://firebasestorage.googleapis.com/v0/b/dinnermate-8d37b.appspot.com/o/assets%2FMale.png?alt=media&token=dfa379fe-607c-4ac5-8208-37f2745f5baa';

// 시/도, 군/구
export const cities = [
  '강원도',
  '경기도',
  '경상남도',
  '경상북도',
  '광주광역시',
  '대구광역시',
  '대전광역시',
  '부산광역시',
  '서울특별시',
  '세종특별자치시',
  '울산광역시',
  '인천광역시',
  '전라남도',
  '전라북도',
  '제주특별자치도',
  '충청남도',
  '충청북도',
];
export const districts = {
  강원도: [
    '강릉시',
    '고성군',
    '동해시',
    '삼척시',
    '속초시',
    '양구군',
    '양양군',
    '영월군',
    '원주시',
    '인제군',
    '정선군',
    '철원군',
    '춘천시',
    '태백시',
    '평창군',
    '홍천군',
    '화천군',
    '횡성군',
  ],
  경기도: [
    '가평군',
    '고양시 덕양구',
    '고양시 일산동구',
    '고양시 일산서구',
    '과천시',
    '광명시',
    '광주시',
    '구리시',
    '군포시',
    '김포시',
    '남양주시',
    '동두천시',
    '부천시',
    '성남시 분당구',
    '성남시 수정구',
    '성남시 중원구',
    '수원시 권선구',
    '수원시 영통구',
    '수원시 장안구',
    '수원시 팔달구',
    '시흥시',
    '안산시 단원구',
    '안산시 상록구',
    '안성시',
    '안양시 동안구',
    '안양시 만안구',
    '양주시',
    '양평군',
    '여주시',
    '연천군',
    '오산시',
    '용인시 기흥구',
    '용인시 수지구',
    '용인시 처인구',
    '의왕시',
    '의정부시',
    '이천시',
    '파주시',
    '평택시',
    '포천시',
    '하남시',
    '화성시',
  ],
  경상남도: [
    '거제시',
    '거창군',
    '고성군',
    '김해시',
    '남해군',
    '밀양시',
    '사천시',
    '산청군',
    '양산시',
    '의령군',
    '진주시',
    '창녕군',
    '창원시 마산합포구',
    '창원시 마산회원구',
    '창원시 성산구',
    '창원시 의창구',
    '창원시 진해구',
    '통영시',
    '하동군',
    '함안군',
    '함양군',
    '합천군',
  ],
  경상북도: [
    '경산시',
    '경주시',
    '고령군',
    '구미시',
    '군위군',
    '김천시',
    '문경시',
    '봉화군',
    '상주시',
    '성주군',
    '안동시',
    '영덕군',
    '영양군',
    '영주시',
    '영천시',
    '예천군',
    '울릉군',
    '울진군',
    '의성군',
    '청도군',
    '청송군',
    '칠곡군',
    '포항시 남구',
    '포항시 북구',
  ],
  광주광역시: ['광산구', '남구', '동구', '북구', '서구'],
  대구광역시: [
    '남구',
    '달서구',
    '달성군',
    '동구',
    '북구',
    '서구',
    '수성구',
    '중구',
  ],
  대전광역시: ['대덕구', '동구', '서구', '유성구', '중구'],
  부산광역시: [
    '강서구',
    '금정구',
    '기장군',
    '남구',
    '동구',
    '동래구',
    '부산진구',
    '북구',
    '사상구',
    '사하구',
    '서구',
    '수영구',
    '연제구',
    '영도구',
    '중구',
    '해운대구',
  ],
  서울특별시: [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ],
  세종특별자치시: [],
  울산광역시: ['남구', '동구', '북구', '울주군', '중구'],
  인천광역시: [
    '강화군',
    '계양구',
    '남동구',
    '동구',
    '미추홀구',
    '부평구',
    '서구',
    '연수구',
    '옹진군',
    '중구',
  ],
  전라남도: [
    '강진군',
    '고흥군',
    '곡성군',
    '광양시',
    '구례군',
    '나주시',
    '담양군',
    '목포시',
    '무안군',
    '보성군',
    '순천시',
    '신안군',
    '여수시',
    '영광군',
    '영암군',
    '완도군',
    '장성군',
    '장흥군',
    '진도군',
    '함평군',
    '해남군',
    '화순군',
  ],
  전라북도: [
    '고창군',
    '군산시',
    '김제시',
    '남원시',
    '무주군',
    '부안군',
    '순창군',
    '완주군',
    '익산시',
    '임실군',
    '장수군',
    '전주시 덕진구',
    '전주시 완산구',
    '정읍시',
    '진안군',
  ],
  제주특별자치도: ['서귀포시', '제주시'],
  충청남도: [
    '계룡시',
    '공주시',
    '금산군',
    '논산시',
    '당진시',
    '보령시',
    '부여군',
    '서산시',
    '서천군',
    '아산시',
    '예산군',
    '천안시 동남구',
    '천안시 서북구',
    '청양군',
    '태안군',
    '홍성군',
  ],
  충청북도: [
    '괴산군',
    '단양군',
    '보은군',
    '영동군',
    '옥천군',
    '음성군',
    '제천시',
    '증평군',
    '진천군',
    '청주시 상당구',
    '청주시 서원구',
    '청주시 청원구',
    '청주시 흥덕구',
    '충주시',
  ],
};

export const banks = [
  '국민',
  '하나',
  '신한',
  '우리',
  '카카오뱅크',
  '토스',
  'SC제일',
  '한국씨티',
];

export function getDisplayAge(birthdate) {
  if (!birthdate) return '';
  // 입력된 8자리 문자열을 연, 월, 일로 분리
  const year = birthdate.slice(0, 4);
  const month = birthdate.slice(4, 6);
  const day = birthdate.slice(6, 8);

  // 날짜 객체 생성
  const birthdateObj = new Date(year, month - 1, day); // 월은 0부터 시작하므로 -1 해줍니다.
  var currentDate = new Date();
  var age = currentDate.getFullYear() - birthdateObj.getFullYear();

  if (
    currentDate.getMonth() < birthdateObj.getMonth() ||
    (currentDate.getMonth() === birthdateObj.getMonth() &&
      currentDate.getDate() < birthdateObj.getDate())
  ) {
    age--;
  }

  var lowerRange = Math.floor(age / 5) * 5;
  var upperRange = lowerRange + 4;
  return `${age}`;
}

export function calculateDday(targetDate) {
  var today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 날짜의 시간을 00:00:00으로 설정
  var target = new Date(targetDate);
  target.setHours(0, 0, 0, 0); // 대상 날짜의 시간을 00:00:00으로 설정

  var difference = target - today;
  var daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24)); // 일 단위로 차이 계산

  return daysDifference;
}

export function displayDday(dday) {
  if (dday > 0) {
    return 'D-' + dday;
  } else if (dday == 0) {
    return 'D-Day';
  } else {
    return 'D+' + Math.abs(dday);
  }
}

export function convertFirestoreTimestampToDate(timestamp) {
  if (!timestamp) return new Date();
  const milliseconds =
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
  return new Date(milliseconds);
}

export function formatDate(date) {
  try {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // 월과 일이 한 자리 숫자인 경우 앞에 0을 붙여줍니다.
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  } catch (error) {
    let firestoreDate = convertFirestoreTimestampToDate(date);
    return formatDate(firestoreDate);
  }
}

export function formatDateTime(date) {
  try {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let days = ['일', '월', '화', '수', '목', '금', '토'];
    let dayOfWeek = days[date.getDay()];

    let hour = date.getHours();
    let minute = date.getMinutes();

    // 월과 일이 한 자리 숫자인 경우 앞에 0을 붙여줍니다.
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;

    return `${year}.${month}.${day}(${dayOfWeek}) ${hour}:${minute}`;
  } catch (error) {
    let firestoreDate = convertFirestoreTimestampToDate(date);
    return formatDateTime(firestoreDate);
  }
}

export function formatTwoDigits(num) {
  // 숫자를 문자열로 변환
  var strNum = num.toString();

  // 만약 한 자리 숫자라면 앞에 0 추가
  if (strNum.length === 1) {
    strNum = '0' + strNum;
  }

  return strNum;
}

export function compareTimestampWithCurrentTime(firestoreTimestamp) {
  const firestoreDate = convertFirestoreTimestampToDate(firestoreTimestamp);
  const currentDate = new Date();

  // 두 날짜의 차이 계산 (밀리초 단위)
  const timeDifference = currentDate - firestoreDate;

  // 차이를 표시하는 문자열 생성
  if (timeDifference < 60 * 1000) {
    return `${Math.round(timeDifference / 1000)}초 전`;
  } else if (timeDifference < 60 * 60 * 1000) {
    return `${Math.round(timeDifference / (60 * 1000))}분 전`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    return `${Math.round(timeDifference / (60 * 60 * 1000))}시간 전`;
  } else {
    // 다양한 형식으로 날짜 표시 가능
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return firestoreDate.toLocaleDateString('ko-Kr', options);
  }
}

const itemSkus = Platform.select({
  ios: {sku: ['heart_100']},
  android: {skus: ['heart_100']},
});

export function useShoppingState() {
  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const connection = async () => {
      try {
        const init = await RNIap.initConnection();
        const initCompleted = init === true;

        if (initCompleted) {
          if (Platform.OS === 'android') {
            await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
          } else {
            await RNIap.clearTransactionIOS();
          }
        }

        // success listener
        purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
          const receipt = purchase.transactionReceipt
            ? purchase.transactionReceipt
            : purchase.purchaseToken;

          if (receipt) {
            try {
              setLoading(false);
              const ackResult = await finishTransaction(purchase);

              // 구매이력 저장 및 상태 갱신
              if (purchase) {
              }
            } catch (error) {
              console.log('ackError : ', error);
            }
          }
        });

        purchaseErrorSubscription = purchaseErrorListener(error => {
          setLoading(false);

          // 정상적인 에러상황 대응
          const USER_CANCEL = 'E_USER_CANCELED';
          if (error && error.code === USER_CANCEL) {
            Alert.alert('구매취소', '구매를 취소하셨습니다.');
          } else {
            Alert.alert('구매실패', '구매 중 오류가 발생하였습니다.');
          }
        });

        console.log('connection success', initCompleted);
        getItems();
      } catch (error) {
        console.log('connection error', error);
      }
    };
    connection();

    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }

      RNIap.endConnection();
    };
  }, []);

  const getItems = async () => {
    try {
      console.log('getItems : ', itemSkus);
      const items = await getProducts(itemSkus);
      console.log(RNIap.getAvailablePurchases());
      // items 저장
      console.log('getItems : ', items);
    } catch (error) {
      console.log('getItemsError : ', error);
    }
  };

  const requestItemPurchase = async skus => {
    try {
      const response = await RNIap.requestPurchase(skus);
      console.log('requestItemPurchase : ', response);
    } catch (error) {
      console.log('requestItemPurchaseError : ', error);
    }
  };

  return {requestItemPurchase};
}
