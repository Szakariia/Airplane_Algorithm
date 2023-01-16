
// Create Maps
// [row, col] [y, x] [2,3]

function beZeroArr3D(Seats) {
    let regex = /\d+/g; // get only numbers
    let seatsArr = Seats.match(regex);
    let arr = [] // 3D arr

    // x,y to follow (seatsArr) row, col
    let x = 0;
    let y = 1;

    for (let i = 0; i < (seatsArr?.length / 2); i++){   // (Seats / 2) : (int) means how much seats we have 
        arr.push(Array.from(Array(Number(seatsArr[y])), () => Array(Number(seatsArr[x])).fill(0)))
        x += 2;
        y += 2;
    }
    
    return arr;
}

// get last arr index including middle condition
function GetLastArr(dataObj) { 
    let k = 0;
    let index = 0

    for (let k = 0; k < dataObj.arr.length; k++)
        if (dataObj.arr[k][0].length > 2) index = k
    return index
}

// Push Third places Middle
function seatMiddle(dataObj) {
    let i = 0;
    let j = 0;
    let k = 0;
    let oldpass = 0;
    const lastArr = GetLastArr(dataObj)
    const lastChar = dataObj.arr[lastArr][dataObj.arr[lastArr].length - 1].length - 1

    // 3D Array while
    while (k < dataObj.arr.length && dataObj.Passengers > 0){
        i = 0    
        while (dataObj.arr[k][0].length > 2 && i < dataObj.arr[k].length) {
            // middle arrays
            j = 1
            oldpass = dataObj.Passengers
            while (dataObj.arr[k][i][j] === 0 && j + 1 < dataObj.arr[k][i].length && dataObj.Passengers){ 
                dataObj.arr[k][i][j] = (dataObj.seatPassengers += 1)
                dataObj.Passengers--
                j++
            }
            if (oldpass > dataObj.Passengers) break;
            i++
        }
        k++
        if (k == dataObj.arr.length && dataObj.Passengers && dataObj.arr &&
            dataObj.arr[lastArr][dataObj.arr[lastArr].length - 1][lastChar - 1] == 0) k = 0 // check if still free place

    }
    return dataObj;
}

// Push Secounde places Aisle
function seatWindow(dataObj) {
    let i = 0;
    let k = 0;
    const lastArr = dataObj.arr.length - 1
    const lastChar = dataObj.arr[lastArr][dataObj.arr[lastArr].length - 1].length - 1
    // 3D Array while
    while (k < dataObj.arr.length && dataObj.Passengers > 0){
        i = 0
        while ((k == 0 || k == dataObj.arr.length - 1) && i < dataObj.arr[k].length) {
            // First array
            if (k == 0 && !dataObj.arr[k][i][0]) {
                dataObj.arr[k][i][0] = (dataObj.seatPassengers += 1)
                dataObj.Passengers--; break}
            // Last array
            else if (k == dataObj.arr.length - 1 && !dataObj.arr[k][i][dataObj.arr[k][i].length - 1]){
                dataObj.arr[k][i][dataObj.arr[k][i].length - 1] = (dataObj.seatPassengers += 1)
                dataObj.Passengers--; break}
            i++
        }
        k++
        console.log(" >>>>>>>>>> ", dataObj.arr[lastArr][dataObj.arr[lastArr].length - 1][lastChar],"<<<<<<<<<")
        if (k == dataObj.arr.length && dataObj.Passengers 
            && dataObj.arr[lastArr][dataObj.arr[lastArr].length - 1][lastChar] == 0) k = 0
    }
    return dataObj;
}


// Push First places Aisle
function seatAisle(dataObj) {
    let i = 0;
    let k = 0;
    const lastArr = dataObj.arr.length - 1

    // 3D Array while
    while (k < dataObj.arr.length && dataObj.Passengers > 0){
        i = 0
        while (i < dataObj.arr[k].length) {
            // First array
            if (k == 0 && !dataObj.arr[k][i][dataObj.arr[k][i].length - 1]) {
                dataObj.arr[k][i][dataObj.arr[k][i].length - 1] = (dataObj.seatPassengers += 1)
                dataObj.Passengers--;
                break}
            // Last array
            else if (k == dataObj.arr.length - 1 && !dataObj.arr[k][i][0]){
                dataObj.arr[k][i][0] = (dataObj.seatPassengers += 1)
                dataObj.Passengers--;
                break}
            // middle arrays
            else if (k && k < dataObj.arr.length - 1) {
                if (!dataObj.arr[k][i][0]) {
                    dataObj.arr[k][i][0] = (dataObj.seatPassengers += 1)
                    dataObj.Passengers-=1;
                    if (dataObj.Passengers){ dataObj.arr[k][i][dataObj.arr[k][i].length - 1] = (dataObj.seatPassengers += 1)
                        dataObj.Passengers-=1;}
                    break}
                }
            i++
        }
        k++
        if (k == dataObj.arr.length && dataObj.Passengers && dataObj.arr 
            && dataObj.arr[lastArr][dataObj.arr[lastArr].length - 1][0] == 0) k = 0 // check if still free place

    }
    return dataObj;
}

// Push seat inside Map
function pushSeat(arr, Passengers, Seats, seatPassengers) {
    let dataObj = {arr, Passengers, seatPassengers, NumAreaSeats : 0, areaSeatsinfo : []}
    let regex = /\d+/g; // get only numbers
    dataObj.NumAreaSeats = Seats.match(regex).length / 2;   
    dataObj.areaSeatsinfo = Seats.match(regex)
    // Start pushing Seats
    if (dataObj.NumAreaSeats > 1) dataObj = seatAisle(dataObj)
    if (dataObj.Passengers) dataObj = seatWindow(dataObj)
    if (dataObj.Passengers) dataObj = seatMiddle(dataObj)
    return dataObj;
}

function CreateMap(FormValues) {
    let arr = beZeroArr3D(FormValues.Seats) // create bezero map
    let dataObj = pushSeat(arr, FormValues.Passengers, FormValues.Seats, 0)
    // NumAreaSeats
    // areaSeatsinfo
    return dataObj;
}

export default CreateMap