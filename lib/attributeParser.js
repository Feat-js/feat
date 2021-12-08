module.exports = (html, data, blob) => {
    //go thru each html tag
    let tags = html.match(/<[^>]*>/g);
    if (tags) {
        tags.forEach((tag, i) => {
            console.log(tag);
        })
    }
}