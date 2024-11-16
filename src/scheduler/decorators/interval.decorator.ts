import { SetMetadata } from '@nestjs/common';

export const INTERVAL_KEY = 'INTERVAL_KEY';

export const Interval = (value: number) => SetMetadata(INTERVAL_KEY, value);
