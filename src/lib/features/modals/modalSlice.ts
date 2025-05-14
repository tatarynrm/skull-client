import { createSlice } from '@reduxjs/toolkit'

interface ITarif {
  duration:string;
  oldPrice?:number;
  newPrice:number;
}
export interface modalSlice {
  tikTokModal: boolean;
  paymentModal:boolean;
  ideasModal:boolean;
  plan:ITarif | null
}

const initialState: modalSlice = {
  tikTokModal: false,
    paymentModal: false, // додали поле
    ideasModal:false,
    plan:null
}

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openTikTokModal: (state) => {
      state.tikTokModal = true
    },
    closeTikTokModal: (state) => {
      state.tikTokModal = false
    },
    openIdeasModal: (state) => {
      state.ideasModal = true
    },
    closeIdeasModal: (state) => {
      state.ideasModal = false
    },
        openPaymentModal: state => {
      state.paymentModal = true
    },
    closePaymentModal: state => {
      state.paymentModal = false
    },
    setPlan : (state,action)  =>{
      state.plan = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { openTikTokModal, closeTikTokModal,closePaymentModal,openPaymentModal,setPlan,openIdeasModal,closeIdeasModal } = modalSlice.actions

export default modalSlice.reducer