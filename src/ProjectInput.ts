import { Post } from "./validators.js";
import { validate, ValidationOptions } from "class-validator";
import { Resource, ResourceStorage, Result } from "./resource.js";
import { ProjectOutput } from "./ProjectOutput.js";
// autobind decorator
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  console.log(descriptor);
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

// return type to specify the action for the addResource function
enum InputType {
  Insert = "insert",
  Borrow = "borrow",
}

// a "generator" function to set appropriate name for resource
function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

// ProjectInput Class
export class ProjectInput<T extends HTMLSelectElement | HTMLInputElement> {

  element: HTMLFormElement;
  nameInputElement: T;
  amountInputElement: HTMLInputElement;

  constructor(
    formElement: string,
    nameElement: string, // input text for name of resource
    amountElement: string // input text for amount of resource
  ) {
    this.element = document.querySelector(`#${formElement}`) as HTMLFormElement;

    this.nameInputElement = this.element.querySelector(
      `#${nameElement}`
    ) as T;

    
    this.amountInputElement = this.element.querySelector(
      `#${amountElement}`
    ) as HTMLInputElement;

    this.configure();
  }


  public gatherUserInput(): [string, number] | void {
    // a function for retrieving inputs from text inputs in form
    const enteredName = this.nameInputElement.value;
    const enteredAmount = this.amountInputElement.value;
 
 
    return [enteredName, +enteredAmount];
  }

  public clearInputs() {
    // reseting default to inputs in form
    this.nameInputElement.value = "";
    this.amountInputElement.value = "";
  }

  @autobind
  public async submitHandler(event: Event) {
    // a listner for both forms for adding a new resource or updating an existing one
    event.preventDefault();
    const userInput = this.gatherUserInput(); // retrieve inputs from form
    if (Array.isArray(userInput)) { // if there are inputs
      let validator = new Post();
      [validator.title, validator.amount] = userInput;
      if (await validator.validate()) { // validate if inputs are appropriate and valid
        validator.title = toTitleCase(validator.title.trim()); // after validator convert title to appropriate one
        // first validate the input
        if (this.nameInputElement instanceof HTMLInputElement) {
          // in case of inserting a new resource or existing resource
          if (
            data.addResource(validator.title, validator.amount) ===
            Result.Add // if the action is adding a new resource
          ) {
            this.addOptionBorrow(validator.title); // adds option to the borrow select options
          }
        } else {
          // in case of borrowing a resource
          // action can only reduce amount from existing resource
          data.UpdateExistingItemOrBorrowItem = new Resource(
            validator.title,
            -Math.abs(validator.amount)
            // makes negative to reduce resource amount
          );
        }
      }
      this.clearInputs();
    } else {
      console.log("inputs are invalid");
    }
  }

  public configure() {
    // a listner for both forms for adding a new resource or updating an existing one
    this.element.addEventListener("submit", this.submitHandler);
    if (this.nameInputElement instanceof HTMLSelectElement) {
      // a listner for the second form for removing empty or unincluded resources
      this.element.addEventListener("submit", this.amountHandler);
    }
  }

  public addOptionBorrow(title: string) {
    // a function for first form for adding a new item to select list of the second form

    let select = document.getElementById("list")!;
    let newOption = document.createElement("option");
    newOption.value = title;
    newOption.id = "option-" + title; // stating it's an option to prevent from amountHandler function to remove any HTMLElement that isn't an option from select list
    console.log(newOption.tagName + " " + newOption.nodeName);
    newOption.innerHTML = title;
    select.appendChild(newOption);
    console.log(select);
  }

  @autobind
  public amountHandler(event: Event) {
    // a function to remove empty resurces from borrow select list
    let select = document.getElementById("list")! as HTMLSelectElement;
    if (data.getResources) {
      let array = Array.from(select.options);
      for (let i = 0; i < select.length; i++) {
        let check = data.getResources?.slice().filter((r) => {
          if (r.getResourceName.localeCompare(select.options[i].value) === 0) // check if option exists in resources array
            return true;
          else return false;
        }); // filter to know if resource option still included in the array
        if (Array.isArray(check) && check.length < 1)
          // resource option isn't included in array, resource was empty and deleted
          select.options.remove(i);
        //therefore remove the option of empty resource from options list
      }
    }
  }
}

export const data = ResourceStorage.getInstance();
// first insertion form
const prjInputInsert = new ProjectInput<HTMLInputElement>(
  "formInsert",
  "type",
  "amountInsertion"
);
// second borrow form
const prjInputBorrow = new ProjectInput<HTMLSelectElement>(
  "formBorrow",
  "list",
  "amountBorrow"
);
//third window for output of resources status
export const prjOutput = new ProjectOutput();
