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

const getLocalTodayDate = () => {
    const currDateObj = new Date();

    let [currMonth, currDay, currYear] = currDateObj.toLocaleDateString().split('/');

    currMonth = currMonth>9?currMonth:'0'+currMonth;

    currDay = currDay>9?currDay:'0'+ currDay;
        
    return   currYear + "-" + currMonth + "-" + currDay;
}

const validateBookingDates = (from, to) => {

    let errorMsg = null;

    if(from == "" || to == ""){
        errorMsg = "dates must be selected";
    }
    else{
        const currDate = getLocalTodayDate();

        if(from < currDate || to < currDate)
            errorMsg = "Dates cannot be in past";
        else if(to <= from)
            errorMsg = "Checkout must be atleast a day after checkin";
    }

    return errorMsg;
}

module.exports.stringToHTML = stringToHTML;
module.exports.trimFields = trimFields;
module.exports.validateBookingDates = validateBookingDates;
module.exports.getLocalTodayDate = getLocalTodayDate;