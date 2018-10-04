export interface AppState {
    isLoading: boolean;
}

const initialState: AppState = {
    isLoading: false,
};

export const ASYNC_START = "ASYNC_START";
export const ASYNC_END = "ASYNC_END";

export const AppReducer = (state: AppState = initialState, action: any) => {
    switch (action.type) {
      case ASYNC_START:
        return { ...state, isLoading: true };
      case ASYNC_END:
        return { ...state, isLoading: false };
      default:
        return state;
    }
};