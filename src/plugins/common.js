import axios from 'axios'

export const  baseURLResponse = 'http://localhost:63243/api/'
//export const  baseURLResponse = 'http://fileManager.apimedcalc.ru/api/'


export const BASE_URL = axios.create({
  baseURL: baseURLResponse
  }
)

export const BASE_URL_UploadFile = axios.create({
  baseURL: baseURLResponse,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
})
