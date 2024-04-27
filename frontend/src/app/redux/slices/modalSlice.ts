import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
   openLoginModal: boolean,
   openRegisterModal: boolean,
   openInfoModal: boolean,
}

const initialState: IInitialState = {
   openLoginModal: false,
   openRegisterModal: false,
   openInfoModal: false,
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
      toggleInfoModal: (state) => {
         state.openInfoModal = !state.openInfoModal;
      },
   }
})

export const { toggleLoginModal, toggleRegisterModal, toggleInfoModal } = modalSlice.actions;
export default modalSlice.reducer;