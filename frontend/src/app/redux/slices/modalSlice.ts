import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
   openLoginModal: boolean,
   openRegisterModal: boolean,
}

const initialState: IInitialState = {
   openLoginModal: false,
   openRegisterModal: false,
};

const modalSlice = createSlice({
   name: "modal",
   initialState: initialState,
   reducers: {
      toggleLoginModal: (state) => {
         state.openLoginModal = !state.openLoginModal;
      },
      toggleRegisterModal: (state) => {
         state.openRegisterModal = !state.openRegisterModal;
      },
   }
})

export const { toggleLoginModal, toggleRegisterModal } = modalSlice.actions;
export default modalSlice.reducer;