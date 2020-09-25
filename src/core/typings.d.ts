export interface KeyValuePair<T> {
    [key:string]:T;
}

export interface IOptions extends KeyValuePair<any>{
    header?: KeyValuePair<string>;
    params?:KeyValuePair<any>;
}

export declare type  HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";

export declare type  Options<T = any> = IOptions;