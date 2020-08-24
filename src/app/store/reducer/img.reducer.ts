import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import * as ImgAction from '../actions/img.action';
import { ImgState, initialState } from '../state/img.state';


export const imgReducer: ActionReducer<ImgState, Action> = createReducer(
	initialState,
	on(ImgAction.setBackgroundImgFromAPI, (state: ImgState, action: ImgAction.CustomImgAction): ImgState => {
		return ({
			...state,
			srcImg: action.srcImg
		});
	}),
);

export function StateReducerSrcImg(state: ImgState | undefined, action: Action): ImgState {
	return imgReducer(state, action);
}
