import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const userErrorReducer = (state: RootState): Error | null =>
  state.user.error;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
);
