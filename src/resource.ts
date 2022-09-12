import { IsInt, validate } from "class-validator";
import { Post } from "./validators";
import { prjOutput } from "./ProjectInput.js";

// Project State Management
type Listener = (items: Resource[]) => void;
export enum Result {
  Add,
  Update,
}

export class Resource {
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
  [f: string]: any; // for generic listener execution
  private listeners: Listener[] = [];
  private resources: Resource[] = [];
  private static instance: ResourceStorage;

  private constructor() {
    this.addListener(this.removesEmptyResources);
  }

  public removesEmptyResources(resources: Resource[]) { 
    // remove/filter existing resources from resources array with amount of 0 == empty
    const relevantResources = resources.filter((r) => {
      if (r.getResourceAmount > 0) {
        return true;
      } else return false;
    });

    this.setResources = relevantResources;
  }
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

  executeListeners() {
    for (const listenerFn of this.listeners) {
      // (this as any)[listenerFn.name](this.resources.slice());
      this[listenerFn.name](this.resources);
    }
  }

  addResource(title: string, amount: number): Result | null {
    // a complex function for adding a new resource or updating an existing resource (+/- amount)
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
      this.getResources.length > 0 &&
      this.getResources.some(function (r) {
        return r.getResourceName === title;
      })
    ) {
      // update item
      this.UpdateExistingItemOrBorrowItem = nr;
      return Result.Update;
    } else if (this.resources.push(nr)) {
      console.log("push new item");
      // add a new item to resources array
      this.executeListeners();
      prjOutput.renderResources(this.resources); // rendering the new data for output status  
      return Result.Add;
    }
    return null; // failed
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
  
  set UpdateExistingItemOrBorrowItem(r: Resource) {
    //a function to update existing item amount (+/- amount)
    const i = this.resources.findIndex(
      (checked) => checked.getResourceName === r.getResourceName
    );
    // find existing item to be able to update

    if (Array.isArray(this.getResources)) {
      // stores previous amount to add new amount and for validation
      const previousAmount = this.getResources[i].getResourceAmount;
      try {
        const sum = r.getResourceAmount + previousAmount; // total amount

        if (sum < 0) { // validation we have sufficient amount
          alert(
            "Cannot take more than " + previousAmount + " from this resource"
          );
          console.log(
            "Cannot take more than " + previousAmount + " from this resource"
          );
          return;
        }

        alert(
          `update given resource: ${r.getResourceName} with given amount: ${sum}`
        );
        console.log(
          `update given resource: ${r.getResourceName} with given amount: ${sum}`
        );
      } catch (err) {

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
      this.getResources[i].updateResourceAmount = r.getResourceAmount; // adding more amount or reducing amount
      this.executeListeners(); // removes empty resources from resource storage array
      prjOutput.renderResources(this.resources); // render updated status of resource storage array
      return;
    } else {
      throw new Error("Update failed: there isn't any item in the storage");
    }
  }
}
