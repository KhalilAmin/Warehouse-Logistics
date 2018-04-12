$(document).ready(function() {

  function getSite() {
    $.get("/api/sites", function(data) {
    });
  }

  $("#reportGen").on("click", function(event) {
      event.preventDefault();

      $("#rowSpace").empty();

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
      $("body").append(result);
    })
  }

  $("#toggle").on("click", function(event) {
    event.preventDefault();

    var flag = $("#tableSpace").css("display");

    if (flag === "block") {
      //hide table and show chart
      renderChart();
      document.getElementById("tableSpace").style.display = "none";
      document.getElementById("myChart").style.display = "block";

    } else {
      //hide chart and show table

      console.log("IM IN NONE");
      document.getElementById("myChart").style.display = "none";
      document.getElementById("tableSpace").style.display = "block";
    }

  });

  function renderChart() {
    var descriptionArr = [];
    var frequencyArr = [];

    $(".description_main").each(function() {
      
      descriptionArr.push($(this).attr("value"))
    })

    $(".frequency").each(function() {

      frequencyArr.push($(this).attr("value"))
    })

    buildChart(frequencyArr.slice(0, 10), descriptionArr.slice(0, 10))
  }

  function buildChart(dataValues, dataLabels) {
    console.log("Executing chart");
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dataLabels,
        datasets: [{
          label: 'Products',
          data: dataValues,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  };
});