import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getInfoService,
  loginService,
  logoutService,
  registerService,
} from 'services/auth';
import {LoginParams, RegisterParams, UserData} from 'services/auth/types';
import StorageService from 'services/storage';

export type AuthState = {
  token?: string;
  error?: string;
  userData?: UserData;
};

const initialState: AuthState = {
  token: undefined,
  error: undefined,
  userData: undefined,
};

export const loginAction = createAsyncThunk<string, LoginParams>(
  'authReducer/loginAction',
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

export const registerAction = createAsyncThunk<UserData, RegisterParams>(
  'authReducer/registerAction',
  async (params: RegisterParams, {rejectWithValue}) => {
    try {
      const res = await registerService(params);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getInfoAction = createAsyncThunk<UserData>(
  'authReducer/getInfoAction',
  async (_, {rejectWithValue}) => {
    try {
      const res = await getInfoService();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logoutAction = createAsyncThunk(
  'authReducer/logoutAction',
  async (_, {rejectWithValue}) => {
    try {
      await StorageService.removingStorage('token');
      await logoutService();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    resetStore: () => {},
    clearAuthErrors($state) {
      $state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAction.pending, $state => {
      $state.error = undefined;
    });
    builder.addCase(loginAction.fulfilled, ($state, action) => {
      $state.token = action.payload;
    });
    builder.addCase(loginAction.rejected, ($state, error) => {
      $state.error = error.payload as string;
    });
    builder.addCase(registerAction.pending, $state => {
      $state.error = undefined;
    });
    builder.addCase(registerAction.fulfilled, ($state, action) => {
      $state.userData = action.payload;
    });
    builder.addCase(registerAction.rejected, ($state, error) => {
      $state.error = error.payload as string;
    });
    builder.addCase(getInfoAction.pending, $state => {
      $state.error = undefined;
    });
    builder.addCase(getInfoAction.fulfilled, ($state, action) => {
      $state.userData = action.payload;
    });
    builder.addCase(getInfoAction.rejected, ($state, error) => {
      $state.error = error.payload as string;
    });
  },
});

export const {resetStore, clearAuthErrors} = authReducer.actions;

export default authReducer.reducer;
