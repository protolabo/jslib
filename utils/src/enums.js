export const EventType = {
    CHANGE: 'change',
    CLICK: 'click',
    FOCUSIN: 'focusin',
    FOCUSOUT: 'focusout',
    KEYDOWN: 'keydown',
    KEYUP: 'keyup'
};

export const Key = {
    backspace: "Backspace",
    tab: "Tab",
    enter: "Enter",
    ctrl: "Control",
    alt: "Alt",
    escape: "Escape",
    spacebar: " ",
    page_up: "PageUp",
    page_down: "PageDown",
    end: "End",
    home: "Home",
    left_arrow: "ArrowLeft",
    up_arrow: "ArrowUp",
    right_arrow: "ArrowRight",
    down_arrow: "ArrowDown",
    delete: "Delete",
    period: "."
};

export const UI = (function () {
    const BUTTON = 'BUTTON';
    const ANCHOR = 'ANCHOR';
    const ATTRIBUTE = 'ATTRIBUTE';
    const OPTION = 'OPTION';

    var pub = {
        ATTR_WRAPPER: 'attr-wrapper',
        COLLAPSE: 'collapse',
        CHECKED: 'checked',
        DISABLED: 'disabled',
        EMPTY: 'empty',
        HIDDEN: 'hidden',
        SELECTED: 'selected',

        Element: {
            ANCHOR: {
                name: ANCHOR
            },
            ATTRIBUTE: {
                name: ATTRIBUTE,
                class: 'attr',
                toClass() { return '.attr'; },
                toString() { return 'ATTRIBUTE'; }
            },
            ATTRIBUTE_ABSTRACT: {
                name: ATTRIBUTE,
                class: 'attr attr--extension',
                toString() { return 'ABSTRACT ATTRIBUTE'; }
            },
            ATTRIBUTE_BOOLEAN: {
                name: ATTRIBUTE,
                class: 'attr--bool',
                toString() { return 'BOOLEAN ATTRIBUTE'; }
            },
            BUTTON: {
                name: BUTTON,
                class: 'btn',
                toString() { return 'BUTTON'; }
            },
            BUTTON_ADD: {
                name: BUTTON,
                class: 'btn btn-add',
                toString() { return 'ADD BUTTON'; }
            },
            BUTTON_DELETE: {
                name: BUTTON,
                class: 'btn btn-delete',
                toString() { return 'DELETE BUTTON'; }
            },
            BUTTON_MENU: {
                name: BUTTON,
                class: 'btn btn-menu',
                toString() { return 'MENU BUTTON'; }
            },
            OPTION: {
                name: OPTION,
                class: 'option',
                toString() { return 'OPTION'; }
            }
        }
    };

    return pub;
})();