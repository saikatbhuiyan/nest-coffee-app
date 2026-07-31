import Piscina from 'piscina';
export declare class FibonacciController {
    fibonacciWorker: Piscina<any, any>;
    getFibonacci(n?: number): Promise<any>;
}
