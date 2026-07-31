"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Protocol = void 0;
const common_1 = require("@nestjs/common");
exports.Protocol = (0, common_1.createParamDecorator)((defaultValue, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const protocol = req.protocol;
    return protocol || defaultValue;
});
//# sourceMappingURL=protocal.decorator.js.map