import { WithUuid } from 'src/common/mixins/with-uuid.mixin/with-uuid.mixin';

export class CoffeeMixIn {
  constructor(public name: string) {}
}

const CoffeeWithUuidCls = WithUuid(CoffeeMixIn);
const coffee = new CoffeeWithUuidCls('Buddy Brew');
coffee.name;
coffee.regenerateUuid();
coffee.uuid;
