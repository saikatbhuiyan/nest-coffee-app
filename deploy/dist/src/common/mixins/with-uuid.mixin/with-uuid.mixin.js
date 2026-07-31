"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithUuid = void 0;
const crypto_1 = require("crypto");
function WithUuid(Base) {
    return class extends Base {
        constructor() {
            super(...arguments);
            this.uuid = (0, crypto_1.randomUUID)();
        }
        regenerateUuid() {
            this.uuid = (0, crypto_1.randomUUID)();
        }
    };
}
exports.WithUuid = WithUuid;
//# sourceMappingURL=with-uuid.mixin.js.map