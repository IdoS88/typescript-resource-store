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
exports.prjOutput = exports.data = exports.ProjectInput = exports.autobind = void 0;
const validators_js_1 = require("./validators.js");
const resource_js_1 = require("./resource.js");
const ProjectOutput_js_1 = require("./ProjectOutput.js");
// autobind decorator
function autobind(_, _2, descriptor) {
    console.log(descriptor);
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
// return type to specify the action for the addResource function
var InputType;
(function (InputType) {
    InputType["Insert"] = "insert";
    InputType["Borrow"] = "borrow";
})(InputType || (InputType = {}));
// a "generator" function to set appropriate name for resource
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
// ProjectInput Class
class ProjectInput {
    constructor(formElement, nameElement, // input text for name of resource
    amountElement // input text for amount of resource
    ) {
        this.element = document.querySelector(`#${formElement}`);
        this.nameInputElement = this.element.querySelector(`#${nameElement}`);
        this.amountInputElement = this.element.querySelector(`#${amountElement}`);
        this.configure();
    }
    gatherUserInput() {
        // a function for retrieving inputs from text inputs in form
        const enteredName = this.nameInputElement.value;
        const enteredAmount = this.amountInputElement.value;
        return [enteredName, +enteredAmount];
    }
    clearInputs() {
        // reseting default to inputs in form
        this.nameInputElement.value = "";
        this.amountInputElement.value = "";
    }
    submitHandler(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // a listner for both forms for adding a new resource or updating an existing one
            event.preventDefault();
            const userInput = this.gatherUserInput(); // retrieve inputs from form
            if (Array.isArray(userInput)) { // if there are inputs
                let validator = new validators_js_1.Post();
                [validator.title, validator.amount] = userInput;
                if (yield validator.validate()) { // validate if inputs are appropriate and valid
                    validator.title = toTitleCase(validator.title.trim()); // after validator convert title to appropriate one
                    // first validate the input
                    if (this.nameInputElement instanceof HTMLInputElement) {
                        // in case of inserting a new resource or existing resource
                        if (exports.data.addResource(validator.title, validator.amount) ===
                            resource_js_1.Result.Add // if the action is adding a new resource
                        ) {
                            this.addOptionBorrow(validator.title); // adds option to the borrow select options
                        }
                    }
                    else {
                        // in case of borrowing a resource
                        // action can only reduce amount from existing resource
                        exports.data.UpdateExistingItemOrBorrowItem = new resource_js_1.Resource(validator.title, -Math.abs(validator.amount)
                        // makes negative to reduce resource amount
                        );
                    }
                }
                this.clearInputs();
            }
            else {
                console.log("inputs are invalid");
            }
        });
    }
    configure() {
        // a listner for both forms for adding a new resource or updating an existing one
        this.element.addEventListener("submit", this.submitHandler);
        if (this.nameInputElement instanceof HTMLSelectElement) {
            // a listner for the second form for removing empty or unincluded resources
            this.element.addEventListener("submit", this.amountHandler);
        }
    }
    addOptionBorrow(title) {
        // a function for first form for adding a new item to select list of the second form
        let select = document.getElementById("list");
        let newOption = document.createElement("option");
        newOption.value = title;
        newOption.id = "option-" + title; // stating it's an option to prevent from amountHandler function to remove any HTMLElement that isn't an option from select list
        console.log(newOption.tagName + " " + newOption.nodeName);
        newOption.innerHTML = title;
        select.appendChild(newOption);
        console.log(select);
    }
    amountHandler(event) {
        var _a;
        // a function to remove empty resurces from borrow select list
        let select = document.getElementById("list");
        if (exports.data.getResources) {
            let array = Array.from(select.options);
            for (let i = 0; i < select.length; i++) {
                let check = (_a = exports.data.getResources) === null || _a === void 0 ? void 0 : _a.slice().filter((r) => {
                    if (r.getResourceName.localeCompare(select.options[i].value) === 0) // check if option exists in resources array
                        return true;
                    else
                        return false;
                }); // filter to know if resource option still included in the array
                if (Array.isArray(check) && check.length < 1)
                    // resource option isn't included in array, resource was empty and deleted
                    select.options.remove(i);
                //therefore remove the option of empty resource from options list
            }
        }
    }
}
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", Promise)
], ProjectInput.prototype, "submitHandler", null);
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ProjectInput.prototype, "amountHandler", null);
exports.ProjectInput = ProjectInput;
exports.data = resource_js_1.ResourceStorage.getInstance();
// first insertion form
const prjInputInsert = new ProjectInput("formInsert", "type", "amountInsertion");
// second borrow form
const prjInputBorrow = new ProjectInput("formBorrow", "list", "amountBorrow");
//third window for output of resources status
exports.prjOutput = new ProjectOutput_js_1.ProjectOutput();
//# sourceMappingURL=ProjectInput.js.map