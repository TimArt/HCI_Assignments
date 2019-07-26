// Some vanilla javascript for fun
function toggleStylesheet() {
  var styleLink = document.getElementById("style");
  styleLink.x = 'phone-large' == styleLink.x ? 'phone' : 'phone-large';
  styleLink.href = styleLink.x + '-min.css';
}

$(document).ready(function() {

    // Tab Button Clicks =======================================================

    var selectedTab;

    /** Shows a specified content div and hides all others.
     */
    $.fn.showTabContent = function(tabcontent) {

        // Hide all other content divs
        var children = $("#content").children();
        for (var i = 0; i < children.length; i++) {
            $(children[i]).hide();
        }

        // Show content
        tabcontent.show();
    }

     $.fn.setTabSelected = function(tab) {

        // Unselect all other tabs
        var children = $("#tab_bar").children();
        for (var i = 0; i < children.length; i++) {
            var child = $(children[i]);
            child.removeClass("tab--active");
            child.addClass("tab--inactive");
        }

        // Select this tab
        tab.removeClass("tab--inactive");
        tab.addClass("tab--active");

        // Set as selected tab variable
        selectedTab = tab;
    }


    // Show dialer first
    $.fn.showTabContent ($("#content_dialer"));

    $("#tab_dialer").click(function() {
        $.fn.showTabContent ($("#content_dialer"));
        $.fn.setTabSelected ($("#tab_dialer"));
    });

    $("#tab_contact_list").click(function() {
        $.fn.showTabContent ($("#content_contact_list"));
        $.fn.setTabSelected ($("#tab_contact_list"));
    });

    $("#tab_contact_add").click(function() {
        $.fn.showTabContent ($("#content_contact_add"));
        $.fn.setTabSelected ($("#tab_contact_add"));
    });

    $("#tab_contact_add").click(function() {
        $.fn.showTabContent ($("#content_contact_add"));
        $.fn.setTabSelected ($("#tab_contact_add"));
    });

    $("#tab_about").click(function() {
        $.fn.showTabContent ($("#content_about"));
        $.fn.setTabSelected ($("#tab_about"));
    });


    $.fn.toNextTab = function()
    {
        selectedTab = $(selectedTab.nextSibling);
    }

    $.fn.toPrevTab = function()
    {
        selectedTab = $(selectedTab.previousSibling);
    }



    // Keyboard tab changing
    document.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
            case 37:
                $.fn.toNextTab();
                break;
            case 39:
                $.fn.toPrevTab();
                break;
        }
    }, false);


    // Dialer Button Clicks ====================================================

    /** Adds a dial button's associated number to the visual display text box
        of the currently dialed number.
     */
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

    $("#dialer_clear").click(function() {
        $("#dial_visual").val("");
    });


    // Gesture Interaction =====================================================

    var mouseDownX = 0;
    var mouseDownY = 0;

    // Used as a bounds for a swipe left or right event
    const swipeWindow = 20;

    $("#gesture_area").mousedown(function(event) {
        mouseDownX = event.pageX;
        mouseDownY = event.pageY;

        $("#gesture_output").val("Mouse Down");
    });

    $("#gesture_area").mouseup(function(event) {
        mouseUpX = event.pageX;
        mouseUpY = event.pageY;

        var isInSwipeHorizontalWindow = Math.abs (mouseDownY - mouseUpY) < swipeWindow;
        var isInSwipeVerticalWindow = Math.abs (mouseDownX - mouseUpX) < swipeWindow;

        if (mouseUpX < mouseDownX && isInSwipeHorizontalWindow)
        {
            $("#gesture_output").val("Swipe Left");
        }
        else if (mouseUpX > mouseDownX && isInSwipeHorizontalWindow)
        {
            $("#gesture_output").val("Swipe Right");
        }
        else if (mouseUpY < mouseDownY && isInSwipeVerticalWindow)
        {
            $("#gesture_output").val("Swipe Up");
        }
        else if (mouseUpY > mouseDownY && isInSwipeVerticalWindow)
        {
            $("#gesture_output").val("Swipe Down");
        }
        else
        {
            $("#gesture_output").val("Mouse Up");
        }
    });

});
