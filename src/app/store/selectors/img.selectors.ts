import { createFeatureSelector, createSelector} from '@ngrx/store';
import { ImgState, featureKeySrcImg } from '../state/img.state';

export const selectSrc: any = createFeatureSelector<ImgState>(featureKeySrcImg);

export const selectSrcImg: any = createSelector(
	selectSrc,
	(state: ImgState): string => state.srcImg
);
