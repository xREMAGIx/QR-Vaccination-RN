import * as yup from 'yup';

export const SigninSchema = yup.object().shape({
  username: yup.string().required('Vui lòng nhập tên đăng nhập'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});
