import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getInfoService,
  loginService,
  logoutService,
  registerService,
} from 'services/registration';
import {
  LoginParams,
  RegisterParams,
  UserData,
} from 'services/registration/types';
import StorageService from 'services/storage';

export type RegistrationState = {
  id?: string;
};

const initialState: RegistrationState = {
  id: undefined,
};

export const loginAction = createAsyncThunk<string, LoginParams>(
  'registrationReducer/loginAction',
  async (params: LoginParams, {rejectWithValue}) => {
    try {
      const res = await loginService(params);
      await StorageService.savingStorage('token', res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const registrationReducer = createSlice({
  name: 'registrationReducer',
  initialState,
  reducers: {
    resetStore: () => {},
    clearRegistrationErrors($state) {
      $state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAction.pending, $state => {
      $state.error = undefined;
    });
  },
});

export const {resetStore, clearRegistrationErrors} =
  registrationReducer.actions;

export default registrationReducer.reducer;
