var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
	var xmlHttp;
	if(window.ActiveXObject){
		try{
			xmlHttp = new ActveXOject('Microsoft.XMLHTTP');
		}catch(e){
			xmlHttp = false;
		}
	}else{
		try{
			xmlHttp = new XMLHttpRequest();
		}catch(e){
			xmlHttp = false;
		}
	}
	if(!xmlHttp){
		alert('can not create object!');
	}else{
		return xmlHttp;
	}
}

function process(){
	if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
		planet = encodeURIComponent(document.getElementById('userInput').value.toLowerCase());
		xmlHttp.open('GET','Apps/php_&_mysql/ajax/planets/planets.json', true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);// parameter is set to null when using the GET method
	}else{
		setTimeout('process()', 1000);
	}
}

function handleServerResponse(){ 
	if(xmlHttp.readyState==4){
		if(xmlHttp.status==200){
			
			var jsonObj = JSON.parse(xmlHttp.responseText);
			if(jsonObj.hasOwnProperty(planet)){
				document.getElementById('underInput').innerHTML = '<span style="color:blue">' + 'Well done! <span style="color:green; font-style:italic; font-weight:bold; ">' + planet +'</span> is indeed a planet in the solar system</span>';
			}else if(planet != ''){
				document.getElementById('underInput').innerHTML = '<span style="color:blue">' + '<span style="color:green; font-style:italic; font-weight:bold; ">"' + planet + '"</span>  is not a planet in the solar system , please try again.</span>';
			}else if(planet == ''){
				document.getElementById('underInput').innerHTML = '<span style="color:blue">Please enter a search term</span>';
			}
			
			setTimeout('process()', 1000);
		}else{
			alert('something went wrong!');
		}
	}
}