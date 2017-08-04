(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueLoaderSubcomponent = factory());
}(this, (function () { 'use strict';

function VueLoaderSubcomponent(content) {
    var haveSubcomponents = false;
    var lines = content.split("\n").map(function (line) {
        if (line.indexOf("vue-loader-subcomponent/subcomponent") >= 0) {
            line = line + "(_vueSubcomponents)";
            haveSubcomponents = true;
        }
        return line;
    });
    if (!haveSubcomponents) return content;

    return "var _vueSubcomponents = {};\n" + lines.join("\n") + "\n;(function() {\nvar components = Component.exports.components = Component.exports.components || {};\neachSubComponent(function( c, name ) {\n    // Recurse subcomponents\n    c.components = c.components || {};\n    eachSubComponent(function( subc, subname ) {\n        c.components[ subname ] = subc;\n    });\n\n    // Save the component\n    components[ name ] = c;\n});\nvar oldCreate = Component.exports.beforeCreate;\nComponent.exports.beforeCreate = function() {\n    this.$subcomponents = _vueSubcomponents;\n    if ( oldCreate ) {\n        if ( typeof oldCreate === 'function' )\n            oldCreate.apply( this );\n        else if ( oldCreate.length ) {\n            for ( var i = 0, len = oldCreate.length; i<len; ++i )\n                oldCreate[i].apply( this );\n        } else {\n            throw new Error( \"Invalid beforeCreate function on component\" );\n        }\n    }\n};  \n\n\nfunction eachSubComponent( cb ) {\n    for ( var name in _vueSubcomponents ) {\n        var c = _vueSubcomponents[ name ];\n        if ( 'default' in c )\n            c = c['default'];\n        cb( c, name );\n    }\n}\n}());\n";
}

return VueLoaderSubcomponent;

})));
