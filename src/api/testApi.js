import axios from "axios";

export default {
  axiosTestApi() {
    axios.post("/api/test").then(function (response) {
      console.log(response);
      return response;
    });
  }
}
