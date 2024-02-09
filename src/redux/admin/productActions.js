import axios from "axios";
import { actions } from "./product";

export const fetchData = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/productData");
      console.log(response);
      response.data.products
        ? dispatch(actions.read(response.data.products))
        : null;
    } catch (error) {
      console.error(error);
    }
  };
};

export const createData = (payload, payloadId) => {
  return async (dispatch) => {
    console.log(payload);
    payloadId.forEach(async (id) => {
      console.log("actually Passing", id, payload[payloadId.indexOf(id)]);
      try {
        let response = await axios.put(
          "http://127.0.0.1:8000/api/productData/" + id,
          payload[payloadId.indexOf(id)]
        );
        console.log(response);
        dispatch(actions.write("CREATE"));
      } catch (error) {
        console.error(error);
      }
    });
  };
};
export const updateData = (payload, payloadId) => {
  return async (dispatch) => {
    payloadId.forEach(async (id) => {
      try {
        let response = await axios.put(
          "http://127.0.0.1:8000/api/productData/" + id,
          payload[payloadId.indexOf(id)]
        );
        console.log(response);
        dispatch(actions.write("UPDATE"));
      } catch (error) {
        console.error(error);
      }
    });
  };
};
export const deleteData = (payloadId) => {
  return async (dispatch) => {
    payloadId.forEach(async (id) => {
      try {
        let response = await axios.delete(
          "http://127.0.0.1:8000/api/productData/" + id
        );
        console.log(response);
        dispatch(actions.write("DELETE"));
      } catch (error) {
        console.error(error);
      }
    });
    dispatch(actions.write("DELETE"));
  };
};
