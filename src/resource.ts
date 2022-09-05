// Project State Management
type Listener = (items: Resource[]) => void;

export class Resource {
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
export class ResourceStorage {
  private listeners: Listener[] = [];
  private resources: Resource[] = [];
  private static instance: ResourceStorage;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ResourceStorage();
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addResource(title: string, amount: number) {
    const newResource = new Resource(
      title,
      amount
      // ProjectStatus.Active
    );
    this.resources.push(newResource);
    for (const listenerFn of this.listeners) {
      listenerFn(this.resources.slice());
    }
  }
  get getResources(){
    if(this.resources[0].getResourceName)
    return this.resources[0].getResourceName;
    else return "null";
  }
}

// export declare var data : ResourceStorage;
// data = ResourceStorage.getInstance();


// const item: Resource = new Resource("water", 100);
// item.updateResourceAmount = 4;
// let p = document.getElementById("status");
// if (p) {
//   p.innerHTML = item.getResourceAmount + item.getResourceName;
// }
// console.log(item.getResourceAmount + item.getResourceName);
