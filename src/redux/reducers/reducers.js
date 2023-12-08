const initialState = {
    listProduct: [],
    valiBoolen: true,
  };
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GETLIST':
        return {
          ...state,
          listProduct: action.payload,
        };
      case 'UPDATEACCOUNT':
          return {
            ...state,
            valiBoolen: action.payload,
          };
      
      default:
        return state;
    }
  };
  
  export default Reducer;
  