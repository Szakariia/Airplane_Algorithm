function checkArrayNumbers(input) {
    let regex = /\d+/g; // get only numbers
    let arr = input.match(regex);
    for (let i = 0; i < arr.length; i++){ // check limit [row,col]
        if (!(i % 2) && Number(arr[i]) > 5 ) return ""
        if ((i % 2) && Number(arr[i]) > 50 )  return ""}
    return arr
}

const RegexExp = (value) => { // check Seats
    
    var RegexExp = /^(\[\[\d+,\s?\d+\](,\s?\[\d+,\s?\d+\])*\]|\[\d+,\s?\d+\](,\s?\[\d+,\s?\d+\])*)$/;
    const Seats = value.split("],[")

    if (!RegexExp.test(value)) return ("2D array Syntax error")
    else if (Seats.length > 4) return ("Max Seats 4")

    return (!checkArrayNumbers(value) ? "Error : Check [row, col] rules" : "")
}

const isNumber = (value) => { // check Passengers
    if (isNaN(value)) return ("Require number")
    else if (Number(value) > 50 || Number(value) < 0) return ("Value must be between 0 - 50")
    return ("")
}

function Inputvalidator(value, name) {
    if (name === "Seats") return (RegexExp(value))
    if (name === "Passengers") return (isNumber(value))
}

export default Inputvalidator;