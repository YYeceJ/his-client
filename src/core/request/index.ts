import axios from "axios";
import queryString from "query-string";
import {HttpMethod,Options} from "../typings";

const service = axios.create({
    baseURL:"",
    timeout:30000
});

function contentType(type:any) {
    switch (type) {
        case "from":
            return {"Content-Type":"application/x-www-from-urlencoded;charset=utf-8"};
        case "json":
            return {"Content-Type":"application/json;charset=utf-8"};
        default:
            return {"Content-Type":"application/json;charset=utf-8"};
    }
}


function request(method:HttpMethod,url:string,options:Options) {
    const defered = service({
        method,
        url,
        data:options.type === "from" ? queryString.stringify(options.data) : options.data,
        params : options.params,
        headers:{
            ...options.headers,
            ...contentType(options.type)
        }
    })
    return defered;
}
/*
* get请求*/
export function get(url:string,data:object = {},options:object = {}) {
    return new Promise((resolve,reject) => {
        request("GET",url,{
            ...options,
            data
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err.respose);
            })
    })
}

/*post请求*/
export function post(url:string,data:object = {},options:object = {}) {
    return new Promise((resolve,reject) => {
        request("POST",url,{
            ...options,
            data
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err.respose);
            })
    })
}