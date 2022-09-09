import { Post, PostInsertion } from "./validators.js";
import { ValidationOptions } from "class-validator";
import { Resource, ResourceStorage } from "./resource.js";
import { Http2ServerRequest } from "http2";
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
    amountElement: string,
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
        if (this.nameInputElement instanceof HTMLInputElement) {
          // in case of inserting a new resource or existing resource
          if (data.addResource(validator.title.trim(), validator.amount))
            console.log("added resource");
        } else {
          // in case of borrowing a resource
          data.UpdateExistingItemOrBorrowItem = new Resource(
            validator.title,
            validator.amount
          );
          console.log("borrow resource");
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
}

// export declare var data : ResourceStorage;
const data = ResourceStorage.getInstance();
try {
  const prjInput = new ProjectInput(
    "status",
    "formInsert",
    "type",
    "amountInsertion",
  );
} catch (e) {
  console.log("no favicon");
  console.log(e);
}
