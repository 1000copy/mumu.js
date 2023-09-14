function check(left,right,msg,trace){
    if (arguments.length == 1 ){
        console.log(left)
        return 
    }
    if(!deepEqual(left,right)){      
      if(msg){
        console.log(msg)
        if(trace)
          console.trace(left,' not equal to ',right)
      }else
      {
        console.trace(left,' not equal to ',right)
      }
      // console.log(right)
    //   process.exit(1)
    }
  }
var deepEqual = function (x, y) {
    if (x === y) {
    return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
    if (Object.keys(x).length != Object.keys(y).length)
        return false;

    for (var prop in x) {
        if (y.hasOwnProperty(prop))
        {  
        if (! deepEqual(x[prop], y[prop]))
            return false;
        }
        else
        return false;
    }
    
    return true;
    }
    else 
    return false;
}
module.exports = check;