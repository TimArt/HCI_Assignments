$(document).ready(function() {
    $("#content_dialer").show();
    $("#content_contact_list").hide();
    $("#content_contact_add").hide();

    $("#tab_dialer").click(function() {
        $("#content_dialer").show();
        $("#content_contact_list").hide();
        $("#content_contact_add").hide();
    });

    $("#tab_contact_list").click(function() {
        $("#content_contact_list").show();
        $("#content_contact_add").hide();
        $("#content_dialer").hide();
    });

    $("#tab_contact_add").click(function() {
        $("#content_contact_add").show();
        $("#content_contact_list").hide();
        $("#content_dialer").hide();
    });

    $.fn.addDialNumber = function(number) {
        var visual = $("#dial_visual");
        visual.val(visual.val() + number);
    }


    $("#dial_1").click(function() {
        $.fn.addDialNumber ("1");
    });

    $("#dial_2").click(function() {
        $.fn.addDialNumber ("2");
    });

    $("#dial_3").click(function() {
        $.fn.addDialNumber ("3");
    });

    $("#dial_4").click(function() {
        $.fn.addDialNumber ("4");
    });

    $("#dial_5").click(function() {
        $.fn.addDialNumber ("5");
    });

    $("#dial_6").click(function() {
        $.fn.addDialNumber ("6");
    });

    $("#dial_7").click(function() {
        $.fn.addDialNumber ("7");
    });

    $("#dial_8").click(function() {
        $.fn.addDialNumber ("8");
    });

    $("#dial_9").click(function() {
        $.fn.addDialNumber ("9");
    });

    $("#dial_STAR").click(function() {
        $.fn.addDialNumber ("*");
    });

    $("#dial_0").click(function() {
        $.fn.addDialNumber ("0");
    });

    $("#dial_HASH").click(function() {
        $.fn.addDialNumber ("#");
    });
});
