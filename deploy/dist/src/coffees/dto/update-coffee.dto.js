"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCoffeeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_coffee_dto_1 = require("./create-coffee.dto");
class UpdateCoffeeDto extends (0, swagger_1.PartialType)(create_coffee_dto_1.CreateCoffeeDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCoffeeDto = UpdateCoffeeDto;
//# sourceMappingURL=update-coffee.dto.js.map