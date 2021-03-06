// require jsdom-global
var jsdom = require('jsdom-global');
var fs = require('fs');

// require chai for BDD
var expect = require('chai').expect;

// import the library under test
const { insertBeforeElement, insertAfterElement, preprendChild, appendChildren } = require('@dom/dom-append.js');

describe('DOM append helpers', function () {
    before('initialize DOM', function () {
        const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8');
        this.jsdom = jsdom(html);
    });
    
    describe('#insertBeforeElement(target, element)', function () {
        it("should insert an element before a target and return the target", function () {
            var div = document.createElement("div");
            var target = document.querySelector('.body-introduction');

            var result = insertBeforeElement(target, div);

            expect(result).to.be.equal(target);
            expect(target.previousSibling).to.be.equal(div);
        });
        it("should throw an error if the element is not valid", function () {
            var target = document.querySelector('.body-introduction');

            var result = function () { insertBeforeElement(target, null); };

            expect(result).to.throw(TypeError);
        });
        it("should throw an error if the target is not valid", function () {
            var div = document.createElement("div");

            var result = function () { insertBeforeElement("target", div); };

            expect(result).to.throw(TypeError);
        });
    });

    describe('#insertAfterElement(target, element)', function () {
        it("should insert an element after a target and return the target", function () {
            var div = document.createElement("div");
            var target = document.querySelector('.body-introduction');

            var result = insertAfterElement(target, div);

            expect(result).to.be.equal(target);
            expect(target.nextSibling).to.be.equal(div);
        });
        it("should throw an error if the element is not valid", function () {
            var target = document.querySelector('.body-introduction');

            var result = function () { insertAfterElement(target, null); };

            expect(result).to.throw(TypeError);
        });
        it("should throw an error if the target is not valid", function () {
            var div = document.createElement("div");

            var result = function () { insertAfterElement("target", div); };

            expect(result).to.throw(TypeError);
        });
    });

    describe('#preprendChild(target, element)', function () {
        it("should add an element to the beginning of the list of children of a target and return the target", function () {
            var div = document.createElement("div");
            var target = document.querySelector('.body-introduction');

            var nbChildrenBefore = target.childElementCount;
            var result = preprendChild(target, div);
            var nbChildrenAfter = target.childElementCount;

            expect(result).to.be.equal(target);
            expect(nbChildrenAfter).to.be.equal(nbChildrenBefore + 1);
            expect(target.firstChild).to.be.equal(div);
        });
        it("should throw an error if the element is not valid", function () {
            var target = document.querySelector('.body-introduction');

            var nbChildrenBefore = target.childElementCount;
            var result =  function () { preprendChild(target, null) };
            var nbChildrenAfter = target.childElementCount;

            expect(result).to.throw(TypeError);
            expect(nbChildrenAfter).to.be.equal(nbChildrenBefore);
        });
        it("should throw an error if the target is not valid", function () {
            var div = document.createElement("div");

            var result = function () { preprendChild("target", div); };

            expect(result).to.throw(TypeError);
        });
    });

    describe('#appendChildren(target, children)', function () {
        it("should return append the children to an element", function () {
            var target = document.createElement("div");
            var children = [document.createElement("span"), document.createElement("p"), "lorem ipsum"];

            var nbChildrenBefore = target.childNodes.length;
            var result = appendChildren(target, children);
            var nbChildrenAfter = target.childNodes.length;

            expect(result).to.be.equal(target);
            expect(nbChildrenAfter).to.be.equal(nbChildrenBefore + children.length);
        });
        it("should return append the children to an element", function () {
            var target = document.createDocumentFragment();
            var children = [document.createElement("span"), document.createElement("p"), "lorem ipsum"];

            var nbChildrenBefore = target.childNodes.length;
            var result = appendChildren(target, children);
            var nbChildrenAfter = target.childNodes.length;

            expect(result).to.be.equal(target);
            expect(nbChildrenAfter).to.be.equal(nbChildrenBefore + children.length);
        });
        it("should throw an error if the element is not valid", function () {
            var target = document.createElement("div");
            var children = "lorem ipsum";

            var result = function () { appendChildren(target, children); };

            expect(result).to.throw(TypeError);
        });
        it("should throw an error if the target is not valid", function () {
            var target = "div";
            var children = [document.createElement("span"), document.createElement("p"), "lorem ipsum"];

            var result = function () { appendChildren(target, children); };

            expect(result).to.throw(TypeError);
        });
    });

    after(function () {
        this.jsdom();
    });
});