(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueLoaderSubcomponent = factory());
}(this, (function () { 'use strict';

function VueLoaderSubcomponent(content) {
    var lines = content.split("\n").map(function (line) {
        if (line.indexOf("vue-loader-subcomponent/subcomponent") >= 0) {
            line = line + "(_vueSubcomponents)";
        }
        return line;
    });
    return "var _vueSubcomponents = {};\n" + lines.join("\n") + "\n;(function() {\nvar components = Component.exports.components = Component.exports.components || {};\nfor ( var name in _vueSubcomponents ) {\n    var c = _vueSubcomponents[ name ];\n\n    // Recurse subcomponents\n    c.components = c.components || {};\n    for ( var subcomp in _vueSubcomponents )\n        c.components[ subcomp ] = _vueSubcomponents[ subcomp ];\n\n    components[ name ] = c;\n    if ( typeof(exports) !== 'undefined' && exports.__esModule )\n        exports[ name ] = c;\n    else\n        module.exports[ name ] = c;\n}\n}());\n";
}

return VueLoaderSubcomponent;

})));