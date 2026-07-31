"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASYNC_OPTIONS_TYPE = exports.OPTIONS_TYPE = exports.HTTP_MODULE_OPTIONS = exports.ConfigurableModuleClass = void 0;
const common_1 = require("@nestjs/common");
_a = new common_1.ConfigurableModuleBuilder({ alwaysTransient: true })
    .setExtras({ isGlobal: true }, (definition, extras) => ({
    ...definition,
    global: extras.isGlobal,
}))
    .build(), exports.ConfigurableModuleClass = _a.ConfigurableModuleClass, exports.HTTP_MODULE_OPTIONS = _a.MODULE_OPTIONS_TOKEN, exports.OPTIONS_TYPE = _a.OPTIONS_TYPE, exports.ASYNC_OPTIONS_TYPE = _a.ASYNC_OPTIONS_TYPE;
//# sourceMappingURL=http-client.module-definition.js.map