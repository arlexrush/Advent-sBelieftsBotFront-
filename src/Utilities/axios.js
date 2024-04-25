import axios from "axios";
import { config } from "../Constans/appConstans";

const BASE_URL=config.url.API_URL;
//axios.defaults.BASE_URL=BASE_URL;
axios.defaults.baseURL=BASE_URL;
export default axios;