var submitButton = d3.select("#filter-btn");

submitButton.on("click", function() {
    // clears the data of the current table
    
    // stop the page from refresh
    d3.event.preventDefault()
    // select the "input element" and get the raw html node

    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("datetime");
    filter = input.value;
    console.log(filter)
    table = document.getElementById("mytable");
    tr = table.getElementsByTagName("tr");
    console.log(tr)
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }    
});
