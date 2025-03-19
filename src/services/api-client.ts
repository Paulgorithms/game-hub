import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "4683dc2d1e5041fbbdbcc2f80db08614",
  },
});
