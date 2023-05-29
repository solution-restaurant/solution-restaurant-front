import axios from "axios";

export default {
  axiosTestApi() {
    axios.get("/api/test").then(function (response) {
      console.log(response);
      return response;
    });
  }
}
