const trimFields = object => {
    const dictionary = object.body;
    for(const key in dictionary){
        dictionary[key] = typeof(dictionary[key]) == typeof('') ? dictionary[key].trim() : dictionary.key;
    }
}

module.exports.trimFields = trimFields;