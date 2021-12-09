<br><br>
<p align="center">
  <img src="https://github.com/Feat-js/assets/blob/main/feat.js-icon_text.png?raw=true" width="50%"/>
</p>

# FeatJS - Frontend API

## Setup
A setup? Whatcha talkin' about? We here at Feat cooked up something really easy for ya!
Simply use our existing setup! And we'll import everything you need!

```js
Feat.<function> //Already defined for ya!
```
Feat frontend comes with some awesome state management and other cool & useful tools!
Want a new `Feat` instance?

Simply do the following!
```js
const myAwesomeFeat = new FeatApp();
```

**How do i know that Feat is attached to my site???**
Feat will notify you in the console, this is done so that you know that you are using Feat.

## What can I do with Feat Frontend?
Feat has some cool and useful features for the frontend, for example `events, stateManagement, Useful frontend tools and cookie tools` and more!

## Events

Listen for an event
```js
Feat.on("<EVENT_NAME>", (data_or_things) => {
    console.log(data_or_things) // This will show you your awesome data!
})
```

To emit this event you can simply run
```js
Feat.emit("<EVENT_NAME>", {
    message: "You are an awesome dev!"
});

Feat.emit("<EVENT_NAME>", "Whoooo!");
```

## State Management

State Management??
That's hard! Right?

With Feat, this is not. We provide *very* easy tools to do this, look at our following example

```html
<h1>The count is currently <a feat:bind="counter"> 0 </a></h1> 

<button feat:decrement="counter">-</button>
<button feat:reset="counter">Reset</button>
<button feat:increment="counter">+</button>
```

![Counter Example](https://github.com/Feat-js/assets/blob/13c22b071645f02249e53a55aa131979ca19562b/counterExample.gif)

Here you can see that we are using the `feat:bind` attribute to bind the state to the element. The contents of the element is used for the default state for your `useState`.

Then below we have a few buttons that have the increment, decrement and reset functions.
This will update counter, thus updating the counter since it's also bound to the state.

The default value is 0 since that is what is contained within the tags, So if you want to change the default value, you can do so by changing the value of the tags.
You can also use the frontend `Feat.useState()` function to initialize it with a different value.

Do note that another important behaviour of the `feat:bind` attribute is that it will create an id for the element if you do not have one yet.
Incrementing and decrementing only works with an Integer, So this will simply append 1 to the end if you are using a string.
You also have other attributes like `feat:toggle` for booleans, So please look in the README for the full attribute documentation.


## Simple DOM
We provide a handful of ways to make DOM manipulation easier for you, the developer!
This is done by yet again using `Feat.`.

`Feat.getElement(selector)` - This gets an element with a selector, which means that you could do `.className` or `#elId` to get it, or be more specific with it!

`toggleClass(selector, className)` - Toggle a class from an element `selector` can be anything to find the class shown up above for the `.getElement`. `className` is the name of the class you'd like to toggle. 

## Cookie Helper

We know how frustrating it can be to work with cookies, so we made it easy!
This does *not* get activated on load/install, so to make this work you need to do the following few steps.

```js
const ft_cookies = new FeatCookies(); // Initialize the cookie system here!

ft_cookies.set('SomeCookieName', 'CookieValue', 3) // The three is the time in days
console.log(ft_cookies.get('SomeCookieName')); // This shows you the cookie you just made!
```