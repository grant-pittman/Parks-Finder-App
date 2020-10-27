var tableData = results;

console.log(tableData)

var tbody = d3.select("tbody");

var submitButton = d3.select("#filter-btn");

submitButton.on("click", function() {
    // clears the data of the current table
    
    tbody.html("");
    // stop the page from refresh
    d3.event.preventDefault();
    // select the "input element" and get the raw html node
    var inputField = d3.select("#datetime");
    // get the value property of the "input" element 
    var inputElement = inputField.property("value");
    // print value in console
    var inputTypeArray = tableData.filter(one => one.location === inputElement);  
    console.log(inputTypeArray);

    
    // display in the html file (appends it at the end, after displaying all original data)
    inputTypeArray.forEach((selection) => {
        // for each "element" create a row
        var row = tbody.append("tr");
        //below "object" becomes the targetet array (element)
        Object.entries(selection).forEach(([key,value]) => {
            var cell = row.append("td");
            // adds the "value" to each row in the table
            cell.text(value);
        });
    });      
});
