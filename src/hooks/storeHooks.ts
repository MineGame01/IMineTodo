import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TState } from "../store/store";

export const useAppDispatch = useDispatch.withTypes<TDispatch>();
export const useAppSelector = useSelector.withTypes<TState>();