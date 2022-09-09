import { IsInt, validate } from "class-validator";
import { Post, PostInsertion } from "./validators";

// Project State Management
type Listener = (items: Resource[]) => void;

export class Resource {
  [k: string]: any;
  private name: string;
  @IsInt()
  private amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
  public set updateResourceAmount(@isAnInteger amount: number) {
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
    // create instance of resource
    const nr = new Resource(
      title,
      amount
      // ProjectStatus.Active
    );
    // first checks if input isn't for the first item of resource storage array or if it's of an existing item
    //because there are 2 options wether we want to add a new item or update existing item
    if (
      Array.isArray(this.getResources) &&
      this.getResources.length !== 0 &&
      this.getResources.some(function (r) {
        return r.getResourceName === title;
      })
    ) {
      // update item
      this.UpdateExistingItemOrBorrowItem = nr;
      return false;
    } else if (this.resources.push(nr)) {
      console.log("push new item");
      // add a new item to resources array
    }

    for (const listenerFn of this.listeners) {
      (this as any)[listenerFn.name](this.resources.slice());
      // console.log(listenerFn);
    }
    return true;
  }
  get getResources() {
    if (this.resources) return this.resources;
    else return null;
  }
  set setResources(array: Resource[]) {
    this.resources = array;
  }
  get getResourcesLength(): number {
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
  set UpdateExistingItemOrBorrowItem(r: Resource) {
    //a function to update existing item amount
    const i = this.resources.findIndex(
      (checked) => checked.getResourceName === r.getResourceName
    );
    // find existing item to be able to update

    if (Array.isArray(this.getResources)) {
      // stores previous amount to add new amount and for log porpouses
      const previousAmount = this.getResources[i].getResourceAmount;
      try {
        const sum = r.getResourceAmount + previousAmount;

        if (sum < 1) {
          alert(
            "Cannot take more than " + previousAmount + " from this resource"
          );
          throw new Error(
            "Cannot take more than " + previousAmount + " from this resource"
          );
        }

        alert(
          `update given resource: ${r.getResourceName} with given amount: ${sum}`
        );
        console.log(
          `update given resource: ${r.getResourceName} with given amount: ${sum}`
        );
      } catch (err) {
        // throw new Error("Update failed: updated amount is not in range (1 - "+Number.MAX_SAFE_INTEGER+")");
        alert(
          "Update failed: updated amount is not in range (1 - " +
            Number.MAX_SAFE_INTEGER +
            ")"
        );
        console.log(
          "Update failed: updated amount is not in range (1 - " +
            Number.MAX_SAFE_INTEGER +
            ")"
        );
        console.log(err);
        return;
      }
      this.getResources[i].updateResourceAmount = r.getResourceAmount;
      return;
    } else {
      throw new Error("Update failed: there isn't any item in the storage");
    }
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
