import axios from 'axios';
import { LOAD_MORE_USER, USERLIST_ERROR } from '../types';

export const loadMoreUser = (page, searchParams) => async dispatch => {
  let paramString = `/api/user/all?page=${page}`;
  const { sort, direction, keyword } = searchParams;
  if (sort) paramString += `&sort=${sort}`;
  if (direction) paramString += `&direction=${direction}`;
  if (keyword) paramString += `&keyword=${keyword}`;

  console.log(paramString);
  try {
    const response = await axios.get(paramString);
    dispatch({
      type: LOAD_MORE_USER,
      payload: {
        users: response.data.docs,
        totalPages: response.data.totalPages,
      },
    });
  } catch (error) {
    console.log(error.response);
    // dispatch({
    //   type: USERLIST_ERROR,
    //   payload: {
    //     message: 'Load more user failed',
    //   },
    // });
  }
};
