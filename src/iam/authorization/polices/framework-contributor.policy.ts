import { PolicyHandlerStorage } from './policy-handlers.storage';
import { ActiveUserData } from 'src/iam/interface/active-user-data-interface';
import { PolicyHandler } from './interfaces/policy-handler.interface';
import { Policy } from './interfaces/policy.interface';

export class FrameworkContributorPolicy implements Policy {
  name = 'FrameworkContributor';
}

export class FrameworkContributorPolicyHandler
  implements PolicyHandler<FrameworkContributorPolicy>
{
  constructor(private readonly policyHandlerStorage: PolicyHandlerStorage) {
    this.policyHandlerStorage.add(FrameworkContributorPolicy, this);
  }

    async handle(
    policy: FrameworkContributorPolicy,
    user: ActiveUserData,
  ): Promise<void> {
    throw new Error('FrameworkContributor');
  }
}
