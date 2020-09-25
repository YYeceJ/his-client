// import axios from "axios";
// import queryString from "query-string";
// import {HttpMethod,Options} from "~/core/typings";
//
// const service = axios.create({
//     baseURL:"",
//     timeout:30000
// });
//
// function contentType(type:any) {
//     switch (type) {
//         case "from":
//             return {};
//         case "json":
//             return {};
//         default:
//             return {};
//     }
// }
//
// function request(method:HttpMethod,url:string,options:Options) {
//     const defered = service({
//         method,
//         url,
//         data:options.type === "from" ? queryString.stringify(options.data) : options.data,
//         params : options.params,
//         headers:{
//             ...options.headers,
//             ...contentType(options.type)
//         }
//     })
//     return defered;
// }