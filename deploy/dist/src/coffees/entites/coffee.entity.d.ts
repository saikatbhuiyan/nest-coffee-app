import { Flavor } from './flavor.entity';
export declare class Coffee {
    id: number;
    name: string;
    brand: string;
    recommendations: number;
    flavors: Flavor[];
}
