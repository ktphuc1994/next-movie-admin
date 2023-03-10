import { commonConst } from '../constants/common.const';

const swrConfig = {
  revalidateOnFocus: false,
  refreshInterval: 60 * 60 * 1000,
  dedupingInterval: 5000,
  onErrorRetry: (err: any) => {
    const rejectedErr = commonConst.loginRejectedError;
    if (err.response && rejectedErr.includes(err.response.status)) return;
  },
};

export default swrConfig;
