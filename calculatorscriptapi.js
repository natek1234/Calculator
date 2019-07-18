function calculate()
{
	var inp = document.getElementById("input").value;
	var encode = encodeURIComponent(inp);	
	var address = "http://api.mathjs.org/v4/?expr=" + encode;
	$.getJSON(address, 
		function(data)
		{
			console.log(data);
  			document.getElementById("input").value = data;	
		}
	);

}

function add(num)
{
	var current = document.getElementById("input").value;
	var update = current + num;
  	document.getElementById("input").value = update;
}

function reset()
{
  	document.getElementById("input").value = "";
}

function back()
{
	var current = document.getElementById("input").value;
	var update = current.slice(0,current.length-1);
  	document.getElementById("input").value = update;
}



input.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
	event.preventDefault();
 	document.getElementById("enter").click();
	}
});

