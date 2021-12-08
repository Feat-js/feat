module.exports = {
    name: "Navigation",
    FeatAttributesSupport: true,
    description: "Navigation Bar",
    selfClosing: false,
    attributes: [
        {
            name: "title",
            type: "string",
            description: "The title of the navigation bar",
            required: true
        },
        {
            name: "href",
            type: "string",
            description: "The href of the navigation bar",
            required: true
        }
    ],
    code: (attributes, content, data, registerComponent) => {
        /*
        Src: ""
        */

        return `
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="${attributes.href}">${attributes.title}</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        ${content}
                    </ul>
                </div>
            </div>
        </nav>
        `;

    }
}   