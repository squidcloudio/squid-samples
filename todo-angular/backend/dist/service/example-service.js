"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleService = void 0;
const tslib_1 = require("tslib");
const backend_1 = require("@squidcloud/backend");
class ExampleService extends backend_1.SquidService {
    async handleTodoDelete(request) {
        let itemsFormCurrentTodo;
        console.log(request.squidDocId);
        if (request.mutationType === "delete") {
            itemsFormCurrentTodo = await this.squid
                .collection("items")
                .query()
                .where("todoId", "==", request.squidDocId)
                .snapshot();
        }
    }
}
tslib_1.__decorate([
    (0, backend_1.trigger)("local", "todos"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExampleService.prototype, "handleTodoDelete", null);
exports.ExampleService = ExampleService;
//# sourceMappingURL=example-service.js.map