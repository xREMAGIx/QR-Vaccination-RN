import * as yup from 'yup';

export const SigninSchema = yup.object().shape({
  phone: yup.string().required('Vui lòng nhập số điện thoại'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
});

export const SignupSchema = yup.object().shape({
  fullName: yup.string().required('Vui lòng nhập họ & tên'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Số điện thoại không hợp lệ',
    ),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
  confirmPassword: yup
    .string()
    .required('Vui lòng xác nhận mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không trùng với mật khẩu'),
  dateOfBirth: yup.string().required('Vui lòng nhập ngày sinh'),
  identityInfo: yup.string().required('Vui lòng nhập số CMND/CCCD'),
  genderOption: yup.object().required('Vui lòng chọn giới tính'),
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
