import axios from "axios";
import {setToken, getToken, getRefreshToken } from "@/utils/auth";

export function refresh() {
    return axios.get('api/login/refreshToken', {params: {}, headers: {'Authorization': getToken(),'Authorization-Refresh': getRefreshToken()}}).then(res => {
      let statusCode = res.data.code;
      if ( statusCode === "00010" || statusCode === "00011" || statusCode === "00012" || statusCode === "00013" || statusCode === "00014" || statusCode === "00015" ) {
        return false
      } else {
        setToken(res.data.data.token);
        return true
      }
    })
}
