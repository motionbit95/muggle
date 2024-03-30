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
    padding: 16,
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
  contentTitle: {color: 'black', fontSize: 15, fontWeight: '600'},
  contentText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(187, 187, 187, 1)',
  },
  contentBox: {
    borderColor: 'rgba(221, 221, 221, 1)',
    borderWidth: 1,
    color: 'black',
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
  Avartar40: {
    width: 40,
    height: 40,
    backgroundColor: '#d9d9d9',
    borderRadius: 40,
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
    paddingBottom: 10,
  },
  matchBox: {
    backgroundColor: 'rgba(255, 245, 244, 1)',
    borderRadius: 10,
    padding: 16,
    gap: 5,
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

// 스타일 가이드 모음
// ========================== color ===========================
export const color_primary = '#FC8181';

export const color_bg_body = '#f4f4f4';
export const color_box_body = 'white';

export const blackAlpha50 = 'rgba(0, 0, 0, 0.04)'; // 완전히 불투명한 검은색
export const blackAlpha100 = 'rgba(0, 0, 0, 0.06)';
export const blackAlpha200 = 'rgba(0, 0, 0, 0.08)';
export const blackAlpha300 = 'rgba(0, 0, 0, 0.16)';
export const blackAlpha400 = 'rgba(0, 0, 0, 0.24)';
export const blackAlpha500 = 'rgba(0, 0, 0, 0.36)';
export const blackAlpha600 = 'rgba(0, 0, 0, 0.48)';
export const blackAlpha700 = 'rgba(0, 0, 0, 0.64)';
export const blackAlpha800 = 'rgba(0, 0, 0, 0.8)';
export const blackAlpha900 = 'rgba(0, 0, 0, 0.92)';

export const whiteAlpha50 = 'rgba(255, 255, 255, 0.04)'; // 완전히 불투명한 흰색
export const whiteAlpha100 = 'rgba(255, 255, 255, 0.06)';
export const whiteAlpha200 = 'rgba(255, 255, 255, 0.08)';
export const whiteAlpha300 = 'rgba(255, 255, 255, 0.16)';
export const whiteAlpha400 = 'rgba(255, 255, 255, 0.24)';
export const whiteAlpha500 = 'rgba(255, 255, 255, 0.36)';
export const whiteAlpha600 = 'rgba(255, 255, 255, 0.48)';
export const whiteAlpha700 = 'rgba(255, 255, 255, 0.64)';
export const whiteAlpha800 = 'rgba(255, 255, 255, 0.8)';
export const whiteAlpha900 = 'rgba(255, 255, 255, 0.92)';

// typograpy
export const fs_2xs = 10;
export const fs_xs = 12;
export const fs_sm = 14;
export const fs_md = 16;
export const fs_lg = 18;
export const fs_xl = 20;
export const fs_2xl = 24;
export const fs_3xl = 30;
export const fs_4xl = 36;
export const fs_5xl = 48;
export const fs_6xl = 60;

export const lh_component = '150%';
export const lh_title = '100%';
export const lh_none = '60%';

export const fw_normal = 'normal';
export const fw_medium = '500';
export const fw_bold = 'bold';

export const t_align_center = 'center';
export const t_align_left = 'left';
export const t_align_right = 'right';
export const t_align_justify = 'justify';

// title
export const title = {
  fontSize: fs_xl,
  // lineHeight: lh_title,
  fontWeight: fw_bold,
  color: blackAlpha900,
};
export const description = {
  fontSize: fs_md,
  // lineHeight: lh_title,
  color: blackAlpha500,
};

export const shadow_xs = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 0.25,
  shadowRadius: 1,
};

export const shadow_sm = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.05,
  shadowRadius: 2,
};

export const shadow_base = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.06,
  shadowRadius: 2,
};

export const shadow_md = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.06,
  shadowRadius: 4,
};

export const shadow_lg = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.05,
  shadowRadius: 6,
  gap: 10,
};

export const shadow_xl = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 10},
  shadowOpacity: 0.04,
  shadowRadius: 10,
};

export const shadow_2xl = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 25},
  shadowOpacity: 0.25,
  shadowRadius: 50,
};

export const outline = {
  shadowColor: '#3f99E1',
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 1,
};

export const shadow_dark = {
  shadowColor: 'black',
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 0.8,
  shadowRadius: 10,
};

// spacing
export const sp_0 = {gap: 0};
export const sp_1 = {gap: 4};
export const sp_2 = {gap: 8};
export const sp_3 = {gap: 12};
export const sp_4 = {gap: 16};
export const sp_5 = {gap: 20};
export const sp_6 = {gap: 24};
export const sp_7 = {gap: 28};
export const sp_8 = {gap: 32};
export const sp_9 = {gap: 36};
export const sp_10 = {gap: 40};
export const sp_12 = {gap: 48};
export const sp_13 = {gap: 52};
export const sp_14 = {gap: 56};
export const sp_16 = {gap: 64};
export const sp_20 = {gap: 80};
export const sp_24 = {gap: 96};
export const sp_28 = {gap: 112};
export const sp_32 = {gap: 128};
export const sp_36 = {gap: 144};
export const sp_40 = {gap: 160};
export const sp_44 = {gap: 176};
export const sp_48 = {gap: 192};
export const sp_52 = {gap: 208};
export const sp_56 = {gap: 224};
export const sp_60 = {gap: 240};
export const sp_64 = {gap: 256};
export const sp_72 = {gap: 288};
export const sp_80 = {gap: 320};
export const sp_96 = {gap: 384};

