module.exports = {
    name: "Container",
    FeatAttributesSupport: true,
    description: "Container Div",
    selfClosing: false,
    attributes: [
        {
            name: "id",
            type: "string",
            description: "The id of the container",
            required: false
        }
    ],
    code: (attributes, content, data, registerComponent) => {
        /*
        Src: ""
        */

        let attr = [];
        if (attributes.id) attr.push(`id="${attributes.id}"`);

        return `
        <div class="container" ${attr.join(" ")}>
            ${content}
        </div>`;

    }
}   