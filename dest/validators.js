"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const class_validator_1 = require("class-validator");
class Post {
    // [Symbol.iterator]: function* () {
    //   let properties = Object.keys(this);
    //   for (let i of properties) {
    //       yield [i, this[i]];
    //   }
    set setTitle(title) {
        this.title = title;
    }
    set setAmount(amount) {
        this.amount = amount;
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            //alert function for showing errors infront
            function alertAllErrors(errors) {
                // errors is an array of validation errors
                // has property object 'constraints' which has the error description messages
                errors.forEach((element) => {
                    if (element.constraints) {
                        for (const value of Object.values(element.constraints)) {
                            alert(value);
                        }
                    }
                });
            }
            const valErrors = yield (0, class_validator_1.validate)(this);
            if (valErrors.length > 0) {
                console.log("validation failed. errors: ", valErrors);
                alertAllErrors(valErrors);
                return false;
                // return valErrors;
            }
            else {
                console.log("validation succeed");
                return true;
                // return valErrors;
            }
            // return errors;
            return false;
        });
    }
}
__decorate([
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.Max)(Number.MAX_SAFE_INTEGER),
    (0, class_validator_1.Min)(1)
    // @Max(10)
    ,
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Post.prototype, "amount", void 0);
exports.Post = Post;
//# sourceMappingURL=validators.js.map