// 정렬
export const flex_row = {display: 'flex', flexDirection: 'row'};
export const flex_column = {display: 'flex', flexDirection: 'column'};
export const flex_row_reverse = {display: 'flex', flexDirection: 'row-reverse'};
export const flex_column_reverse = {
  display: 'flex',
  flexDirection: 'column-reverse',
};
export const flex_wrap = {display: 'flex', flexWrap: 'wrap'};
export const flex_wrap_reverse = {display: 'flex', flexWrap: 'wrap-reverse'};
export const flex_nowrap = {display: 'flex', flexWrap: 'nowrap'};

// 진행 방향 정렬
export const justify_start = {display: 'flex', justifyContent: 'flex-start'};
export const justify_end = {display: 'flex', justifyContent: 'flex-end'};
export const justify_center = {display: 'flex', justifyContent: 'center'};
export const justify_between = {
  display: 'flex',
  justifyContent: 'space-between',
};
export const justify_around = {display: 'flex', justifyContent: 'space-around'};
export const justify_evenly = {display: 'flex', justifyContent: 'space-evenly'};

// 진행 방향 반대 정렬
export const align_start = {display: 'flex', alignItems: 'flex-start'};
export const align_end = {display: 'flex', alignItems: 'flex-end'};
export const align_center = {display: 'flex', alignItems: 'center'};
export const align_stretch = {display: 'flex', alignItems: 'stretch'};
export const align_baseline = {display: 'flex', alignItems: 'baseline'};

// 가운데 레이아웃
export const center = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const w_full = {width: '100%'};

export const circle_30 = {
  width: 30,
  height: 30,
  backgroundColor: primary_color,
};

export const circle_40 = {
  width: 40,
  height: 40,
  backgroundColor: primary_color,
};

export const circle_50 = {
  width: 50,
  height: 50,
  backgroundColor: primary_color,
};

// radius
export const radius_sm = {borderRadius: 4};
export const radius_md = {borderRadius: 8};
export const radius_lg = {borderRadius: 12};
export const radius_xl = {borderRadius: 16};
export const radius_2xl = {borderRadius: 20};
export const radius_3xl = {borderRadius: 24};
export const radius_full = {borderRadius: 999};

// padding
export const p_0 = {padding: 0};
export const p_1 = {padding: 4};
export const p_2 = {padding: 8};
export const p_3 = {padding: 12};
export const p_4 = {padding: 16};
export const p_5 = {padding: 20};
export const p_6 = {padding: 24};
export const p_7 = {padding: 28};
export const p_8 = {padding: 32};
export const p_9 = {padding: 36};
export const p_10 = {padding: 40};
export const p_12 = {padding: 48};
export const p_14 = {padding: 56};
export const p_16 = {padding: 64};
export const p_20 = {padding: 80};
export const p_24 = {padding: 96};
export const p_28 = {padding: 112};
export const p_32 = {padding: 128};

// margin
export const m_0 = {margin: 0};
export const m_1 = {margin: 4};
export const m_2 = {margin: 8};
export const m_3 = {margin: 12};
export const m_4 = {margin: 16};
export const m_5 = {margin: 20};
export const m_6 = {margin: 24};
export const m_7 = {margin: 28};
export const m_8 = {margin: 32};
export const m_9 = {margin: 36};
export const m_10 = {margin: 40};
export const m_12 = {margin: 48};
export const m_14 = {margin: 56};
export const m_16 = {margin: 64};
export const m_20 = {margin: 80};
export const m_24 = {margin: 96};
export const m_28 = {margin: 112};
export const m_32 = {margin: 128};

export const bg_body = {backgroundColor: color_bg_body};

export const banner = isVisible => [
  {
    backgroundColor: primary_color,
  },
];

// button
export const under_button = isSelected => [
  {
    borderBottomWidth: 2,
    borderColor: isSelected ? blackAlpha900 : blackAlpha50,
  },
  p_2,
];

export const text_selected = isSelected => [
  {
    fontSize: fs_md,
    color: isSelected ? blackAlpha900 : blackAlpha500,
    fontWeight: fw_bold,
  },
];

export const text_unselected = isSelected => [
  {
    fontSize: fs_md,
    color: isSelected ? blackAlpha900 : blackAlpha500,
    fontWeight: fw_normal,
  },
];

export const img_xxs = {
  width: 8,
  height: 12,
};

export const img_xs = {
  width: 16,
  height: 16,
};

export const img_sm = {
  width: 20,
  height: 20,
};

export const img_md = {
  width: 30,
  height: 30,
};

export const img_ml = {
  width: 13 * 3,
  height: 22 * 3,
};

export const img_sm_2 = {
  width: 24,
  height: 20,
};

export const img_lg = {
  width: 100,
  height: 100,
};

export const img_xl = {
  width: 280,
  height: 300,
};

export const f_full = {
  width: '100%',
  height: '100%',
};

export const img_full = [
  {
    flex: 1,
  },
  justify_end,
];

// button
export const btn_primary = [
  radius_md,
  justify_center,
  align_center,
  p_3,
  {
    backgroundColor: primary_color,
  },
];

export const btn_yellow = [
  radius_md,
  justify_center,
  align_center,
  p_3,
  {
    backgroundColor: '#FFCE4F',
  },
];

export const btn_secondary = [
  radius_md,
  justify_center,
  align_center,
  p_3,
  {
    backgroundColor: whiteAlpha900,
  },
];

export const btn_normal = [
  radius_md,
  justify_center,
  align_center,
  p_3,
  {
    backgroundColor: blackAlpha100,
  },
];
