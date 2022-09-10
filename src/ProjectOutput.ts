import { data } from "./ProjectInput";

export class ProjectOutput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor() {
    this.templateElement = document.getElementById(
      "storage-status"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("output")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = "output-project";
    if (this.element instanceof Element) console.log("element isn't undefined");
    // first output
    this.renderContent();

    data.addListener(this.renderResources);
    this.attach();
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
  private renderResources() {
    const content = document.getElementById("content")!; // paragraph created in rendercontent()
    content.innerHTML = ""; // reseting content text for new rendering
    if (data.getResources) {
      //rendering intro message
      if (data.getResourcesLength === 0) {
        this.renderDefaultMessage(content as HTMLParagraphElement);
      } else if (data.getResourcesLength === 1) {
        const textNode = document.createTextNode(
          "Currently there is " +
            data.getResourcesLength +
            " resource in storage: \r\n the resource is: \r\n "
        );
        content.appendChild(textNode);
      } else {
        const textNode = document.createTextNode(
          "Currently there are " +
            data.getResourcesLength +
            " resources in storage: \r\n the resources are: \r\n"
        );
        content.appendChild(textNode);
      }


      //rendering actual contents
      for (const prjItem of data.getResources) {
        content.textContent +=
          "\r\n resource name: " +
          prjItem.getResourceName +
          "\t amount: " +
          prjItem.getResourceAmount;
      }
    }
  }
  private renderDefaultMessage(p: HTMLParagraphElement) {
    const textNode = document.createTextNode(
      "Currently there aren't any resource in storage"
    );
    p.appendChild(textNode);
  }
  private renderContent() {
    // const headerId = "title";
    // this.element.querySelector('h2')!.id = headerId;
    this.element.querySelector("h2")!.textContent = "Storage Status"; // title header
    const p = document.createElement("p"); // paragraph for showing content
    this.renderDefaultMessage(p); // set default status message with no resources
    p.id = "content";
    this.element.appendChild(p);
  }
}
