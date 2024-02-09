import axios from "axios";
import { actions } from "./user";
export const fetchData = () => {
  return async (dispatch) => {
    try {
      console.log("processing...");
      let response = await axios.get("http://127.0.0.1:8000/api/userData");
      console.log(response);
      response.data.users ? dispatch(actions.read(response.data.users)) : null;
      console.log("process complete");
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteData = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        "http://127.0.0.1:8000/api/userData/" + id
      );
      console.log(response);
      dispatch(actions.write(id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateData = (id, payload, navigate, location) => {
  let url = new URLSearchParams(location.search);
  return async (dispatch) => {
    try {
      let response = await axios.patch(
        "http://127.0.0.1:8000/api/userData/" + id,
        payload
      );
      console.log(response);
      dispatch(actions.write(id));
      navigate("/dashboard/userAdmin");
    } catch (error) {
      console.error(error);
      url.set("error", error);
      navigate(url);
    }
  };
};
