function sendAjaxGet(url, func) {
	var xhr = new XMLHttpRequest()
			|| new ActiveXObject("Microsoft.HTTPRequest");
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			func(this);
		}
	};
	xhr.open("GET", url, true);
	xhr.send();
};

function populateTable(xhr) {
	if(xhr.responseText) {
		var res = JSON.parse(xhr.responseText);
		console.log(res);
		if (res === undefined || res.length === 0) {

		} else {
            let table = document.getElementById("reim-table");
            table.innerHTML = "";
			let thead = table.createTHead();
			let row = thead.insertRow();
			console.log("type of res[0]" + typeof(res[0]) +  res[0]);
			for (let [key, val] of Object.entries(res[0])) {
				let th = document.createElement("th");
				let text = document.createTextNode(key);
				th.appendChild(text);
				row.appendChild(th);
			}

			for (let element of res) {
				let row =  table.insertRow();
				for(key in element) {
					if (key == "status") {
						if (element[key] == "APPROVED") {
							row.style.backgroundColor = "#ccffe6";
							console.log("APPROVED")
						} else if (element[key] == "DENIED") {
							row.style.backgroundColor = "#ffb3b3";
							console.log("APPROVED")
						} else if (element[key] == "DENIED") {
							row.style.backgroundColor = "#dcdee0";
							console.log("PENDING")
						}
					}
					let cell = row.insertCell();
      				let text = document.createTextNode(element[key]);
      				cell.appendChild(text);
				}
				
			}

		}
	} 
}

function doPopulateTable() {
    let status = document.querySelector('input[name="status"]:checked').value;
   
    sendAjaxGet(`http://localhost:8080/project-1/portal/reims?status=${status}`, populateTable);
    
    
}

$(document).ready(function() {
    $("#nav-bar").load("/project-1/nav.html");
})