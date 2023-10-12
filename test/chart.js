function iso1(dt){
    // const dt = Date.now()
    const yyyy = dt.getFullYear();
    let mm = dt.getMonth() + 1; // month is zero-based
    let dd = dt.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formatted = yyyy + '-' + mm + '-' + dd;
    return formatted
}
function iso2(dt){
    // const dt = Date.now()
    var currentHours = dt.getHours();
    currentHours = ("0" + currentHours).slice(-2);
    var currentMinuts = dt.getMinutes();
    currentMinuts = ("0" + currentMinuts).slice(-2);
    const formatted = currentHours + ':' + currentMinuts
    return formatted
}
var check = require("../lib/check")
check(['2023-10-11'],a('2023-10-11'))
function a(enddate){
    return [enddate]
}
var d = new Date()
var r = []
for(const i of [1,2,3,4,5,6,7]){
    r.unshift(iso1(d))//insert at 0
    d.setDate(d.getDate()-1)
}
check(['2023-10-05','2023-10-06','2023-10-07','2023-10-08','2023-10-09','2023-10-10','2023-10-11'],r)