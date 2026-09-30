// ensure lib and init are globally available through window.init and window.lib 
// (if window.exports is not defined, are loaded at root level by webpack runtime)
window.Vue = window.vue;
window.___exports = window.exports;
window.exports = undefined;