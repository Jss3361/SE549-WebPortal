$(document).ready(function () {
    $("#startDate").datepicker();
    $('#startTime').timepicker();

    $('#calendar').fullCalendar({
        aspectRatio: 3,
        events: function (start, end, callback) {
            $.ajax({
                url: '/Calendar/GetEvents/',
                type: 'GET',
                dataType: 'json',
                data: {
                    start: start.getTime(),
                    end: end.getTime()
                },
                success: function (data) {
                    var events = [];
                    $.each(data.events, function () {
                        _this = this;
                        events.push({
                            title: _this.Title,
                            start: new Date(_this.Date),
                            allDay: false
                        });
                    });
                    callback(events);
                }
            });
        }
    });
});

    function addEvent() {
        var startTime = document.getElementById("startTime").value;
        var startDate = document.getElementById("startDate").value;
        var title = document.getElementById("eventTitle").value;
        var description = document.getElementById("description").value;
        var location = document.getElementById("location").value;

        $.ajax({
            url: '/Calendar/SaveEvent/',
            data: { event_title: title, event_start_time: startTime, event_start_date: startDate, event_description: description, event_location: location },
            type: 'POST'
        }).done(function (data) {
            var newEvent = new Object();
            newEvent.title = data._event.Title;
            newEvent.start = new Date(data._event.Date);
            newEvent.allDay = false;
            $('#addEventModal').modal('hide');
            $('#calendar').fullCalendar('renderEvent', newEvent);
            $('#startDate').val('');
            $('#eventTitle').val('');
            $('#description').val('');
            $('#location').val('');
            $('#startTime').timepicker();
        });
    }