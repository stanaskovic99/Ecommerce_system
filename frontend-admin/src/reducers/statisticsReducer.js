import {
  FETCH_USER_STATISTICS,
  FETCH_TRANSACTION_STATISTICS,
} from "../actions/types";
import { mapIndexToMonthName } from "../utils/helper";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_STATISTICS: {
      return {
        ...state,
        users: action.payload.map((el) => {
          return {
            name: mapIndexToMonthName(el._id),
            total: el.total,
          };
        }),
      };
    }
    case FETCH_TRANSACTION_STATISTICS: {
      return { ...state, transaction: action.payload };
    }
    default:
      return state;
  }
};
