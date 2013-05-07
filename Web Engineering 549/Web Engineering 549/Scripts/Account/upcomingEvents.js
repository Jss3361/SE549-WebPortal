function getTodaysEvents() {
    var startDate = new Date();
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    $.ajax({
        url: '/Calendar/GetTopEvents/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data.events, function () {
                _this = this;
                $("#topEventBody").append("<tr><td>" + _this.DateTime + "</td><td>" + _this.Title + "</td></tr>");
            });
        }
    });
}