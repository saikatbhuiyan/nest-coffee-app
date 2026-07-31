import { Type } from '@nestjs/common';
export declare function WithUuid<TBase extends Type>(Base: TBase): {
    new (...args: any[]): {
        [x: string]: any;
        uuid: `${string}-${string}-${string}-${string}-${string}`;
        regenerateUuid(): void;
    };
    apply(this: Function, thisArg: any, argArray?: any): any;
    call(this: Function, thisArg: any, ...argArray: any[]): any;
    bind(this: Function, thisArg: any, ...argArray: any[]): any;
    toString(): string;
    readonly length: number;
    arguments: any;
    caller: Function;
    readonly name: string;
    [Symbol.hasInstance](value: any): boolean;
} & TBase;
