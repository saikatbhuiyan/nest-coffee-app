import { Logger } from '@nestjs/common';
import { IntervalHost } from './../scheduler/decorators/interval-host.decorator';

@IntervalHost
export class CronService {
  private readonly logger = new Logger(CronService.name);

  // @Interval(500000)
  everySecond() {
    this.logger.debug('Every second this method is called');
  }
}
