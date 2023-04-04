import { defaultMovieScheduleFilter } from '../../constants/default.const';

export enum ScheduleFilterActionType {
  filterHeThongRap = 'tenHeThongRap',
  filterCumRap = 'tenCumRap',
  filterRap = 'tenRap',
}

interface ScheduleFilterAction {
  type: ScheduleFilterActionType;
  payload: string;
}

interface Action<K extends PropertyKey> {
  type: K;
  payload: string;
}

export interface ScheduleFilterState {
  maLichChieu: number;
  tenHeThongRap: string;
  tenCumRap: string;
  tenRap: string;
  ngayGioChieu: string;
}

export const scheduleFilterReducer = (
  state: ScheduleFilterState,
  action: ScheduleFilterAction
) => {
  const { type, payload } = action;
  switch (type) {
    case ScheduleFilterActionType.filterHeThongRap:
      return { ...state, [type]: payload };
    case ScheduleFilterActionType.filterCumRap:
      return { ...state, [type]: payload };
    case ScheduleFilterActionType.filterRap:
      return { ...state, [type]: payload };
  }
};

// export const scheduleFilterReducerGeneric = <
//   T extends Record<string, number | string>,
//   K extends keyof T
// >(
//   state: T,
//   action: { type: K; payload: T[K] }
// ) => {
//   const payload = action.payload;
//   const actionType = action.type;
//   const newState = { ...state };
//   newState[actionType] = payload;
//   return newState;
// };

export const scheduleFilterReducerGen2 =
  <K extends PropertyKey>() =>
  (
    state: Record<K, string>,
    action: { type: 'RESET' } | { type: K; payload: string }
  ) => {
    if ('payload' in action) {
      const newState = { ...state };
      newState[action.type] = action.payload;
      return newState;
    }
    return defaultMovieScheduleFilter;
  };
