$(function () {
    $("#returnHome").click(function () {
        window.location.href = "home.html";
    });
    $(document).on('focus', 'input', function () {
        $(".bg-danger").remove();;
        /* Act on the event */
    });
})
