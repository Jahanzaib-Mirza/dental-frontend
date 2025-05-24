import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 