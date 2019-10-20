//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// check your shrug out.

let _el = {
    temp_el: undefined,
    instructions: {
        top: undefined,
        left: undefined,
        width: undefined,
        height: undefined,
    },
    list: [],
    create: function (type = "div") {
        _el.temp_el = document.createElement(type);
        return _el; // chain
    },
    createDIV: function () {
        _el.temp_el = document.createElement("div");
        return _el; // chain
    },
    addTextNode: function (msg = "Hi there <br> and greetings!") {
        var newContent = document.createTextNode(msg);
        _el.temp_el.appendChild(newContent);
        return _el;
    },
    insertBefore: function (ele = document.body) {
        document.body.insertBefore(_el.temp_el, ele);
        return _el;
    },
    preprend: function (ele = document.body) {
        return _el.insertBefore(ele);
    },
    append: function (ele = document.body) {
        return _el.insertAfter(ele);
    },
    insertAfter: function (ele = document.body) {
        document.body.appendChild(_el.temp_el, ele);
        return _el;
    },
    styleEle: function () {
//        _el.temp_el.style.zIndex = `100`;
        return _el;
    },
    style: function (key = 'left', val = '10px') {
        _el.temp_el.style[key] = val;
        return _el;
    },
    and: function (key = 'top', val = '10px') {
        _el.style(key, val);
        return _el;
    },
    exampleDiv: function () {
        _el.createDIV().addTextNode(`IT WORKED!?`).styleEle().insertAfter(canvas);
        dragElement(_el.temp_el);
    },
    reInit() {
        _el.temp_el = null;
        return _el;
    },
    addElementToList: function () {
        _el.list(push)
    },
};
const elements = _el;

console.log(`elements.js`);
