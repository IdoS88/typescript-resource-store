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
exports.ProjectInput = exports.autobind = void 0;
const validators_js_1 = require("./validators.js");
const resource_js_1 = require("./resource.js");
// autobind decorator
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
exports.autobind = autobind;
// ProjectInput Class
class ProjectInput {
    // peopleInputElement: HTMLInputElement;
    constructor(divElement, formElement, nameElement, amountElement) {
        // this.templateElement = document.getElementById(
        //   'project-input'
        // )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(divElement);
        // const importedNode = document.importNode(
        //   this.templateElement.content,
        //   true
        // );
        this.element = document.querySelector(`#${formElement}`);
        //"#formInsert"
        // this.element.id = 'user-input';
        if (this.element == null)
            console.log("null element");
        this.nameInputElement = this.element.querySelector(`#${nameElement}`
        //"#type"
        );
        if (this.nameInputElement == null)
            console.log("null element");
        this.amountInputElement = this.element.querySelector(`#${amountElement}`
        // "#amountInsertion"
        );
        // this.peopleInputElement = this.element.querySelector(
        //   '#people'
        // ) as HTMLInputElement;
        this.configure();
        // this.attach();
    }
    gatherUserInput() {
        const enteredName = this.nameInputElement.value;
        const enteredAmount = this.amountInputElement.value;
        // const enteredPeople = this.peopleInputElement.value;
        // if (
        //   enteredName.trim().length === 1 ||
        //   enteredAmount.trim().length === 0
        //   //   ||enteredPeople.trim().length === 0
        // ) {
        //   alert("Invalid input, please try again!");
        //   return;
        // } else }
        return [enteredName, +enteredAmount];
        // }
    }
    clearInputs() {
        this.nameInputElement.value = "";
        this.amountInputElement.value = "";
        // this.peopleInputElement.value = '';
    }
    submitHandlerInsertion(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                let validator = new validators_js_1.Post();
                [validator.title, validator.amount] = userInput;
                console.log(validator.title);
                console.log(validator.amount);
                if (yield validator.validate()) {
                    if (data.addResource(validator.title.trim(), validator.amount))
                        console.log("added resource");
                }
                this.clearInputs();
                console.log(data.getResources);
            }
            else {
                console.log(userInput);
            }
        });
    }
    submitHandlerBorrow(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                let validator = new validators_js_1.Post();
                [validator.title, validator.amount] = userInput;
                console.log(validator.title);
                console.log(validator.amount);
                if (yield validator.validate()) {
                }
            }
        });
    }
    configure() {
        if (this.nameInputElement instanceof HTMLInputElement) {
            this.element.addEventListener("submit", this.submitHandlerInsertion);
        }
        else {
            this.element.addEventListener("submit", this.submitHandlerBorrow);
        }
    }
}
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", Promise)
], ProjectInput.prototype, "submitHandlerInsertion", null);
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", Promise)
], ProjectInput.prototype, "submitHandlerBorrow", null);
exports.ProjectInput = ProjectInput;
// export declare var data : ResourceStorage;
const data = resource_js_1.ResourceStorage.getInstance();
try {
    const prjInput = new ProjectInput("status", "formInsert", "type", "amountInsertion");
}
catch (e) {
    console.log("no favicon");
    console.log(e);
}
//# sourceMappingURL=ProjectInput.js.map