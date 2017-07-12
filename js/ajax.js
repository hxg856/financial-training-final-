//路径名，若部署到服务器，记得改这里。
var path = "http://119.29.236.25";


function ajaxSignIn(data) {
    $.ajax({
        url: path + "/login",
        type: "POST",
        dataType: "json",
        data: data,
        success: function (res) {
            signIn(res)
        },
        error: function (res) {}
    })
}

function ajaxRevisePass(data) {
    $.ajax({
        url: path + "/modify_user_password",
        type: "POST",
        dataType: "json",
        data: data,
        success: function (res) {
            revise(res)
        },
        error: function (res) {
            console.log("sorry");
        }
    })
}

function enterinfo1(data) {
    $.ajax({
        url: path + "/entry_company",
        type: "POST",
        dataType: "json",
        data: data,
        success: function (res) {
            localStorage.setItem("companyID", res.data.companyID);
            window.location.href = "enterinfo2.html";

        },
        error: function (res) {
            alert("请求失败！")
        }
    });
}

function submit_loan(data) {
    $.ajax({
        url: path + "/submit_loan",
        type: "POST",
        dataType: "json",
        data: data,
        success: function (res) {
            console.log(res);
        },
        error: function (res) {
            console.log(res);
        }
    });
}

function generate_report(data) {
    $.ajax({
        url: path + "/generate_report",
        type: "POST",
        dataType: "json",
        data: data,
        success: function () {
            sessionStorage.clear();
            window.location.href = "verification.html";
        },
        error: function (res) {
            console.log(res);
        }
    });
}

function ajaxSearch_Report1(data) {
    $.ajax({
        url: path + "/search_report",
        type: "POST",
        dataType: "json",
        data: data,
        success: function (res) {
            switch (res.data.state) {
                case 600:
                    sessionStorage.setItem("companyID", res.data.report[0].CompanyID);
                    sessionStorage.setItem("companyName", data.companyName)
                    console.log(sessionStorage.getItem("companyID"));
                    window.location.href = "companyReport.html";
                    return false;
                    break;
                case 615:
                    alert("公司名称为空！");
                    return false;
                    break;
                case 625:
                    alert("没有找到该公司，请重新输入！");
                    return false;
                    break;
                    //window.location.href = "home.html"
            }
        },
        error: function (res) {}
    });
}

function delete_report(data) {
    $.ajax({
        url: path + "/delete_report",
        type: "POST",
        dataType: "json",
        data: data,
        success: function (res) {
            //删除报告逻辑未加
            switch (res.data.state) {
                case 600:
                    window.location.href = "home.html"
                    break;
                case 638:
                    alert("抱歉，没有找到你需要删除的报告，请确定报告ID后重新输入！");
                    return false;
                    break;
            }
        },
        error: function (res) {

        }
    });
}

function ajaxSearch_company(data, func) {
    $.ajax({
        url: path + "/search_company",
        type: "POST",
        dataType: "json",
        data: data,
        success: func,
        error: function (res) {
            console.log("error", res)
        }
    });
}

function ajaxSearch_loan(data, func) {
    $.ajax({
        url: path + "/search_loan",
        type: "POST",
        dataType: "json",
        data: data,
        success: func,
        error: function (res) {
            console.log("error", res)
        }
    });
}

function ajaxSearch_report(data, func) {
    $.ajax({
        url: path + "/search_report",
        type: "POST",
        dataType: "json",
        data: data,
        success: func,
        error: function (res) {
            console.log("error", res)
        }
    });
}


//未测试，不知道能不能用
function navGetMyself(userID) {
    $.ajax({
        url: path + "/get_myself",
        type: "GET",
        dataType: "json",
        success: function (res) {
            //console.log(res);
            //登录后在导航栏显示username
            userID = res.data.user.userID;
            var userName = res.data.user.usename;
            var $name = $("<p class='navbar-text navbar-left' style='font-size:1.2em'></p>");
            $name.text(userName);
            $("#afname").before($name);
            //禁用删除按钮
            var position = res.data.user.userPosition;
            if (position === 2) {
                $("#deleteReport").removeAttr({
                    "disabled": "disabled"
                });
            }
        }
    });
}

function navExit(userID) {
    $.ajax({
        url: path + "/exit",
        type: "POST",
        dataType: "json",
        data: data,
        success: function (res) {
            window.location.href = "signin.html";
        }
    });
}
