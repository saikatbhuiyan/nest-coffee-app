// import { Interval } from '../scheduler/decorators/interval.decorator';
import { IntervalHost } from './../scheduler/decorators/interval-host.decorator';

@IntervalHost
export class CronService {
  // @Interval(500000)
  everySecond() {
    console.log('Every second this method is called');
  }
}
