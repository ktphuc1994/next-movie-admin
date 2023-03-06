interface InterfaceCommonConst {
  sidebarWidth: number;
  customColor: Array<
    'darkMBlue' | 'brightRed' | 'darkOrange' | 'limeGreen' | 'darkPink'
  >;
  loginRejectedError: Array<number | undefined>;
}

export const commonConst: InterfaceCommonConst = {
  sidebarWidth: 240,
  customColor: [
    'darkMBlue',
    'brightRed',
    'darkOrange',
    'limeGreen',
    'darkPink',
  ],
  loginRejectedError: [401, 500],
};
