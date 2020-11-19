var submitButton = d3.select("#filter-btn");

submitButton.on("click", function() {
    // clears the data of the current table
    
    // stop the page from refresh
    d3.event.preventDefault()
    // select the "input element" and get the raw html node

    // Declare variables
    var input1, input2, filter, table, tr, td, i, txtValue;

    input1 = document.getElementById("state-filter");
    input2 = document.getElementById("distance-filter");
    filter = input1.value;
    filter2 = input2.value;
    console.log(filter)
    console.log(filter2)
    table = document.getElementById("mytable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    if (filter2){
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
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
          txtValue = td.textContent || td.innerText;
          var number = parseInt(txtValue,10);
          if (number < filter2) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      } 
    } else {
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
    }    
});
