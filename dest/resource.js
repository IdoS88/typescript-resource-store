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
        this.addListener(this.uniqByReduce);
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
        //
        const newResource = new Resource(title, amount
        // ProjectStatus.Active
        );
        if (this.resources.push(newResource))
            console.log("push");
        for (const listenerFn of this.listeners) {
            this[listenerFn.name](this.resources.slice());
            console.log(listenerFn);
        }
        return true;
    }
    get getResources() {
        if (this.resources)
            return this.resources;
        else
            return "null";
    }
    set setResources(array) {
        this.resources = array;
    }
    get getResourcesLength() {
        return this.resources.length;
    }
    uniqByReduce(array) {
        this.setResources = array.reduce((acc, cur) => {
            if (!acc.includes(cur)) {
                acc.push(cur);
            }
            else if (acc.slice().filter(function (r) {
                return r.getResourceName === cur.getResourceName;
            }).length > 1) {
                alert(`update given resource: ${cur.getResourceName} with given amount: ${cur.getResourceAmount}`);
                console.log(`update given resource: ${cur.getResourceName} with given amount: ${cur.getResourceAmount}`);
                // checks wether checked resource included in the array and just update it's amount
                const i = acc.findIndex((r) => r.getResourceName === cur.getResourceName);
                if (cur.getResourceAmount >= acc[i].getResourceAmount) {
                    // index must be above -1 becuase it was questioned in the last if statement
                    acc[i] = acc.pop();
                }
                else {
                    acc.pop();
                    alert("Cannot update amount less than actual amount. for that please withdraw the amount that been taken");
                }
            }
            return acc;
        }, []);
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