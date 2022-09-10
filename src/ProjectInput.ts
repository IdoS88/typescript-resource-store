import { Post } from "./validators.js";
import { ValidationOptions } from "class-validator";
import { Resource, ResourceStorage, Result} from "./resource.js";
import {ProjectOutput} from "./ProjectOutput.js"
// autobind decorator
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
enum InputType {
  Insert = "insert",
  Borrow = "borrow",
}

// ProjectInput Class
export class ProjectInput<T extends HTMLSelectElement | HTMLInputElement> {
  //   templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  nameInputElement: T;
  amountInputElement: HTMLInputElement;
  // peopleInputElement: HTMLInputElement;

  constructor(
    divElement: string,
    formElement: string,
    nameElement: string,
    amountElement: string
  ) {
    // this.templateElement = document.getElementById(
    //   'project-input'
    // )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(divElement)! as HTMLDivElement;
    // const importedNode = document.importNode(
    //   this.templateElement.content,
    //   true
    // );
    this.element = document.querySelector(`#${formElement}`) as HTMLFormElement;
    //"#formInsert"
    // this.element.id = 'user-input';
    if (this.element == null) console.log("null element");
    this.nameInputElement = this.element.querySelector(
      `#${nameElement}`
      //"#type"
    ) as T;
    if (this.nameInputElement == null) console.log("null element");
    this.amountInputElement = this.element.querySelector(
      `#${amountElement}`
      // "#amountInsertion"
    ) as HTMLInputElement;
    // this.peopleInputElement = this.element.querySelector(
    //   '#people'
    // ) as HTMLInputElement;

    this.configure();
    // this.attach();
  }
  public gatherUserInput(): [string, number] | void {
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

  public clearInputs() {
    this.nameInputElement.value = "";
    this.amountInputElement.value = "";
    // this.peopleInputElement.value = '';
  }

  @autobind
  public async submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      let validator = new Post();
      [validator.title, validator.amount] = userInput;
      console.log(validator.title);
      console.log(validator.amount);
      if (await validator.validate()) {
        // first validate the input
        if (this.nameInputElement instanceof HTMLInputElement) {
          console.log("input name")
          // in case of inserting a new resource or existing resource
          if (data.addResource(validator.title.trim(), validator.amount) === Result.Add ) {
            this.addOptionBorrow(validator.title); // adds option to the borrow select options
          }
        } else {
          // in case of borrowing a resource
          console.log("select input")
          data.UpdateExistingItemOrBorrowItem = new Resource(
            validator.title.trim(),
            -Math.abs(validator.amount)
            // makes negative to reduce resource amount
          );
          console.log("borrow resource");

          this.amountHandler();
          //remove empty resources
        }
      }
      this.clearInputs();
      console.log(data.getResources);
    } else {
      console.log(userInput);
    }
  }

  public configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  //   private attach() {
  //     this.hostElement.insertAdjacentElement('afterbegin', this.element);
  //   }
  public addOptionBorrow(title: string) {
    // a function for first form for adding a new item to select list of the second form

    let select = document.getElementById("list")!;
    let newOption = document.createElement("option");
    newOption.value = title;
    newOption.id = title;
    newOption.innerHTML = title;
    select.appendChild(newOption);
  }

  public amountHandler() {
    // a function to remove empty resurces from borrow select list
    let select = document.getElementById("list")!;
    if (data.getResources) {
      data.getResources.forEach((r) => {
        let node = document.getElementById(r.getResourceName)!;
        if (r.getResourceAmount === 0) {
          select.removeChild(node);
          // remove the option of empty resource from options list
        }
      });
    }
  }
}

// export declare var data : ResourceStorage;
export const data = ResourceStorage.getInstance();
try {
  const prjInputInsert = new ProjectInput<HTMLInputElement>(
    "status",
    "formInsert",
    "type",
    "amountInsertion"
  );
  const prjInputBorrow = new ProjectInput<HTMLSelectElement>(
    "status",
    "formBorrow",
    "list",
    "amountBorrow"
  );
  const prjOutput = new ProjectOutput();
} catch (e) {
  console.log("no favicon");
  console.log(e);
}
