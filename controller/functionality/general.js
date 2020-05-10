const trimFields = object => {
    const dictionary = object.body;
    for(const key in dictionary){
        dictionary[key] = typeof(dictionary[key]) == typeof('') ? dictionary[key].trim() : dictionary.key;
    }
}


const stringToHTML = str => {
    
	let dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;

};

module.exports.stringToHTML = stringToHTML;
module.exports.trimFields = trimFields;