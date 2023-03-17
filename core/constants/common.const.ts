import moment, { Moment } from 'moment';

interface InterfaceCommonConst {
  sidebarWidth: number;
  customColor: Array<
    'darkMBlue' | 'brightRed' | 'darkOrange' | 'limeGreen' | 'darkPink'
  >;
  loginRejectedError: Array<number | undefined>;
  defaultDate: { start: Moment; end: Moment };
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
  defaultDate: {
    start: moment('1970-01-01'),
    end: moment('2070-01-01'),
  },
};
