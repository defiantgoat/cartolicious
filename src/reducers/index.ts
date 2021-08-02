

export const initialState = {};

const rootReducer = (state = initialState, action: any): any => {

  const {payload} = action as any;
  
  switch(action.type) {
    default: 
        return state;
    }
};

export default rootReducer;
