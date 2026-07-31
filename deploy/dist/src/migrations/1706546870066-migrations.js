"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1706546870066 = void 0;
class Migrations1706546870066 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }
}
exports.Migrations1706546870066 = Migrations1706546870066;
//# sourceMappingURL=1706546870066-migrations.js.map