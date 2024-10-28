import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import  {AppDispatch, RootState} from "./index.ts";

// Export AppDispatch type
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Create a typed version of the useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
