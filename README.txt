问题说明：
1.登录显示用户已经登录
2.数据库有公司重名，若出现重名，返回错误。
3.get_myself时返回user{}为空


nav.html为导航栏，包括get_myself以及exit的ajax代码。

ajax.js：主要包括
    signin.html,
    revisepassword.html,
    enterinfo1.html,
    enterinfo3.html,
    verification.html,
    cpmpanyReport.html
页面的ajax请求代码。


function.js主要包括：
    signIn.html
    revisepassword.html
    verification.html
    companyReport.html
的ajax请求的success函数。


common.js主要包括：
    returntohome的代码
    以及输入框获得焦点是删除错误提醒的代码
    
    
verify.js主要包括：
    所有需要正则表达式的函数。用于判断输入是否正确。


页面跳转结构：
1.
signin.html --home.html--revisepassword.html--home.html
2.
signin.html --home.html--beforeevaluction.html--enterinfo1.html--
                enterinfo2.html--enterinfo3.html--verification.html--home.html
3.
signin.html --home.html--searchreport.html--companyreport.html--home.html
4.
signin.html --home.html--deletereport.html