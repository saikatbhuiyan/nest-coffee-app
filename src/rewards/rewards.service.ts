import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardsService {
  giveReward() {
    // Logic to give rewards to the user based on the rewardType
    console.log(`Lazy loading has received a reward.`);
  }
}
