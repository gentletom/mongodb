var makeDate = function() {
    // save the current date to d
    var d = new Date();
    // prepare an empty string for our formatted state
    var formattedDate = "";
    // take that string and concatenate the current month of d 
    formattedDate = formattedDate + (d.getMonth() + 1) + "_";

    formattedDate = formattedDate + d.getDate() + "_";

    formattedDate = formattedDate + d.getFullYear();
    // return the formatted date
    return formattedDate;
};
module.exports = makeDate;