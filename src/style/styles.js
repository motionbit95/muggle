import {StyleSheet} from 'react-native';
import {
  component_height,
  component_radius,
  font_lg,
  font_md,
  primary_color,
} from '../firebase/api';

const styles = StyleSheet.create({
  // Main Container
  screenStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // padding: 20,
  },
  scrollViewStyle: {
    width: '100%',
  },
  horizontalScrollViewStyle: {
    gap: 10,
    paddingVertical: 10,
  },
  contentStyle: {
    padding: 20,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  gap10: {
    gap: 10,
  },

  // Banner
  banner: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },

  // Font
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
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  genderbuttonText: {
    color: 'gray',
    fontSize: 16,
  },
  selectedButtonText: {
    color: 'rgba(255, 99, 79, 1)', // 선택된 상태의 버튼 텍스트 색
  },
  boxTitleFont: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  boxDateFont: {
    fontSize: 14,
    color: 'rgba(153, 153, 153, 1)',
  },
  dayText: {fontSize: 12, color: 'rgba(255, 99, 79, 1)', fontWeight: 'bold'},

  // Image
  cardImage: {
    width: 280,
    height: 300,
    borderRadius: 20,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Button
  button: {
    backgroundColor: primary_color,
    borderRadius: component_radius,
    height: component_height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d9d9d9',
  },
  buttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  buttonBox: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectedButton: {
    backgroundColor: 'white',
    borderColor: 'rgba(255, 99, 79, 1)',
  },
  mapButton: {
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(238, 238, 238, 1)',
  },
  interestButton: {
    width: 50,
    height: 50,
    backgroundColor: '#d9d9d9',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Avartar
  Avartar80: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 99, 79, 1)',
    borderRadius: 50,
    borderWidth: 6,
    borderColor: '#FFB1A7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Avartar70: {
    width: 70,
    height: 70,
    backgroundColor: '#FFCACA',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Avartar50: {
    width: 50,
    height: 50,
    backgroundColor: '#d9d9d9',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Avartar30: {
    width: 30,
    height: 30,
    backgroundColor: '#d9d9d9',
    borderRadius: 50,
  },

  // ICON
  iconBox: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon40: {
    width: 40,
    height: 40,
  },
  icon24: {
    width: 24,
    height: 24,
    backgroundColor: 'gray',
  },
  icon20: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
  },
  icon18: {
    width: 18,
    height: 18,
    backgroundColor: 'gray',
  },
  icon12: {
    width: 12,
    height: 12,
    backgroundColor: 'blue',
    borderRadius: 50,
  },

  // Horizontal Line
  hr: {borderBottomColor: '#d9d9d9', borderBottomWidth: 1},

  // Tag
  tagBox: {
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 99, 79, 0.1)',
  },
  d_daytag: {
    backgroundColor: 'rgba(255, 231, 228, 1)',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  outlineTagBox: {
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  coffeeTagBox: {
    borderRadius: 5,
    backgroundColor: 'rgba(255, 99, 79, 1)',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  // row
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  // column
  columnBox: {
    flexDirection: 'column',
    gap: 10,
  },
  textColumnBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  // 그림자 효과
  shadowBoxStyle: {
    width: '100%',
    flex: 1,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  //User
  itembox: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-between',
    gap: 0,
  },
  one_thirdBoxStyle: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  TouchButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    height: 70,
    alignItems: 'center',
  },
  bgStyle: {
    // backgroundColor: 'rgba(255, 121, 79, 1)',
    width: '100%',
    height: 270,
    zIndex: -1,
    position: 'absolute',
  },
  UserStackStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 30,
  },

  // MatchComponet
  MatchComponentBox: {
    gap: 5,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    padding: 20,
  },
  MatchiconBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    gap: 5,
  },

  matchBoxs: {
    width: '100%',
    gap: 10,
    paddingBottom: 20,
  },
  matchBox: {
    backgroundColor: 'rgba(255, 245, 244, 1)',
    borderRadius: 10,
    padding: 20,
    gap: 10,
  },
  matchingBanner: {
    width: '100%',
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  matchCardBox: {
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 30,
  },
  matchingBox: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(238, 238, 238, 1)',
  },
  matchingContents: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
  },
});

export default styles;
