$.myData = function () {
    var data = { "Timeline" : [
            { "Id" : "1", "StartDate" : "2017-01-01", "EndDate" : "2017-01-31", "Title" : "Node 1", "Notifications" : [{ "Id" : "1", "Description" : "This item requires your attention" }] },
            { "Id" : "13", "StartDate" : "2017-01-01", "EndDate" : "2017-01-01", "Title" : "Node 13", "Description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis tortor ut mauris bibendum consequat non at arcu.", "Notifications" : [{ "Id" : "1", "Description" : "This item requires your attention." }, { "Id" : "2", "Description" : "This item is also cool." }] },
            { "Id" : "14", "StartDate" : "2017-01-01", "EndDate" : "2017-01-15", "Title" : "Node 14" },
            { "Id" : "2", "StartDate" : "2017-02-01", "EndDate" : "2017-02-28", "Title" : "Node 2" },
            { "Id" : "3", "StartDate" : "2017-03-01", "EndDate" : "2017-03-31", "Title" : "Node 3" },
            { "Id" : "4", "StartDate" : "2017-04-01", "EndDate" : "2017-04-30", "Title" : "Node 4" },
            { "Id" : "5", "StartDate" : "2017-05-01", "EndDate" : "2017-05-31", "Title" : "Node 5", "Description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis tortor ut mauris bibendum consequat non at arcu." },
            { "Id" : "16", "StartDate" : "2017-05-16", "EndDate" : "2017-05-17", "Title" : "Node 16" },
            { "Id" : "17", "StartDate" : "2017-05-17", "EndDate" : "2017-05-31", "Title" : "Node 17" },
            { "Id" : "6", "StartDate" : "2017-06-01", "EndDate" : "2017-06-30", "Title" : "Node 6" },
            { "Id" : "15", "StartDate" : "2017-06-25", "EndDate" : "2017-06-30", "Title" : "Node 15", "Description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis tortor ut mauris bibendum consequat non at arcu." },
            { "Id" : "7", "StartDate" : "2017-07-01", "EndDate" : "2017-07-31", "Title" : "Node 7" },
            { "Id" : "8", "StartDate" : "2017-08-01", "EndDate" : "2017-08-31", "Title" : "Node 8" },
            { "Id" : "9", "StartDate" : "2017-09-01", "EndDate" : "2017-09-30", "Title" : "Node 9" },
            { "Id" : "10", "StartDate" : "2017-10-01", "EndDate" : "2017-10-31", "Title" : "Node 10" },
            { "Id" : "11", "StartDate" : "2017-11-01", "EndDate" : "2017-11-30", "Title" : "Node 11" },
            { "Id" : "12", "StartDate" : "2017-12-01", "EndDate" : "2017-12-31", "Title" : "Node 12" },
            { "Id" : "18", "StartDate" : "2018-01-01", "EndDate" : "2017-10-31", "Title" : "Node 18" },
            { "Id" : "19", "StartDate" : "2018-11-01", "EndDate" : "2017-11-30", "Title" : "Node 19" },
            { "Id" : "20", "StartDate" : "2018-12-01", "EndDate" : "2017-12-31", "Title" : "Node 20", "Description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis tortor ut mauris bibendum consequat non at arcu." }
        ]}

    return data;
};

$.timeline = function (selector, data, options) {
    moment.locale('en');

    var settings = $.extend({
        showMonths: false,
        width: 700
    }, options );

    $(selector).empty();

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var year = 0;
    var month = 0;
    
    var timeLeaves = _.groupBy(data.Timeline, function(item) {
        return item.StartDate;
    });
    timeLeaves = _.orderBy(timeLeaves, function (item) {
        return item.StartDate;
    });

    var activeLeaves = _.filter(data.Timeline, function(item) {
        return today >= new Date(item.StartDate).setHours(0,0,0,0) && today <= new Date(item.EndDate).setHours(0,0,0,0);
    });

    var myTimeline = '';
    /*myTimeline += '<div class="ds-timeline-legend">';
    $.each(groupedRoots, function (index, item) {
        myTimeline += '<p class="ds-timeline-legend-p" style="border-left-color:' + item.Color + '">';
        myTimeline += item.Description;
        myTimeline += '</p">';
    });
    myTimeline += '</div>';*/

    myTimeline += '<div class="ds-timeline-wrapper"><ul class="ds-timeline" style="width:'+ settings.width +'px" >';

    $.each(timeLeaves, function (index, array) {
        var groupStartDate = new Date(array[0].StartDate);
        groupStartDate.setHours(0, 0, 0, 0);
        var groupEndDate = new Date(array[0].EndDate);
        groupEndDate.setHours(0, 0, 0, 0);

        if (year != groupStartDate.getFullYear()) {
            year = groupStartDate.getFullYear();

            myTimeline += '<li class="ds-timeline-break"> <div class="text"> ' + year;

            if (settings.showMonths == true) {
                if (month != groupStartDate.getMonth()) {
                    month = groupStartDate.getMonth();

                    myTimeline += '&nbsp;&nbsp;-&nbsp;&nbsp;' + moment(groupStartDate).format('MMMM') + '';
                }
            }

            myTimeline += ' </div> </li>';
        } else if (month != groupStartDate.getMonth()) {
            if (settings.showMonths == true) {
                month = groupStartDate.getMonth();
                myTimeline += '<li class="ds-timeline-break"> <div class="text"> ' + moment(groupStartDate).format('MMMM') + ' </div> </li>';
            }
        }

        if (_.includes(activeLeaves, array[0])) {
            if (groupStartDate.getTime() === today.getTime()) {
                myTimeline += '<li> <div class="ds-timeline-point ds-active ds-today"></div> <div class="box">'
            } else {
                myTimeline += '<li> <div class="ds-timeline-point ds-active"></div> <div class="box">'
            }
        } else {
            myTimeline += '<li> <div class="ds-timeline-point"></div> <div class="box">'
        }

        $.each(array, function (i, item) {

            if (i > 0) {
                myTimeline += '<hr>';
            }

            var color = 'tranparent';

            myTimeline += '<div class="data" style="border-left-color: ' + color +'">';

                if(item.hasOwnProperty('Notifications') && item.Notifications.length > 0 ){
                    var notifications = '<div>';
                    $.each(item.Notifications, function(j, value) {
                        notifications += '<p>'+ value.Description + '</p>';
                    });
                    notifications += '</div>';
                    
                    myTimeline += '<div class="notifications" data-toggle="tooltip" data-placement="top" title="'+ notifications +'">';
                        myTimeline += '<i class="fa fa-bell" aria-hidden="true"></i> <span class="badge">'+ item.Notifications.length +'</span>';
                    myTimeline += '</div>';
                }

                myTimeline += '<div class="title"> '+ item.Title +' </div>';
                myTimeline += '<div class="date"> '+ moment(item.StartDate).format('DD, MMMM');
                if (new Date(item.StartDate).getTime() != new Date(item.EndDate).getTime()) {
                    myTimeline += ' - '+ moment(item.EndDate).format('DD, MMMM');
                }
                myTimeline += '</div>';

                if(item.hasOwnProperty('Description')) {
                    myTimeline += '<div class="text"> '+ item.Description +' </div>';
                }

            myTimeline += '</div>';
        });
    });

    myTimeline += '</div></ul>';

    $(selector).append(myTimeline);
    $('[data-toggle="tooltip"]').tooltip({html: true, trigger: "hover"});
};

function toggleTimelineDetails(e) {
    //$(e).toggleClass('timeline-right');
    //$(e).parent().toggleClass('timeline-right');
};
