$(document).ready(function() {

  function getSite() {
    $.get("/api/sites", function(data) {
    });
  }

  $("#reportGen").on("click", function(event) {
      event.preventDefault();

      var dateBegin = $("#dateBegin").val().trim();
      var dateEnd = $("#dateEnd").val().trim();
      var siteName = $("#siteName").val().trim();

      var queryData = {
        dateBegin: dateBegin, 
        dateEnd: dateEnd,
        siteName: siteName
      }

      postQuery(queryData);

  });

  $("#test").on("click", function(event) {
    console.log("THIS WAS CLICKED")

    event.preventDefault();
    $.post("/api/test/", function(result) {
      // console.log("JSON", data);
      renderTable(result)
    })

  })

  function postQuery(queryData) {
    $.post("/api/queryData/", queryData, function(result) {
      console.log("JSON", data);
      renderTable(result)
    })
  }

  function renderTable(result) {
    $table = $("<table>");
    $tableheader = $("<tr>");

    $("#rowSpace").append($table);
    
    for (column in result.columns) {
      $tableheader.append("<th>" + result.columns[column] + "</th>");
    };

    $table.append($tableheader);
    
    for (row in result.data) {   
      $newRow = $("<tr>");
      for (column in result.data[row]) {
        $newRow.append("<td>" + result.data[row][column] + "</td>")
      }
      console.log($newRow);
      $table.append($newRow);
    };
  }

});