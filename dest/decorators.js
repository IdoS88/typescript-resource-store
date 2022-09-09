"use strict";
function isAnInteger(target, name, position) {
    if (!Number.isInteger(target))
        throw new Error("index must be an integer");
}
function isUndefined(target, name, position) {
    if (target == "undefined")
        throw new Error("borrowed amount cannot be undefined");
}
//# sourceMappingURL=decorators.js.map