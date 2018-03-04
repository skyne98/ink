export let now: () => number = typeof window != 'undefined' && window.performance

    ? (window.performance.now

        || window.performance['mozNow']

        || window.performance['msNow']

        || window.performance['oNow']

        || window.performance['webkitNow']

        || Date.now).bind(window.performance || {})

    : Date.now || function () { return +new Date() };