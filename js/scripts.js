window.onload = function () {
    /*===== Nút go to Top =====*/
    // Ẩn nút gotoTop
    $("#gotoTop").hide();

    // Cuộn xuống dưới 200px hiện nút, ngược lại ẩn
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 200) $("#gotoTop").show("slow");
        else if ($(this).scrollTop() < 200) $("#gotoTop").hide("slow");
    });

    // Khi click cuộn lên trong vòng 1500ms
    $("#gotoTop").click(function () {
        $("html,body").animate(
            {
                scrollTop: 0,
            },
            1500
        );
    });

    /*===== Trượt đến đâu hiệu ứng xuất hiện đến đấy ===== */

    let row = document.querySelectorAll(".intro .row");
    for (let r of row) {
        r.classList.add("wow");
    }

    let oddRow = document.querySelectorAll(".intro .row:nth-child(odd)");
    for (let r of oddRow) {
        r.classList.add("animate__bounceInLeft");
    }

    let evenRow = document.querySelectorAll(".intro .row:nth-child(even)");
    for (let r of evenRow) {
        r.classList.add("animate__bounceInRight");
    }

    let detail = document.querySelectorAll(
        ".library .detail,.library .typeBook .title"
    );
    for (let d of detail) {
        d.classList.add("wow");
    }

    let oddDetail = document.querySelectorAll(
        ".library .typeBook:nth-child(odd) .detail, .library .typeBook:nth-child(odd) .title"
    );
    for (let o of oddDetail) {
        o.classList.add("animate__fadeInBottomLeft");
    }

    let evenDetail = document.querySelectorAll(
        ".library .typeBook:nth-child(even) .detail, .library .typeBook:nth-child(even) .title"
    );
    for (let e of evenDetail) {
        e.classList.add("animate__fadeInBottomRight");
    }

    let source = document.querySelectorAll(".resource");
    for (let s of source) {
        s.classList.add("wow");
    }

    let oddSource = document.querySelectorAll(".resource:nth-child(odd)");
    for (let o of oddSource) {
        o.classList.add("animate__fadeInLeft");
    }

    let evenSource = document.querySelectorAll(".resource:nth-child(even)");
    for (let e of evenSource) {
        e.classList.add("animate__fadeInRight");
    }

    wow = new WOW({
        boxClass: "wow", // default
        animateClass: "animate__animated", // default
        offset: 0, // default
        mobile: true, // default
        live: true, // default
    });
    wow.init();

    /* ====== Chức năng tìm kiếm của thư viện ===== */

    $(".library .content > .desc").hide(); //Ẩn chữ không tìm thấy

    let textOption = document.querySelectorAll(
        ".library .text-options .text-option"
    );

    $(textOption).hide();
    $(".library .search .option-btn:first-child").addClass("active"); //Mặc định nút con đầu là active sẵn

    $(".library .search .option-btn").click(function () {
        // chặn sự kiện mặc định
        event.preventDefault();

        // xử lý css
        $(".library .search .option-btn").removeClass("active");
        $(this).addClass("active");

        // xử lý các ô nhập liệu xuất hiện khi ấn vào
        $(textOption).hide(); //tất cả các ô nhập liệu đều ẩn
        let name = $(this).attr("href");
        $(name).show(); //chỉ hiện ô nhập liệu có id trùng với href của btn

        let string = name; //Cắt id
        let stringCut = string.substring(1);

        if (stringCut === "all") {
            $(".typeBook").show();
            $(".typeBook .detail .container").show();
        }

        let search = document.querySelector(`${name}`);
        search.onchange = function () {
            let Check = "0";
            $(".library .content > .desc").hide();
            let texts = document.querySelectorAll(`.typeBook .${stringCut}`);

            if (stringCut === "type") {
                let typeAll = document.querySelectorAll(".typeBook");
                $(typeAll).hide();
            } else if (stringCut === "bookName") {
                let typeAll = document.querySelectorAll(
                    ".typeBook .detail .container"
                );
                $(".typeBook").hide();
                $(typeAll).hide();
            } else if (stringCut === "author") {
                let typeAll = document.querySelectorAll(
                    ".typeBook .detail .container"
                );
                $(".typeBook").hide();
                $(typeAll).hide();
            }

            for (let t of texts) {
                if (t.innerText.includes(this.value) === true) {
                    Check = "1";
                    if (stringCut === "type") {
                        let typeOne = t.parentElement;
                        $(typeOne).show();
                    } else if (stringCut === "bookName") {
                        let typeOne =
                            t.parentElement.parentElement.parentElement;
                        let typeB =
                            t.parentElement.parentElement.parentElement
                                .parentElement.parentElement;
                        $(typeB).show();
                        $(typeOne).show();
                    } else if (stringCut === "author") {
                        let typeOne =
                            t.parentElement.parentElement.parentElement;
                        let typeB =
                            t.parentElement.parentElement.parentElement
                                .parentElement.parentElement;
                        $(typeB).show();
                        $(typeOne).show();
                    }
                }
            }
            if (Check === "0") {
                $(".library .content > .desc").show();
            }
        };
    });

    /* ====== Xử lý nút like ===== */

    $(".library .row-2 .icon").click(function () {
        event.preventDefault();
        let likeId = $(this).attr("href");

        let a = document.querySelector(likeId);
        if (a.classList.contains("fa-regular")) {
            a.classList.remove("fa-regular");
            a.classList.add("fa-solid");
            let b = document.querySelector(`${likeId}Inf`);
            b.innerText = "Đã thích";
        } else if (a.classList.contains("fa-solid")) {
            a.classList.remove("fa-solid");
            a.classList.add("fa-regular");
            let b = document.querySelector(`${likeId}Inf`);
            b.innerText = "Thích";
        }
    });

    /*=========== Xử lý item public và item private =========== */
    let privButton = document.querySelectorAll("#linkId .link");

    $(privButton).hide();

    for (p of privButton) {
        let link = $(p).attr("href");
        // alert(link);
        $(link).hide();
    }

    /*============== Xử lý ô đăng nhập đăng ký ============= */
    let regForm = document.getElementById("regId");

    let loginForm = document.getElementById("loginId");

    $(loginForm).hide();
    let regBtn = document.querySelectorAll(".regbtn");
    $(regBtn).click(function () {
        $(regForm).hide();
        $(loginForm).hide();
        let a = $(regBtn).attr("href");
        $(a).show();
    });
    let loginBtn = document.querySelectorAll(".loginbtn");
    $(loginBtn).click(function () {
        $(regForm).hide();
        $(loginForm).hide();
        let a = $(loginBtn).attr("href");
        $(a).show();
    });

    /*=============Xử lý dữ liệu nhập vào đăng nhập, đăng ký  ============ */

    $(".info-user").hide();
    let submit = document.querySelectorAll("input[type=submit]");
    let Check = "0";

    let user;
    let valUser;
    for (let s of submit) {
        $(s).click(function () {
            Check = "0";
            let typeBtn = $(s).attr("value");
            if (typeBtn === "Đăng ký") {
                let emailCheck = document.querySelector("input[type=email]");
                let val = $(emailCheck).val();
                if (val === "") {
                    alert("Vui lòng nhập email");
                    Check = "1";
                }
                let checks = document.querySelectorAll(".text-input");
                for (let c of checks) {
                    let valueC = $(c).val();
                    if (valueC === "") {
                        alert("Vui long nhap day du thong tin");
                        Check = "1";
                        break;
                    }
                }
                user = document.querySelector(".username-reg");
                valUser = $(user).val();
            } else if (typeBtn === "Đăng nhập") {
                Check = "0";
                let checks = document.querySelectorAll(".input-login");
                for (let c of checks) {
                    let vlC = $(c).val();
                    if (vlC === "") {
                        alert("Vui long nhap day du thong tin");
                        Check = "1";
                        break;
                    }
                }
                user = document.querySelector(".username-login");
                valUser = $(user).val();
            }
            if (Check === "0") {
                $(privButton).show();
                for (p of privButton) {
                    let link = $(p).attr("href");
                    // alert(link);
                    $(link).show();
                }
                $("header .info-user").show();
                $(".name-user").text(`${valUser}`);
                $("header .button").hide();
                $(regForm).hide();
                $(loginForm).hide();
            }
        });
    }
};
