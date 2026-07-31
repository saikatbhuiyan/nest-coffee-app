"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = exports.INTERVAL_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.INTERVAL_KEY = 'INTERVAL_KEY';
const Interval = (value) => (0, common_1.SetMetadata)(exports.INTERVAL_KEY, value);
exports.Interval = Interval;
//# sourceMappingURL=interval.decorator.js.map