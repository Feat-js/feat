module.exports = {
    name: "NavItem",
    FeatAttributesSupport: true,
    description: "NavItem component",
    selfClosing: true,
    attributes: [
        {
            name: "name",
            type: "string",
            description: "The name of the item",
            required: true
        },
        {
            name: "href",
            type: "string",
            description: "The href of the item",
            required: true
        }
    ],
    code: (attributes, content, data, registerComponent) => {
        /*
        Src: ""
        */

        return `<li class="nav-item">
                    <a class="nav-link" href="${attributes.href}">${attributes.name}</a>
                </li>`;

    }
}   