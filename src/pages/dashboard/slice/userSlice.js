import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nic: '',
  email: '',
  firstName: '',
  lastName: '',
  orgName: '',
  profileImage: '',
  phoneNum: '',
  userType: '',
  userBio: '',
  address: '',
  facebook: '',
  linkedIn: '',
  youtube: '',
  _id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUserData: (state) => {
      return {
        nic: '',
        email: '',
        firstName: '',
        lastName: '',
        orgName: '',
        profileImage: '',
        phoneNum: '',
        userType: '',
        userBio: '',
        address: '',
        facebook: '',
        linkedIn: '',
        youtube: '',
        _id: '',
      };
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export const selectUserData = (state) => state.user;

export default userSlice.reducer;
