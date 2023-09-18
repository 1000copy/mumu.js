async function dispatch(json){
	const response = await fetch('/api',{
		headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    method: "POST",
	    body: JSON.stringify(json)
	});
  	const result = await response.json();
  	// console.log(result)
  	// return data;
  	if(result.error)
  		throw new Error(result.error)
  		// alert(result.error)
  		// return result.error
  	else
  		return result.data
	// alert(JSON.stringify(data))
}
export{dispatch}