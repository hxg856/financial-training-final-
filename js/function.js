function signIn(res) {
    if ((!res.data.error) && res.data.state == "600") {
        window.location.href = "home.html";
    };
    if (res.data.error) {
        switch (res.data.state) {
            case 601:
                if (!userPassword.next().hasClass("bg-danger")) {
                    var $alertInfo = $("<div class='bg-danger'>客户密码错误，请输入6位数字客户密码！</div>");
                    $("#userPassword").after($alertInfo);
                    return false;
                }
                break;
            case 604:
                alert("客户账号错误，请重新输入！");
                break;
            case 613:
                alert("账户已经登录，请不要重复登录！");
                return false;
                //window.location.href = "home.html"
        }
    }
}

function revise(res) {
    if ((!res.data.error) && res.data.state == "600") {
        console.log("恭喜你，修改密码成功!");
        //window.location.href = "signin.html";
        //密码返回错误处理待添加
    }
    if (res.data.error) {
        //...
    }
}

function companyInfo(res) {
    var com = res.data.company;
    $("#name").text(com.CompanyName);
    $("#legalName").text(com.LegalName);
    $("#companyNature").text(com.CompanyNature);
    $("#mainBusiness").text(com.MainBusiness);
    $("#loanReason").text(com.LoanReason);
}

function loanInfo(res) {
    var loan = res.data.company;
    $("#loanCredit").text(loan.LoanCredit);
    $("#loanCredit2").text(loan.LoanCredit);
    $("#loanAim").text(loan.LoanAim);
    switch (loan.RepaymentMethod) {
        case 1:
            $("#repaymentMethod").text("一次性还清");
            $("#repaymentMethod1").text("一次性还清");
            break;
        case 2:
            $("#repaymentMethod").text("等额本息分期还款");
            $("#repaymentMethod1").text("等额本息分期还款");
            break;
        case 3:
            $("#repaymentMethod").text("等额本金分期还款");
            $("#repaymentMethod1").text("等额本金分期还款");
            break;
        case 4:
            $("#repaymentMethod").text("活期还款");
            break;
            $("#repaymentMethod1").text("活期还款");
            break;
    }
    $("#repaymentTime").text(loan.RepaymentTime);
    $("#repaymentTime1").text(loan.RepaymentTime);
    $("#repaymentSource").text(loan.RepaymentSource);
    $("#loanCredit1").text(loan.LoanCredit);
    $("#cCredit").text(loan.LoanCredit);
    if (loan.RepaymentMethod == 1) {
        //一次性
        if (loan.RepaymentTime <= 12) {
            $("#grade2").text(20);
        }
        if (loan.RepaymentTime <= 60 && loan.RepaymentTime > 12) {
            $("#grade2").text(15);
        }
        if (loan.RepaymentTime <= 120 && loan.RepaymentTime > 60) {
            $("#grade2").text(10);
        }
        if (loan.RepaymentTime > 120) {
            $("#grade2").text(5);
        }
    }
    if (loan.RepaymentMethod == 2 || loan.RepaymentMethod == 3) {
        //分期
        if (loan.RepaymentTime <= 12) {
            $("#grade2").text(5);
        }
        if (loan.RepaymentTime <= 60 && loan.RepaymentTime > 12) {
            $("#grade2").text(10);
        }
        if (loan.RepaymentTime <= 120 && loan.RepaymentTime > 60) {
            $("#grade2").text(15);
        }
        if (loan.RepaymentTime > 120) {
            $("#grade2").text(20);
        }
    }
    if (loan.RepaymentMethod == 4) { //活期
        $("#cGrede2").text("0分");
    }
    switch (loan.CharacterClass) {
        case 1:
            $("#characterClass").text("优秀/Excellent");
            $("#characterClass1").text("优秀/Excellent");
            break;
        case 2:
            $("#characterClass").text("良好/Good");
            $("#characterClass1").text("良好/Good");
            break;
        case 3:
            $("#characterClass").text("一般/Nomal");
            $("#characterClass1").text("一般/Nomal");
            break;
        case 4:
            $("#characterClass").text("不良/Bad");
            $("#characterClass1").text("不良/Bad");
            break;
        case 5:
            $("#characterClass").text("极差/worst");
            $("#characterClass1").text("极差/worst");
            break;
    }
    switch (loan.HistoricalProfit) {
        case 1:
            $("#historicalProfit").text("优秀");
            $("#historicalProfit1").text("优秀");
            break;
        case 2:
            $("#historicalProfit").text("良好");
            $("#historicalProfit1").text("良好");
            break;
        case 3:
            $("#historicalProfit").text("一般");
            $("#historicalProfit1").text("一般");
            break;
        case 4:
            $("#historicalProfit").text("不良");
            $("#historicalProfit1").text("不良");
            break;
        case 5:
            $("#historicalProfit").text("极差");
            $("#historicalProfit1").text("极差");
            break;
    }
    switch (loan.CompanyAchievement.Pal) {
        case 1:
            $("#companyAchievement").text("盈利" + loan.CompanyAchievement.Sum + "万元");
            $("#companyAchievement1").text("盈利" + loan.CompanyAchievement.Sum + "万元");
            break;
        case 2:
            $("#companyAchievement").text("亏损" + loan.CompanyAchievement.Sum + "万元");
            $("#companyAchievement1").text("亏损" + loan.CompanyAchievement.Sum + "万元");
            break;
    }
    switch (loan.HistoricalCredit.LoanOrNot) {
        case true:
            $("#historicalCreditLoan").text("有信贷历史");
            $("#historicalCreditLoan1").text("有信贷历史");
            break;
        case false:
            $("#historicalCreditLoan").text("无信贷历史");
            $("#historicalCreditLoan1").text("无信贷历史");
            break;
    }
    switch (loan.HistoricalCredit.RepayOrNot) {
        case true:
            $("#historicalCreditRepay").text("已还清");
            $("#historicalCreditRepay1").text("已还清");
            break;
        case false:
            $("#historicalCreditRepay").text("未还清");
            $("#historicalCreditRepay1").text("未还清");
            break;
    }
    $("#mortgage").text(loan.Mortgage);
}

