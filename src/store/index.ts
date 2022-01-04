import {
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import {createSelectorHook, useDispatch} from 'react-redux';
import authReducer from './auth';
import registrationReducer from './registration';

const combinedReducer = combineReducers({
  auth: authReducer,
  registration: registrationReducer,
});

const rootReducer = ($state: CombinedState<any>, action: AnyAction) => {
  if (action.type === 'authReducer/resetStore') {
    $state = undefined;
  }
  return combinedReducer($state, action);
};

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = createSelectorHook<RootState>();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
