import { MyRequest } from "./request.js"

export const baseUrl = "https://www.yymanhua.com"

/* 请求漫画 */
export const request = new MyRequest({
  baseUrl
})