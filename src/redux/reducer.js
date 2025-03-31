// redux/reducer.js
import { SET_PAYMENTS, SET_LOANS } from './actions';

const initialState = {
  payments: [
    { id: 1, user: 'Juan Pérez', amount: 200, date: '2025-03-01', status: 'Completed' },
    { id: 2, user: 'María López', amount: 150, date: '2025-03-05', status: 'Pending' },
  ],
  loans: [
    { id: 1, user: 'Juan Pérez', amount: 2000, status: 'Approved', remainingAmount: 1800 },
    { id: 2, user: 'María López', amount: 1500, status: 'Pending', remainingAmount: 1500 },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENTS:
      return { ...state, payments: action.payload };
    case SET_LOANS:
      return { ...state, loans: action.payload };
    default:
      return state;
  }
};

export default reducer;
