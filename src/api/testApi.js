import axios from "axios";

export default {
  axiosTestApi() {
    axios.post("/test/test").then(function (response) {
      console.log(response);
      return response;
    });
  }
}
