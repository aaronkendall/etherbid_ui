import { categoryActions } from '../actions';

const defaultState = {
  selectedCategory: {}
};

export default function categoryReducer(state = defaultState, action) {
	const newState = {...defaultState, ...state};

	switch(action.type) {
		case categoryActions.UPDATE_CATEGORY:
			return Object.assign(newState,
        { selectedCategory: action.payload.category }
      );
		default:
			return newState;
	}
};