function verifyInfo(res) {
    var verify = res.data.report[0];
    switch (verify.ExpectRange) {
        case "F":
            $("#grade1").text("50");
            $("#grade3").text("F");
            break;
        case "E":
            $("#grade1").text("60");
            $("#grade3").text("E");
            break;
        case "D":
            $("#grade1").text("65");
            $("#grade3").text("D");
            break;
        case "C":
            $("#grade1").text("70");
            $("#grade3").text("C");
            break;
        case "B":
            $("#grade1").text("75");
            $("#grade3").text("B");
            break;
        case "A":
            $("#grade1").text("80");
            $("#grade3").text("A");
            break;
        case "S":
            $("#grade1").text("85");
            $("#grade3").text("S");
            break;
        case "SS":
            $("#grade1").text("90");
            $("#grade3").text("SS");
            break;
        case "SSS":
            $("#grade1").text("95");
            $("#grade3").text("SSS");
            break;
    }
    $("#grade4").text(verify.RealRange.Score);
    if ($("#grade4").text() > $("#grade1").text()) {
        $("#dis").text("符合");
    } else {
        $("#dis").text("不符合");
    }
}


function enterCompanyInfo(res) {
    var com = res.data.company;
    $("#cName").text(com.CompanyName);
    $("#ccName").text(com.CompanyName);
    sessionStorage.setItem("companyName", com.CompanyName);
    var companyName = sessionStorage.getItem("companyName");
    var data1 = {
        companyName: companyName
    };
    if (confirm("请稍后，正在为你生成报告！")) {
        ajaxSearch_report(data1, enterVerifyInfo);
    }
}

