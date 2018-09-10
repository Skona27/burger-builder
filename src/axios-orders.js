import axios from "axios";

const instance = axios.create({
   baseURL: "https://burger-builder-72d98.firebaseio.com/" 
});

export default instance;