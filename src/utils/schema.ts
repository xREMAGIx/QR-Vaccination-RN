import * as yup from 'yup';

export const SigninSchema = yup.object().shape({
  username: yup.string().required('Vui lòng nhập tên đăng nhập'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

export const SignupSchema = yup.object().shape({
  username: yup.string().required('Vui lòng nhập tên đăng nhập'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Số điện thoại không hợp lệ',
    ),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
  confirmPassword: yup
    .string()
    .required('Vui lòng xác nhận mật khẩu')
    .oneOf([yup.ref('password')], 'Xác nhận mật khẩu không trùng với mật khẩu'),
  dob: yup.string().required('Vui lòng nhập ngày sinh'),
  identity: yup.string().required('Vui lòng nhập số CMND/CCCD'),
});

export const InfoRegisterSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên đăng nhập'),
  gender: yup.string().required('Vui lòng nhập mật khẩu'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Số điện thoại không hợp lệ',
    ),
  identity: yup.string().required('Vui lòng nhập số CMND/CCCD'),
  medicalHistory: yup.string(),
  symptomRecent: yup.string(),
  contactRecent: yup.string(),
});

export const VaccineRegisterSchema = yup.object().shape({
  vaccineRegister: yup.object(),
  vaccineType: yup.object(),
  firstVaccineType: yup.object(),
  firstVaccineTime: yup.string(),
});
