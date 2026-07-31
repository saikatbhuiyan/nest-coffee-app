import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RewardsService {
  private readonly logger = new Logger(RewardsService.name);

  giveReward() {
    this.logger.debug(`Lazy loading has received a reward.`);
  }
}
