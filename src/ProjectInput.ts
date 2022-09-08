import { Post } from "./validators.js";
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

// ProjectInput Class
export class ProjectInput <T extends HTMLSelectElement | HTMLInputElement>{
  //   templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  nameInputElement: T;
  amountInputElement: HTMLInputElement;
  // peopleInputElement: HTMLInputElement;

  constructor(divElement:string,formElement:string, nameElement:string,amountElement:string) {
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
    this.nameInputElement = this.element.getElementById(`#${nameElement}`
      //"#type"
    );
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
  public async submitHandlerInsertion(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      let validator = new Post();
      [validator.title, validator.amount] = userInput;
      console.log(validator.title);
      console.log(validator.amount);
      if (await validator.validate()) {      
        if (data.addResource(validator.title.trim(), validator.amount))
          console.log("added resource");
      }
      this.clearInputs();
      console.log(data.getResources);
    } else {
      console.log(userInput);
    }
  }
  @autobind
  public async submitHandlerBorrow(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      let validator = new Post();
      [validator.title, validator.amount] = userInput;
      console.log(validator.title);
      console.log(validator.amount);
      if (await validator.validate()) {      
   
    }
  }

  public configure() {
    if(this.nameInputElement instanceof HTMLInputElement){
    this.element.addEventListener("submit", this.submitHandlerInsertion);
    }
    else{
    this.element.addEventListener("submit", this.submitHandlerBorrow);
    }
  }

  //   private attach() {
  //     this.hostElement.insertAdjacentElement('afterbegin', this.element);
  //   }
}

// export declare var data : ResourceStorage;
const data = ResourceStorage.getInstance();
try{
const prjInput = new ProjectInput();
}
catch (e){ console.log("no favicon");}