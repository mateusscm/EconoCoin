const initialState = {
  cc: null
};

export const cc = (state = initialState, action) => {
  switch (action.type) {
    case "GET_C&C":
      return {
        ...state,
        cc: action.payload
      };
    default:
      return state;
  }
};
