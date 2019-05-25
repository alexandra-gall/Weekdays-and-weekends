document.getElementById("startDate").valueAsDate = new Date();
document.getElementById("endDate").valueAsDate = new Date();

function dateCheck() {
  let startDate = document.getElementById("startDate").valueAsDate;
  let endDate = document.getElementById("endDate").valueAsDate;
  let url = "https://datazen.katren.ru/calendar/day/";
  let itr = moment.twix(startDate, endDate).iterate("days");
  let range = [];
  let totalUrl;

  document.getElementById("list").innerHTML = "";

  while (itr.hasNext()) {
    range.push(itr.next().toDate());
  }

  if (range.length != 0) {
    let totalRange = range.map(function(item) {
      const currentDate = moment(item).format("YYYY-MM-DD");
      totalUrl = url + currentDate + "/";
      return totalUrl;
    });

    totalRange.forEach(function(item) {
      fetch(item)
        .then(response => response.json())
        .then(json => {
          showResult(json);
        })
        .catch(function(ex) {
          console.log("parsing failed", ex);
        });
    });
  } else {
    const str = document.createElement("p");
    str.innerText = "You entered incorrect date";
    list.appendChild(str);
  }
}

function showResult(object) {
  if (object["holiday"]) {
    const el = document.createElement("li");
    el.innerHTML = `${moment(object["date"]).format("DD MMM YYYY")} - выходной день`;
    list.appendChild(el);
  } else {
    const el1 = document.createElement("li");
    el1.innerHTML = `${moment(object["date"]).format("DD MMM YYYY")} - будний день`;
    list.appendChild(el1);
  }
}
