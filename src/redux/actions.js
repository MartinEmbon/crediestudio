// redux/actions.js
export const SET_PAYMENTS = 'SET_PAYMENTS';
export const SET_LOANS = 'SET_LOANS';

export const setPayments = (payments) => ({
  type: SET_PAYMENTS,
  payload: payments,
});

export const setLoans = (loans) => ({
  type: SET_LOANS,
  payload: loans,
});