function enterloanInfo(res) {
    var loan = res.data.company;
    $("#cCredit").text(loan.LoanCredit);
    switch (loan.RepaymentMethod) {
        case 1:
            $("#cRepayMethod").text("一次性还清");
            break;
        case 2:
            $("#cRepayMethod").text("等额本息分期还款");
            break;
        case 3:
            $("#cRepayMethod").text("等额本金分期还款");
            break;
        case 4:
            $("#cRepayMethod").text("活期还款");
            break;
    }
    $("#cRepayTime").text(loan.RepaymentTime);
    if (loan.RepaymentMethod == 1) {
        //一次性
        if (loan.RepaymentTime <= 12) {
            $("#cGrede2").text(20);
        }
        if (loan.RepaymentTime <= 60 && loan.RepaymentTime > 12) {
            $("#cGrede2").text(15);
        }
        if (loan.RepaymentTime <= 120 && loan.RepaymentTime > 60) {
            $("#cGrede2").text(10);
        }
        if (loan.RepaymentTime > 120) {
            $("#cGrede2").text(5);
        }
    }
    if (loan.RepaymentMethod == 2 || loan.RepaymentMethod == 3) {
        //分期
        if (loan.RepaymentTime <= 12) {
            $("#cGrede2").text(5);
        }
        if (loan.RepaymentTime <= 60 && loan.RepaymentTime > 12) {
            $("#cGrede2").text(10);
        }
        if (loan.RepaymentTime <= 120 && loan.RepaymentTime > 60) {
            $("#cGrede2").text(15);
        }
        if (loan.RepaymentTime > 120) {
            $("#cGrede2").text(20);
        }
    }
    if (loan.RepaymentMethod == 4) { //活期
        $("#cGrede2").text("0分");
    }

    switch (loan.CharacterClass) {
        case 1:
            $("#cCharater").text("优秀/Excellent");
            $("#cGrede3").text(10);
            break;
        case 2:
            $("#cCharater").text("良好/Good");
            $("#cGrede3").text(5);
            break;
        case 3:
            $("#cCharater").text("一般/Nomal");
            $("#cGrede3").text(0);
            break;
        case 4:
            $("#cCharater").text("不良/Bad");
            $("#cGrede3").text(-5);
            break;
        case 5:
            $("#cCharater").text("极差/worst");
            $("#cGrede3").text(-10);
            break;
    }
    switch (loan.CompanyAchievement.Pal) {
        case 1:
            $("#cPal").text("盈利");
            break;
        case 2:
            $("#cPal").text("亏损");
            break;
    }
    $("#cSum").text(loan.CompanyAchievement.Sum + "万元");
    if (loan.CompanyAchievement.Pal == 1) {
        if (loan.CompanyAchievement.Sum <= 100) {
            $("#cGrede4").text(5);
        }
        if (loan.CompanyAchievement.Sum > 100 && loan.CompanyAchievement.Sum <= 200) {
            $("#cGrede4").text(10);
        }
        if (loan.CompanyAchievement.Sum > 100 && loan.CompanyAchievement.Sum <= 200) {
            $("#cGrede4").text(15);
        }
        if (loan.CompanyAchievement.Sum > 200 && loan.CompanyAchievement.Sum <= 300) {
            $("#cGrede4").text(20);
        }
        if (loan.CompanyAchievement.Sum > 300 && loan.CompanyAchievement.Sum <= 500) {
            $("#cGrede4").text(25);
        }
        if (loan.CompanyAchievement.Sum > 500 && loan.CompanyAchievement.Sum <= 1000) {
            $("#cGrede4").text(30);
        }
        if (loan.CompanyAchievement.Sum > 1000 && loan.CompanyAchievement.Sum <= 3000) {
            $("#cGrede4").text(35);
        }
        if (loan.CompanyAchievement.Sum > 3000 && loan.CompanyAchievement.Sum <= 5000) {
            $("#cGrede4").text(40);
        }
        if (loan.CompanyAchievement.Sum > 5000 && loan.CompanyAchievement.Sum <= 10000) {
            $("#cGrede4").text(45);
        }
    }
    if (loan.CompanyAchievement.Pal == 2) {
        if (loan.CompanyAchievement.Sum <= 100) {
            $("#cGrede4").text(-5);
        }
        if (loan.CompanyAchievement.Sum > 100 && loan.CompanyAchievement.Sum <= 200) {
            $("#cGrede4").text(-10);
        }
        if (loan.CompanyAchievement.Sum > 100 && loan.CompanyAchievement.Sum <= 200) {
            $("#cGrede4").text(-15);
        }
        if (loan.CompanyAchievement.Sum > 200 && loan.CompanyAchievement.Sum <= 300) {
            $("#cGrede4").text(-20);
        }
        if (loan.CompanyAchievement.Sum > 300 && loan.CompanyAchievement.Sum <= 500) {
            $("#cGrede4").text(-25);
        }
        if (loan.CompanyAchievement.Sum > 500 && loan.CompanyAchievement.Sum <= 1000) {
            $("#cGrede4").text(-30);
        }
        if (loan.CompanyAchievement.Sum > 1000 && loan.CompanyAchievement.Sum <= 3000) {
            $("#cGrede4").text(-35);
        }
        if (loan.CompanyAchievement.Sum > 3000 && loan.CompanyAchievement.Sum <= 5000) {
            $("#cGrede4").text(-40);
        }
        if (loan.CompanyAchievement.Sum > 5000 && loan.CompanyAchievement.Sum <= 10000) {
            $("#cGrede4").text(-45);
        }
    }
    //console.log($("#cGrede4").text() < 25 && $("#cGrede4").text() >= 5);
    if ($("#cGrede4").text() >= 30) {
        $("#cAch").text("优秀。");
    }
    if ($("#cGrede4").text() < 25 && $("#cGrede4").text() >= 5) {
        $("#cAch").text("良好。");
    }
    if ($("#cGrede4").text() < -5 && $("#cGrede4").text() >= -25) {
        $("#cAch").text("不良。");
    }
    if ($("#cGrede4").text() <= -35) {
        $("#cAch").text("较差。");
    }
    switch (loan.HistoricalCredit.LoanOrNot) {
        case true:
            $("#cLoan").text("有信贷历史");
            break;
        case false:
            $("#cLoan").text("无信贷历史");
            break;
    }
    switch (loan.HistoricalCredit.RepayOrNot) {
        case true:
            $("#cRepay").text("已还清");
            break;
        case false:
            $("#cRepay").text("未还清");
            break;
    }
    if (!loan.HistoricalCredit.LoanOrNot) {
        $("#cGrede6").text(5);
    } else {
        if (loan.HistoricalCredit.RepayOrNot) {
            $("#cGrede6").text(10);
        } else {
            $("#cGrede6").text(-10);
        }
    }
    switch (loan.HistoricalProfit) {
        case 1:
            $("#cPro").text("优秀");
            $("#cGrede5").text(50);
            break;
        case 2:
            $("#cPro").text("良好");
            $("#cGrede5").text(25);
            break;
        case 3:
            $("#cPro").text("一般");
            $("#cGrede5").text(0);
            break;
        case 4:
            $("#cPro").text("不良");
            $("#cGrede5").text(-25);
            break;
        case 5:
            $("#cPro").text("极差");
            $("#cGrede5").text(-50);
            break;
    }

}

