import createAxios from "./createAxios";

const MID_URL = "/shorts";




class shortsApi {
  
  constructor() {
    this.axios = createAxios(MID_URL);
  }

  async getAllShorts(){
      try{
          const response  = await this.axios.get("/getAll");
          console.log("서버 응답:", response); // 응답 데이터 출력
        return response.data; // 응답 데이터 반환 (필요 시)
      }catch(error){
        console.error("서버 오류:", error);
        throw error; // 오류 처리
      }
  }


  async postShorts(formData) {
      return await this.axios
      .post("/post", formData, {
          headers: {
          "Content-Type": "multipart/form-data",
          },
      })
      .then((response) => {
          console.log("서버 응답:", response);
          return response;
      })
      .catch((error) => {
          console.error("서버 오류:", error);
          throw error;
      });
  }

  async getShortsDetail(id){
    try{
      const response  = await this.axios.get(`/detail/${id}`);
      console.log("서버 응답:", response); // 응답 데이터 출력
    return response.data; // 응답 데이터 반환 (필요 시)
  }catch(error){
    console.error("서버 오류:", error);
    throw error; // 오류 처리
  }


  }
  async getRandomShorts(){
    try{
      const response = await this.axios.get('/random');
      console.log("서버 응답:", response); // 응답 데이터 출력
      return response.data; // 응답 데이터 반환 (필요 시)
    } catch(error){
      console.error("서버 오류:", error); 
      throw error; // 오류 처리
  }
  }

}
export default new shortsApi();

