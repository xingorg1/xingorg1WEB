let axios = require('axios');
console.log(axios)
export default {
  get(url: any, data: object){
    return new Promise((res,rej)=>{
      axios.get(url,{
        params: data
      })
      .then(function (response: any) {
        res(response);
      })
      .catch(function (error: any) {
        rej(error);
      });
    })
  }
}