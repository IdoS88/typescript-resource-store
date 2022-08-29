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
const item = new Resource("water", 100);
item.updateResourceAmount = 4;
let p = document.getElementById("status");
if (p) {
    p.innerHTML = item.getResourceAmount + item.getResourceName;
}
console.log(item.getResourceAmount + item.getResourceName);
