$(document).ready(function() {

  function getSite() {
    $.get("/api/sites", function(data) {
    });
  }

  $("#reportGen").on("click", function(event) {
      event.preventDefault();

      $("#rowSpace").empty();
      console.log("DONE");

      var dateBegin = $("#dateBegin").val().trim();
      var dateEnd = $("#dateEnd").val().trim();
      var siteName = $("#siteName").val().trim();

      var queryData = {
        dateBegin: dateBegin +  " 00:00:00", 
        dateEnd: dateEnd + " 00:00:00",
        siteName: siteName
      }

      postQuery(queryData);

  });

  function postQuery(queryData) {
    $.post("/api/queryData/", queryData, function(result) {
      getResult(result)
    })
  }

  function getResult(result) {
    var chartToggle = false;

    $("#toggle").on("click", function(event) {
      console.log("RESULT!", result);
      if (chartToggle) {
        chartToggle = false;
        renderChart(result)
      } else {
        chatToggle = true;
        renderTable(result);
      }
    })
  }

  function renderChart(result) {
    for (row in result.data) {   
      $newRow = $("<tr>");
      for (column in result.data[row]) {
        $newRow.append("<td>" + result.data[row][column] + "</td>")
      }

      $table.append($newRow);
    };
  }

  function renderTable(result) {
    
    var chartToggle = false;
    
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

      $table.append($newRow);
    };
  };
});