var translator = (function() {
	var translate = function(tag, lang) {
		if (!tag) throw new Error('Argument null exception. Argument [tag] is required');
		if(typeof lang == 'string' && dictionary[lang]) lang = dictionary[lang];
		else lang = dictionary['def'];
		return lang[tag] ? lang[tag] : tag;
	};
	var dictionary = {
		def: {
			a: 'letter a',
			b: 'letter b'
		},
		ru: {
			a: 'буква а',
			b: 'буква б'
		}
	}
	return {translate: translate};
})();
