import axios from "axios";
import { GET_FILTER_NEWS } from "../actionTypes";

export const getfilteredNews = (authorState, techState) => async (dispatch) => {
  try {
    let authorStr = "";
    let techStr = "";
    console.log(authorState);
    console.log(techState);
    for (let author in authorState) {
      if (authorState[author] === true) {
        authorStr += "-" + author;
      }
    }
    for (let tech in techState) {
      if (techState[tech] === true) {
        techStr += "-" + tech;
      }
    }
    if (techStr === "") {
      techStr = " null";
    }
    if (authorStr === "") {
      authorStr = " null";
    }

    const res = await axios.get(
      `/api/news/filteredNews/${techStr.slice(1)}/${authorStr.slice(1)}`
    );
    dispatch({
      type: GET_FILTER_NEWS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
