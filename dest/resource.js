"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceStorage = exports.Resource = void 0;
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
        const newResource = new Resource(title, amount
        // ProjectStatus.Active
        );
        this.resources.push(newResource);
        for (const listenerFn of this.listeners) {
            listenerFn(this.resources.slice());
        }
    }
    get getResources() {
        if (this.resources[0].getResourceName)
            return this.resources[0].getResourceName;
        else
            return "null";
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