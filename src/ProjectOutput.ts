import { data } from "./ProjectInput";

export class ProjectInput {
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


    data.addListener(this.renderProjects);
  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of data.getResources!) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    // const headerId = "title";
    // this.element.querySelector('h2')!.id = headerId;
    this.element.querySelector("h2")!.textContent = "Storage Status";
  }
}
