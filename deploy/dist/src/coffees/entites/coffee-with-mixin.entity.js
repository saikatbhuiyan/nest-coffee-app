"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeMixIn = void 0;
const openapi = require("@nestjs/swagger");
const with_uuid_mixin_1 = require("../../common/mixins/with-uuid.mixin/with-uuid.mixin");
class CoffeeMixIn {
    constructor(name) {
        this.name = name;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CoffeeMixIn = CoffeeMixIn;
const CoffeeWithUuidCls = (0, with_uuid_mixin_1.WithUuid)(CoffeeMixIn);
const coffee = new CoffeeWithUuidCls('Buddy Brew');
coffee.name;
coffee.regenerateUuid();
coffee.uuid;
//# sourceMappingURL=coffee-with-mixin.entity.js.map