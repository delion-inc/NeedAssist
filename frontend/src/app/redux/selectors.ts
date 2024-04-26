import { RootState } from "@/app/redux/store";

export const selectCurrentToken = (state: RootState) => state.auth.accessToken;