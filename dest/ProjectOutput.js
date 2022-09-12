"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectOutput = void 0;
class ProjectOutput {
    constructor() {
        this.templateElement = document.getElementById("storage-status");
        this.hostElement = document.getElementById("output");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "output-project";
        if (this.element instanceof Element)
            console.log("element isn't undefined");
        // first output
        this.renderContent(); // render default messages in output
        this.attach(); // adding elements of output to div section
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
    renderResources(resources) {
        // a function for rendering the status output of resources storage
        const content = document.getElementById("content"); // paragraph created in rendercontent()
        content.innerHTML = ""; // reseting content text for new rendering
        if (resources) {
            //rendering intro message
            if (resources.length === 0) {
                this.renderDefaultMessage(content);
            }
            else if (resources.length === 1) {
                content.innerHTML =
                    "Currently there is " +
                        resources.length +
                        " resource in storage:<br> the resource is:<br> ";
            }
            else {
                content.innerHTML =
                    "Currently there are " +
                        resources.length +
                        " resources in storage: <br> the resources are: <br>";
            }
            //rendering actual content of resource storage
            for (const prjItem of resources) {
                if (content.textContent) {
                    content.innerHTML +=
                        "<br> resource name: " +
                            prjItem.getResourceName +
                            "\t amount: " +
                            prjItem.getResourceAmount;
                }
            }
        }
    }
    renderDefaultMessage(p) {
        const textNode = document.createTextNode("Currently there aren't any resource in storage");
        p.appendChild(textNode);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = "Storage Status"; // title header
        const p = document.createElement("p"); // paragraph for showing content
        p.id = "content";
        this.renderDefaultMessage(p); // set default status message with no resources
    }
}
exports.ProjectOutput = ProjectOutput;
//# sourceMappingURL=ProjectOutput.js.map