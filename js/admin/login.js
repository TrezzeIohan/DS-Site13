LWDK.init(function(){
    const loginAttempt = (function(){
        $("#login-btn").addClass("m-loader m-loader--right m-loader--light");
        setTimeout(() => LWDK.request(GetFormData(), r => (console.log(r),(r[0]
            ? successRequest(() => (top.location.href = "/admin/"), `<h5>Seja bem vindo ${r[1]}!</h5>`, "top right")
            : errorRequest(null, r[1] == "bloq" ? "<h5>Você esta bloqueado! Entre em contato com o administrador.</h5>":"<h5>Dados incorretos! Tente Novamente.</h5>", "top right")),
            $("#login-btn").removeClass("m-loader m-loader--right m-loader--light"))
        ), LWDK.sleepTime * 2);
    });

    $("#login-btn").click(loginAttempt);
    $(".m-input").each(function(){
        $(this).keydown(function(e){
            e.key == "Enter" && !$(".alert").length && loginAttempt();
        });
    });

    setTimeout(() => LWDK.stopLoading(), LWDK.sleepTime * 2);
});
