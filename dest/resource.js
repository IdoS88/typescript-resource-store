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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceStorage = exports.Resource = exports.Result = void 0;
const class_validator_1 = require("class-validator");
var Result;
(function (Result) {
    Result[Result["Add"] = 0] = "Add";
    Result[Result["Update"] = 1] = "Update";
})(Result = exports.Result || (exports.Result = {}));
class Resource {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
    set updateResourceAmount(amount) {
        this.amount += amount;
    }
    get getResourceName() {
        return this.name;
    }
    get getResourceAmount() {
        return this.amount;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Resource.prototype, "amount", void 0);
exports.Resource = Resource;
class ResourceStorage {
    constructor() {
        this.listeners = [];
        this.resources = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ResourceStorage();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addResource(title, amount) {
        // create instance of resource
        const nr = new Resource(title, amount
        // ProjectStatus.Active
        );
        // first checks if input isn't for the first item of resource storage array or if it's of an existing item
        //because there are 2 options wether we want to add a new item or update existing item
        if (Array.isArray(this.getResources) &&
            this.getResources.length !== 0 &&
            this.getResources.some(function (r) {
                return r.getResourceName === title;
            })) {
            // update item
            this.UpdateExistingItemOrBorrowItem = nr;
            return Result.Update;
        }
        else if (this.resources.push(nr)) {
            console.log("push new item");
            // add a new item to resources array
        }
        for (const listenerFn of this.listeners) {
            this[listenerFn.name](this.resources.slice());
            // console.log(listenerFn);
        }
        return Result.Add;
    }
    get getResources() {
        if (this.resources)
            return this.resources;
        else
            return null;
    }
    set setResources(array) {
        this.resources = array;
    }
    get getResourcesLength() {
        return this.resources.length;
    }
    // uniqByReduce(array: Resource[]) {
    //   this.setResources = array.reduce((acc: Resource[], cur: Resource) => {
    //     if (!acc.includes(cur)) {
    //       acc.push(cur);
    //     } else if (
    //       acc.slice().filter(function (r) {
    //         return r.getResourceName === cur.getResourceName;
    //       }).length > 1
    //     ) {
    //       alert(
    //         `update given resource: ${cur.getResourceName} with given amount: ${cur.getResourceAmount}`
    //       );
    //       console.log(
    //         `update given resource: ${cur.getResourceName} with given amount: ${cur.getResourceAmount}`
    //       );
    //       // checks wether checked resource included in the array and just update it's amount
    //       const i = acc.findIndex(
    //         (r) => r.getResourceName === cur.getResourceName
    //       );
    //       if (cur.getResourceAmount >= acc[i].getResourceAmount) {
    //         // index must be above -1 becuase it was questioned in the last if statement
    //         acc[i] = acc.pop() as Resource;
    //       } else {
    //         acc.pop();
    //         alert(
    //           "Cannot update amount less than actual amount. for that please withdraw the amount that been taken"
    //         );
    //       }
    //     }
    //     return acc;
    //   }, []);
    // }
    set UpdateExistingItemOrBorrowItem(r) {
        //a function to update existing item amount
        const i = this.resources.findIndex((checked) => checked.getResourceName === r.getResourceName);
        // find existing item to be able to update
        if (Array.isArray(this.getResources)) {
            // stores previous amount to add new amount and for log porpouses
            const previousAmount = this.getResources[i].getResourceAmount;
            try {
                const sum = r.getResourceAmount + previousAmount;
                if (sum < 0) {
                    alert("Cannot take more than " + previousAmount + " from this resource");
                    console.log("Cannot take more than " + previousAmount + " from this resource");
                    return;
                }
                alert(`update given resource: ${r.getResourceName} with given amount: ${sum}`);
                console.log(`update given resource: ${r.getResourceName} with given amount: ${sum}`);
            }
            catch (err) {
                // throw new Error("Update failed: updated amount is not in range (1 - "+Number.MAX_SAFE_INTEGER+")");
                alert("Update failed: updated amount is not in range (1 - " +
                    Number.MAX_SAFE_INTEGER +
                    ")");
                console.log("Update failed: updated amount is not in range (1 - " +
                    Number.MAX_SAFE_INTEGER +
                    ")");
                console.log(err);
                return;
            }
            this.getResources[i].updateResourceAmount = r.getResourceAmount;
            return;
        }
        else {
            throw new Error("Update failed: there isn't any item in the storage");
        }
    }
}
exports.ResourceStorage = ResourceStorage;
// export declare var data : ResourceStorage;
// data = ResourceStorage.getInstance();
// const item: Resource = new Resource("water", 100);
// item.updateResourceAmount = 4;
// let p = document.getElementById("status");
// if (p) {
//   p.innerHTML = item.getResourceAmount + item.getResourceName;
// }
// console.log(item.getResourceAmount + item.getResourceName);
//# sourceMappingURL=resource.js.map