class Resource {
  private name: string;
  private amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
  public set updateResourceAmount(amount: number) {
    this.amount += amount;
  }
  public get getResourceName() {
    return this.name;
  }
  public get getResourceAmount() {
    return this.amount;
  }
}

// const item: Resource = new Resource("water", 100);
// item.updateResourceAmount = 4;
// let p = document.getElementById("status");
// if (p) {
//   p.innerHTML = item.getResourceAmount + item.getResourceName;
// }
// console.log(item.getResourceAmount + item.getResourceName);
