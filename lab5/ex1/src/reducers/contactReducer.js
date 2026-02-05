// src/reducers/contactReducer.js

import { initialContactState } from '../data/contactInitialState';

export const contactReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: '', // xóa lỗi khi người dùng nhập lại
        },
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        submitted: true,
      };

    case 'RESET_FORM':
      return initialContactState;

    default:
      return state;
  }
};