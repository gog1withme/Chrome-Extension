
var activeEl = -1;
$(function () {
    var items = $('.btn-nav');
    $(items[activeEl]).addClass('active');
    $(".btn-nav").click(function () {
        $(items[activeEl]).removeClass('active');
        $(this).addClass('active');
        activeEl = $(".btn-nav").index(this);
    });
});

document.addEventListener('DOMContentLoaded', function () {

    LoadDataOffline();
    LoadDataOnline();

    function LoadDataOffline() {
        //Array of button id and link
        var activeLinksArray = {
            Applane: "http://daffodilsw.applane.com",
            ProductivityManage: "http://react.productivity.applane.com/",
            Redmine: "http://helpdesk.daffodilsw.com/",
            BookingRoom: "http://meeting.helpdesk.daffodilsw.com/",
            CodeReview: "http://172.18.2.11:9010/"

        }

        //Array of button id and link
        var upcomingLinksArray = {
            ProjectsInfo: "",
            Altruistic: "",
        }

        //Array of icons
        var iconsArray = {
            Applane: "glyphicon glyphicon-font",
            ProductivityManage: "glyphicon glyphicon-ruble",
            Redmine: "glyphicon glyphicon-registration-mark",
            BookingRoom: "glyphicon glyphicon-bold",
            CodeReview: "glyphicon glyphicon-copyright-mark",
            ProjectsInfo: "glyphicon glyphicon-ruble",
            Altruistic: "glyphicon glyphicon-font"
        }

        GenerateHTML(activeLinksArray, upcomingLinksArray, iconsArray);
    }

    function LoadDataOnline() {
        $.getJSON('https://quarkbackend.com/getfile/gog1withme/daffodilapplications', function (result) {
            GenerateHTML(result.activeLinksArray, result.upcomingLinksArray, result.iconsArray);
        }).fail(function () {
            LoadDataOffline();
        });
    }

    function GenerateHTML(activeLinksArray, upcomingLinksArray, iconsArray) {
        $('#active-applications-container').html('');
        $('#upcoming-applications-container').html('');

        //bind link on title
        document.getElementById('title').addEventListener('click', function () {
            chrome.tabs.create({ url: 'http://www.daffodilsw.com' });
            window.close();
        });




        //Generate active Buttons and bind events
        for (link in activeLinksArray) {

            $('#active-applications-container').append("<div class='btn-group'><button type='button' id=" + link + " class='btn btn-nav'>" +
                "<span class='hide' id=" + link + "-link></span>" +
                " <span class='" + iconsArray[link] + "'></span>" +
                 " <p>" + link + "</p>" +
                  " </button></div>");
            document.getElementById(link).addEventListener('click', function () {
                var url = activeLinksArray[this.id]
                chrome.tabs.create({ url: url });
                window.close();
            });

        }


        //Generate upcoming applications Buttons and bind events
        for (link in upcomingLinksArray) {

            $('#upcoming-applications-container').append("<div class='btn-group'><button type='button' id=" + link + " class='btn btn-nav'>" +
                "<span class='hide' id=" + link + "-link></span>" +
                " <span class='" + iconsArray[link] + "'></span>" +
                 " <p>" + link + "</p>" +
                  " </button></div>");

            //document.getElementById(link).addEventListener('click', function () {
            //    var url = upcomingLinksArray[this.id]
            //    chrome.tabs.create({ url: url });
            //    window.close();
            //});
        }
    }
});

