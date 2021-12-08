<br><br>
<p align="center">
  <img src="https://github.com/Feat-js/assets/blob/main/feat.js-icon_text.png?raw=true" width="50%"/>
</p>

# FeatJS - A JavaScript library for easy, powerful and 1fast web development

## Features:
- [x] Custom Components using JS
- [x] Custom attributes using JS
- [x] Templating using ``<Include>`` tags
- [x] Variables with ``{{ }}``
- [x] Integrated tags like Foreach, If, Else, Switch, etc.
- [x] Integrated attributes like if, disabled, checked, etc.
- [X] Express support!
 
## Soon:
- [ ] Typescript Support
- [ ] Advanced event system
- [ ] More advanced tags
- [ ] State management
- [ ] And more!


# Documentation

FeatJS is very new, but luckily made to be easy to understand and use.

## Setup

Installing feat is very easy you can simply run
```vb
npm i feat.js
```

After you have installed it simply put in the following code under the line where you define your express app (More webserver support to be added soon)
```js
let Feat = require("feat.js")
let feat = new Feat(app);
```

By Default views will be located in your cwd folder.

## Rendering a page

Simply in your route you can do the following
```js
res.render("pathToView", {});
```
pathToView = the path to the view file.
{} = the data you want to pass to the view.

## Components

Components are the main way to create custom elements.
You can import a component by doing the following
```html
<Components src="pathToComponent" />
``` 
In "src" you can specify the path to the component.

In the component file you can define the following
```js
module.exports = {
    name: "If", //Name of your component
    FeatAttributesSupport: true, //If you want to be able to use "feat:" attributes in your component
    description: "If statement. will execute the code block if the condition is true.", //Description of your component
    selfClosing: false, //If your component is self closing or not
    attributes: [
        {
            name: "condition", //Name of the attribute
            type: "string", //Type of the attribute
            description: "The condition to check. If true, the code block will be executed.", //Description of the attribute
            required: true //If the attribute is required or not
        }
    ],
    code: (attributes, content, data, blb, registerComponent, imports) => {
    /*
    attributes = the attributes of your component (the attributes you defined in the attributes array)
    content = the content of your component (the content contained within the tags)
    data = the data you want to pass to your component (data passed to the data pull function)
    blb = the blob of your component (this is a list of js code you can pass to the data pull function)
    registerComponent = a function to register your component (not required, can be removed)
    */
    
    //Here you can specify code and do whatever you want.
    //In order to get a variablfrom the data you can use the following syntax

    // let value = imports.pullData("dataYouWantToGet", data, blb);

    //if you want to parse variables in an entire string you can use the following syntax

    // let value = imports.parseVariable("{{variable}}", data, blb);

    //With both of these functions you can specify additional local variables to the data that is getting pulled (useful for foreach for example)
    });
}   
```

The component above (if imported) than can be called using the following syntax

```html
<If condition="true">
    <p>This will be displayed</p>
</If>
```

Of course you still need the code to handle the data you want to pass to your component.
But you can look around on github how we do it.
One thing that is not required is to use the "registerComponent" function.
registerComponent is used to register another component (Say if you want to create an UI kit for example).

## Internal Components

** <Component src="pathToComponent" /> **
This will import the component for you.

** <Include src="pathToView" /> **
This will import the selected view for you and render it.

** <Foreach in="array" as="name"> **
This will loop through the array and render the content within the tags for each element.

** <If condition="conditionHere"> **
This will render the content within the tags if the condition is true.
Do note however that with variables there are multiple ways to do this.
You can use the following syntaxes:

```
{{ variable === true }} (works)
{{ variable }} === true (works)
{{ variable }} (works)
1 === 1 (works)
variable (does not work)
```
## Functions

In Feat.js there are some standalone functions that can be used.

**feat.render(view: string, options: object, callback: function)**
This will render the view and pass the options to the view.
The callback function will be called when the view is rendered.

```
callback(err, html)
```

# Contributing

## Contributing to FeatJS

If you want to contribute to FeatJS you can do the following:
- Fork the repository on github
- Create a new branch
- Create a pull request

You can contribute by:
- Adding new features
- Fixing bugs
- Adding new components
- Creating extentions to ide's for supporting feat

Please make sure to read the Contributing Guidelines.
One very important thing to do is to make sure that your code is well documented.
You can do this by adding a README.md file to your repository.
This will help other people to understand your code.

One more thing to do is to make sure that your code is well tested AND that your code does not change the core features and behavior of FeatJS and that it does break other people's code.

If you have any questions or suggestions please feel free to open an issue on github.
You can also ask questions in the #questions channel on the discord server.

Thank you very much for your contribution!

## Fair use and copyright

Please make sure to read the license file and make sure that you include the license in your code.
You are also not allowed to say that you created feat.js, The skyswift team made it. and our contributors helped us.
we also would like to point out that we are not responsible for any damage that happens or anything that happens to you.
If you have any questions about this please feel free to open an issue on github.

## Contributing Guidelines

Please make sure to read the following guidelines before you start contributing to FeatJS.
If you have any questions about these guidelines please feel free to open an issue on github.

### 1. Code Formatting

Please make sure that your code is well formatted.
This means that you should use the same indentation and spacing as we do.
If you have any questions about this please feel free to open an issue on github.

### 2. Documentation

Please make sure that your code is well documented.
This means that you should provide a README.md file with all of your code.
If you have any questions about this please feel free to open an issue on github.

### 3. Testing

Please make sure that your code is well tested.
This means that you should test your code before you push it to github.
If you have any questions about this please feel free to open an issue on github.

### 4. Code Quality

Please make sure that your code is well tested AND that your code does not change the core features and behavior of FeatJS and that it does break other people's code.
If you have any questions about this please feel free to open an issue on github.

### 5. Once again, Do not change core behaviour

Please make sure that you do not change the core features and behavior of FeatJS.
If you do this you will break other people's code.
Thus your pr will be rejected and you will be asked to fix your code.
If you have any questions about this please feel free to open an issue on github.

### 6. Fair use and copyright

Please make sure that you include the license in your code.
You are also not allowed to say that you created feat.js, The skyswift team made it. and our contributors helped us.
we also would like to point out that we are not responsible for any damage that happens or anything that happens to you.
If you have any questions about this please feel free to open an issue on github.

## 7. Have fun

Please make sure that you have fun while contributing to FeatJS.
Fun is the key to a good contribution. Don't be afraid to ask for help if you need it :)



