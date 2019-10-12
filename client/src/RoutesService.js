import axios from "axios";

class RoutesService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3010/",
      withCredentials: true
    })
  }
  errHandler = err => {
    // console.error(err);
    if (err.response && err.response.data) {
      // console.error("API response", err.response.data);
      throw err.response.data.message
    }
    throw err;
  }

  createBid = (state) => {
    return this.service.post("/create/new-bid", {state})
    .then(response => response.data)
    .catch(this.errHandler)
  
  }
  createProduct = (state) => {
    return this.service.post("/create/new-product", {state})
    .then(response => response.data)
    .catch(this.errHandler)
  }
  addPicture = (file) => {
    const formData = new FormData();
    formData.append("photo", file)
    return this.service
      .post('/create/new-product/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(this.errHandler);
  }



}

export default RoutesService;