import { Type } from '@angular/core';

export class Response<T> {
    data: Type<T>;
    code: number;
    message: string;

    constructor(data: Type<T>, code: number, message: string) {
        this.data = data;
        this.code = code;
        this.message = message;
    }
}