import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getVaccinesService} from 'services/vaccine';
import {VaccineData} from 'services/vaccine/types';

export type RegistrationState = {
  error?: string;
  vaccines?: VaccineData[];
};

const initialState: RegistrationState = {
  vaccines: undefined,
};

export const getVaccinesAction = createAsyncThunk<VaccineData[]>(
  'registrationReducer/getVaccinesAction',
  async (_, {rejectWithValue}) => {
    try {
      const res = await getVaccinesService();
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
    clearError($state) {
      $state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(getVaccinesAction.pending, $state => {
      $state.error = undefined;
    });
    builder.addCase(getVaccinesAction.fulfilled, ($state, action) => {
      $state.vaccines = action.payload;
    });
    builder.addCase(getVaccinesAction.rejected, ($state, error) => {
      $state.error = error.payload as string;
    });
  },
});

export const {resetStore, clearError} = registrationReducer.actions;

export default registrationReducer.reducer;
