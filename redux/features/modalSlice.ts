import {createSlice} from '@reduxjs/toolkit'


interface StateTypes {
    isOpenRegister : boolean,
    isOpenLogin : boolean,
    isOpenListing : boolean,
    isOpenSearch : boolean
}

const initialState : StateTypes = {
    isOpenRegister : false,
    isOpenLogin : false,
    isOpenListing:false,
    isOpenSearch : false
}

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        openRegister : (state) => {
            state.isOpenLogin = false,
            state.isOpenRegister = true
        },
        openLogin : (state) => {
            state.isOpenRegister = false
            state.isOpenLogin = true
        },
        closeAuthModal : (state) => {
            state.isOpenLogin = false,
            state.isOpenRegister = false
        },
        openListning : (state) => {
            state.isOpenListing = true
        },
        closeListning : (state) => {
            state.isOpenListing = false
            state.isOpenSearch = false
        },
         openSearch : (state) => {
            state.isOpenSearch = true
        },
        closeSearch : (state) => {
            state.isOpenSearch = false
        }
    },
    extraReducers:{

    }
})

export const { openRegister, openLogin, openListning, openSearch, closeListning, closeAuthModal, closeSearch } = modalSlice.actions

export default modalSlice.reducer