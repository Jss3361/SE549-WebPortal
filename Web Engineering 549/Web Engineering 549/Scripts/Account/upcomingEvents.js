function getTodaysEvents() {
    var startDate = new Date();
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    $.ajax({
        url: '/Calendar/GetEvents/',
        type: 'GET',
        dataType: 'json',
        data: {
            start: startDate.getTime(),
            end: startDate.getTime() + 86400000
        },
        success: function (data) {
            data.events.sort(function (a, b) {
                return a.Date > b.Date;
            });
            for (event in data.events) {
                var d = new Date(data.events[event].Date);
                var hour = d.getHours();
                var minute = d.getMinutes();
                var time = "";
                if (minute < 10) {
                    minute = "0" + minute;
                }
                if (hour > 12) {
                    hour = hour - 12;
                    time = hour + ":" + minute + " " + "PM";
                } else {
                    time = hour + ":" + minute + " " + "AM";
                }
                $("#topEventBody").append("<tr><td>" + time + "</td><td>" + data.events[event].Title + "</td></tr>");
            }
        }
    });
}