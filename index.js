module.exports = function( content ) {
	const lines = content.split("\n").map((line) => {
		if ( line.indexOf("vue-loader-subcomponent/subcomponent") >= 0 ) {
			line = `${line}(Component)`;
		}
		return line;
	});
	return lines.join("\n" );
};
