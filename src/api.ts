import {get} from "./core/request";

export function getProvinceList() {
    return get("http://5d79e6fe9edf7400140a90cf.mockapi.io/api/findProvinceList");
}