declare module 'redux-persist';
declare module 'redux-persist/lib/storage';
declare module 'redux-persist/es/storage/createWebStorage';
declare module 'redux-persist/es/persistStore';
declare module 'redux-persist/integration/react';
declare module '@reduxjs/toolkit' {
  export type PayloadAction<P = any, T extends string = string, M = never, E = never> = {
    payload: P;
    type: T;
    meta?: M;
    error?: E;
  };
  export function createSlice(options: any): any;
  export function createAsyncThunk(typePrefix: string, payloadCreator: any, options?: any): any;
  export function configureStore(options: any): any;
  export function combineReducers(reducers: any): any;
}


