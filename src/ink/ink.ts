import { create } from '@most/create';
import { Stream } from 'most';
import { patch, elementOpenStart, elementOpenEnd, elementClose, attr, text } from 'incremental-dom';
import './ink.d.ts';

function forEachChildInArgs(args, iteratee) {
    if (args.length > 2) {
        for (var i = 2; i < args.length; i++) {
            iteratee(args[i]);
        }
    }
};

function renderChild(child) {
    switch (typeof child) {
        case 'string':
            text(child);
            break;
        case 'function':
            child();
            break;
    }
};

function hasOwnProperty(anObject, prop) {
    return Object.prototype.hasOwnProperty.call(anObject, prop);
};

type h = typeof h;
export function h<E, S>(ink: Ink<E, S> | string, props?: Object, ...children: any[]): () => HTMLElement {
    var outerArgs = arguments;

    switch (typeof ink) {
        case 'string':
            return function hRender() {
                elementOpenStart(ink as string);

                for (var propName in props) {
                    if (hasOwnProperty(props, propName)) {
                        attr(propName, props[propName]);
                    }
                }

                elementOpenEnd();

                if (Array.isArray(children)) {
                    children.forEach(renderChild);
                } else {
                    forEachChildInArgs(outerArgs, renderChild);
                }

                return elementClose(ink as string) as HTMLElement;
            }
        case 'function':
            var childrenArray;
            if (Array.isArray(children)) {
                childrenArray = children;
            } else {
                childrenArray = [];
                forEachChildInArgs(outerArgs, function (child) {
                    childrenArray.push(child);
                })
            }

            return function hRender() { 
                return (ink as Ink<E, S>).render(props, childrenArray);
            }
    }
};

type Ink<E, S> = {
    init?(): S;
    update?(state: S, event: S): S;
    render(state: S, h: h): HTMLElement;
};