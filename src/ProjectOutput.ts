import { data } from "./ProjectInput.js";
import { Resource } from "./resource.js";

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
    this.attach();
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
  public renderResources(resources: Resource[]) {
    const content = document.getElementById("content")!; // paragraph created in rendercontent()
    content.innerHTML = ""; // reseting content text for new rendering
    if (resources) {
      //rendering intro message
      if (resources.length === 0) {
        this.renderDefaultMessage(content as HTMLParagraphElement);
      } else if (resources.length === 1) {
        const textNode = document.createTextNode(
          "Currently there is " +
            resources.length +
            " resource in storage: \r\n the resource is: \r\n "
        );
        content.appendChild(textNode);
      } else {
        const textNode = document.createTextNode(
          "Currently there are " +
            resources.length +
            " resources in storage: \r\n the resources are: \r\n"
        );
        content.appendChild(textNode);
      }


      //rendering actual contents
      for (const prjItem of resources) {
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
    p.id = "content";
    this.renderDefaultMessage(p); // set default status message with no resources
  }
}
