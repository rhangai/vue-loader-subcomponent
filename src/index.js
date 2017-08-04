export default function VueLoaderSubcomponent( content ) {
	let haveSubcomponents = false;
	const lines = content.split("\n").map((line) => {
		if ( line.indexOf("vue-loader-subcomponent/subcomponent") >= 0 ) {
			line = `${line}(_vueSubcomponents)`;
			haveSubcomponents = true;
		}
		return line;
	});
	if ( !haveSubcomponents )
		return content;
	
	return `var _vueSubcomponents = {};
${lines.join("\n")}
;(function() {
var components = Component.exports.components = Component.exports.components || {};
eachSubComponent(function( c, name ) {
    // Recurse subcomponents
    c.components = c.components || {};
    eachSubComponent(function( subc, subname ) {
        c.components[ subname ] = subc;
    });

    // Save the component
    components[ name ] = c;
});
var oldCreate = Component.exports.beforeCreate;
Component.exports.beforeCreate = function() {
    this.$subcomponents = _vueSubcomponents;
    if ( oldCreate ) {
        if ( typeof oldCreate === 'function' )
            oldCreate.apply( this );
        else if ( oldCreate.length ) {
            for ( var i = 0, len = oldCreate.length; i<len; ++i )
                oldCreate[i].apply( this );
        } else {
            throw new Error( "Invalid beforeCreate function on component" );
        }
    }
};  


function eachSubComponent( cb ) {
    for ( var name in _vueSubcomponents ) {
        var c = _vueSubcomponents[ name ];
        if ( 'default' in c )
            c = c['default'];
        cb( c, name );
    }
}
}());
`;
};
