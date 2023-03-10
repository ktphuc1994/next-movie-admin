import { infer as zInfer, object, string } from 'zod';

const loginSchema = object({
  email: string()
    .min(1, 'Email là bắt buộc')
    .email('Định dạng email không đúng'),
  matKhau: string()
    .min(8, 'Mật khẩu phải từ 8 - 32 ký tự')
    .max(32, 'Mật khẩu phải từ 8 - 32 ký tự'),
}).strip();

type loginInput = zInfer<typeof loginSchema>;

export { loginSchema };
export type { loginInput };
