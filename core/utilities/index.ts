import { toast } from 'react-toastify';

const unknownErr = () => {
  toast('Lỗi không xác định. Vui lòng thử lại sau.', {
    type: 'error',
    autoClose: 2000,
  });
};

export { unknownErr };
