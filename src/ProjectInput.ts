// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

// ProjectInput Class
class ProjectInput {
//   templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  nameInputElement: HTMLInputElement;
  amountInputElement: HTMLInputElement;
//   peopleInputElement: HTMLInputElement;

  constructor() {
    // this.templateElement = document.getElementById(
    //   'project-input'
    // )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('status')! as HTMLDivElement;

    // const importedNode = document.importNode(
    //   this.templateElement.content,
    //   true
    // );
    this.element = document.querySelector('#formInsert') as HTMLFormElement;
    // this.element.id = 'user-input';
    if(this.element == null)
        console.log("null element");
    this.nameInputElement = this.element?.querySelector(
      '#type'
    ) as HTMLInputElement;
    if(this.nameInputElement == null)
    console.log("null element");
    this.amountInputElement = this.element.querySelector(
      '#amountInsertion'
    ) as HTMLInputElement;
    // this.peopleInputElement = this.element.querySelector(
    //   '#people'
    // ) as HTMLInputElement;

    this.configure();
    // this.attach();
  }

  private gatherUserInput(): [string, number] | void {
    const enteredName = this.nameInputElement.value;
    const enteredAmount = this.amountInputElement.value;
    // const enteredPeople = this.peopleInputElement.value;

    if (
      enteredName.trim().length === 0 ||
      enteredAmount.trim().length === 0 
    //   ||enteredPeople.trim().length === 0
    ) {
      alert('Invalid input, please try again!');
      return;
    } else {
      return [enteredName, +enteredAmount];
    }
  }

  private clearInputs() {
    this.nameInputElement.value = '';
    this.amountInputElement.value = '';
    // this.peopleInputElement.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, amount] = userInput;
      console.log(title, amount);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

//   private attach() {
//     this.hostElement.insertAdjacentElement('afterbegin', this.element);
//   }
}

const prjInput = new ProjectInput();