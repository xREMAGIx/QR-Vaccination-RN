export type LoginParams = {
  phone: string;
  password: string;
};

export type RegisterParams = {
  fullName: string;
  password: string;
  dateOfBirth: string;
  identityInfo: string;
  phone: string;
  gender: string;
};

export type UserData = {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  identityInfo: string;
  phone: string;
  gender: string;
  role: string;
  createdAt: string;
  __v: number;
  id: string;
};
