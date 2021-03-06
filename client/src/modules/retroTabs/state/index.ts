import { SignalRActions } from "../../../store/signalR";

export const FETCH_COMMENTS_START: string = "FETCH_COMMENTS_START";
export const FETCH_COMMENTS_SUCCESS: string = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE: string = "FETCH_COMMENTS_FAILURE";

export const ADD_COMMENT_STARTED: string = "ADD_COMMENT_STARTED";
export const ADD_COMMENT_SUCCESS: string = "ADD_COMMENT_SUCCESS";

export const UPDATE_RETRO_START: string = "UPDATE_RETRO_START";
export const UPDATE_RETRO_SUCCESS: string = "UPDATE_RETRO_SUCCESS";

export const RetroActionCreators = {
  addCommentToRetro: (groupComment: GroupCommentModel) => {
    return (dispatch: any) => {
      dispatch({ type: ADD_COMMENT_STARTED });
      dispatch({ type: ADD_COMMENT_SUCCESS, payload: groupComment });
    };
  },
  updateRetro: (retro: Retro) => {
    return (dispatch: any) => {
      dispatch({ type: UPDATE_RETRO_START });
      dispatch({ type: UPDATE_RETRO_SUCCESS, retro });
    };
  },
  joinRetro: (retroId: string) => {
    return (dispatch: any) => {
      dispatch({ type: SignalRActions.JOIN_RETRO, retroId });
    };
  },
  saveComment: (retroId: string, model: GroupCommentModel) => {
    return (dispatch: any) => {
      dispatch({
        type: SignalRActions.SAVE_COMMENT,
        payload: {
          retroId,
          groupId: model.groupId,
          comment: model.comment
        }
      });
    };
  },
};

export interface RetroState {
  retro?: Retro;
  isFetchingRetro: boolean;
}

export interface Retro {
  id?: string;
  groups: Group[];
  name: string;
}

export interface Group {
  id: string;
  name: string;
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  id?: string;
  isOwner: boolean;
  text: string;
  tagId?: string;
  actions: Action[];
}

export interface Action {
  id?: string;
  commentId: string;
  text: string;
}

export interface GroupCommentModel {
  comment: Comment;
  groupId: string;
}

const initialState: RetroState = {
  isFetchingRetro: false,
};

export const RetroReducer = (state: RetroState = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_RETRO_SUCCESS:
      return { ...state, retro: action.retro };
    case ADD_COMMENT_SUCCESS:
      const retro = Object.assign({}, state.retro);
      const groupIndex = retro!.groups.findIndex(g => g.id === action.payload.groupId);

      const existingCommentIndex = retro.groups[groupIndex].comments.findIndex(c => c.id === action.payload.comment.id);

      if (existingCommentIndex === -1) {
        retro!.groups[groupIndex].comments.push(action.payload.comment);
      } else {
        retro!.groups[groupIndex].comments.splice(existingCommentIndex, 1, action.payload.comment);
      }

      return { ...state, retro };
    default:
      return state;
  }
};