function enterVerifyInfo(res) {
    var verify = res.data.report[0];
    $("#reportID").text(verify.ResultTimeID);
    switch (verify.ExpectRange) {
        case "F":
            $("#cGrede1").text("50");
            break;
        case "E":
            $("#cGrede1").text("60");
            break;
        case "D":
            $("#cGrede1").text("65");
            break;
        case "C":
            $("#cGrede1").text("70");
            break;
        case "B":
            $("#cGrede1").text("75");
            break;
        case "A":
            $("#cGrede1").text("80");
            break;
        case "S":
            $("#cGrede1").text("85");
            break;
        case "SS":
            $("#cGrede1").text("90");
            break;
        case "SSS":
            $("#cGrede1").text("95");
            break;
    }
    var gradeTotal = parseInt($("#cGrede2").text()) +
        parseInt($("#cGrede3").text()) +
        parseInt($("#cGrede4").text()) +
        parseInt($("#cGrede5").text()) +
        parseInt($("#cGrede6").text());
    console.log(gradeTotal);
    //$("#cGrede7").text(verify.RealRange.Score);
    $("#cGrede7").text(gradeTotal);
    if ($("#cGrede7").text() > $("#cGrede1").text()) {
        $("#cDis").text("符合");
    } else {
        $("#cDis").text("不符合");
    }

}
