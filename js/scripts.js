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

    let news = document.querySelectorAll(
        ".news .body > div,.news .information .detail"
    );
    for (let n of news) {
        n.classList.add("wow");
        n.classList.add("animate__fadeInUp");
    }

    let discuss = document.querySelectorAll(".discussion .container");
    for (let d of discuss) {
        d.classList.add("wow");
        d.classList.add("animate__fadeInUp");
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
            $(".typeBook").show("slow");
            $(".typeBook .detail .container").show("slow");
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
                        $(typeOne).show("slow");
                    } else if (stringCut === "bookName") {
                        let typeOne =
                            t.parentElement.parentElement.parentElement;
                        let typeB =
                            t.parentElement.parentElement.parentElement
                                .parentElement.parentElement;
                        $(typeB).show("slow");
                        $(typeOne).show("slow");
                    } else if (stringCut === "author") {
                        let typeOne =
                            t.parentElement.parentElement.parentElement;
                        let typeB =
                            t.parentElement.parentElement.parentElement
                                .parentElement.parentElement;
                        $(typeB).show("slow");
                        $(typeOne).show("slow");
                    }
                }
            }
            if (Check === "0") {
                $(".library .content > .desc").show("slow");
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

    // $(privButton).hide();

    for (p of privButton) {
        p.parentElement.style.display = "none";
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
        $(a).show("slow");
    });
    let loginBtn = document.querySelectorAll(".loginbtn");
    $(loginBtn).click(function () {
        $(regForm).hide();
        $(loginForm).hide();
        let a = $(loginBtn).attr("href");
        $(a).show("slow");
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
                    // alert("Vui lòng nhập email");
                    Check = "1";
                }
                let checks = document.querySelectorAll(".text-input");
                for (let c of checks) {
                    let valueC = $(c).val();
                    if (valueC === "") {
                        // alert("Vui long nhap day du thong tin");
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
                        // alert("Vui long nhap day du thong tin");
                        Check = "1";
                        break;
                    }
                }
                user = document.querySelector(".username-login");
                valUser = $(user).val();
            }
            if (Check === "0") {
                // $(privButton).show("slow");
                for (p of privButton) {
                    p.parentElement.style.display = "block";
                    let link = $(p).attr("href");
                    // alert(link);
                    $(link).show("slow");
                }
                $("header .info-user").show("slow");
                $(".name-user").text(`${valUser}`);
                $("header .button").hide();
                // Nút thông báo
                $("#notiId").show();
                $(".noti .sub").text(`Xin chào ${valUser}`);
                setTimeout(function () {
                    $("#notiId").hide();
                }, 3000);
                $(regForm).hide();
                $(loginForm).hide();
            }
        });
    }
    /*==== Nút close ====*/
    $("#close").click(function () {
        $("#notiId").hide();
    });

    /*==== Xử lý nút bar ===== */
    let barBtn = document.querySelector("header .bar");
    let navBar = document.querySelector("nav");
    navBar.classList.add("hidden");
    $(barBtn).click(function () {
        event.preventDefault();
        if (navBar.classList.contains("hidden")) {
            // navBar.style.display = "block";
            $(navBar).show();
            navBar.classList.remove("hidden");

            $("html,body").animate(
                {
                    scrollTop: 0,
                },
                1500
            );
        } else {
            // navBar.style.display = "none";
            $(navBar).hide();
            navBar.classList.add("hidden");
        }
    });

    /*==== Xử lý nút xuất hiện thêm nhóm thảo luận ====*/
    let contain = document.querySelectorAll(".discussion .container");
    for (let i = 5; i < contain.length; i++) {
        $(contain[i]).hide();
    }

    let watchMore = document.querySelector(".link-watch .link-cta");
    $(watchMore).click(function () {
        $(contain).show();
        $(".discussion .link-watch").hide();
    });

    /*==== Xử lý tìm kiếm nhóm thảo luận ==== */
    let searchGroup = document.querySelector("#searchGroup");

    let text = document.querySelectorAll(".discussion .container h4");
    searchGroup.onchange = function () {
        $(contain).show();
        let t = $(searchGroup).val(); //lấy giá trị của ô tìm kiếm
        for (let d of text) {
            if (d.innerText === t) {
                let subj = $(d).attr("rel"); //lấy rel của title
                let group = document.querySelector(`#${subj}`);
                // $(contain).hide();
                $(group).show();
            } else {
                let subj = $(d).attr("rel"); //lấy rel của title
                let group = document.querySelector(`#${subj}`);
                $(group).hide();
            }
        }
        if (t === "") $(contain).show();
    };

    /*Xử lý nút Tham gia */
    let joinBtn = document.querySelectorAll(".discussion .button .btn-cta");
    for (let j of joinBtn) {
        $(j).click(function () {
            let nameGroup = $(this).attr("rel");
            let vl = $(this).text();
            if (vl === "Tham gia") {
                $(j).attr("href", `#!`);
                this.classList.add("access");
                j.innerText = "Truy cập";
                $("#notiId").show();
                $(".noti .sub").text(`Tham gia nhóm thành công`);
                setTimeout(function () {
                    $("#notiId").hide();
                }, 3000);
            } else {
                $(j).attr("href", `#${nameGroup}`);
                let getId = $(this).attr("rel");
                $(this).attr("href", `#${getId}`);
                $(`#${nameGroup}`).show();
            }
        });
    }

    /* Xử lý nút tham gia */

    let joinInBtn = document.querySelectorAll(".container .btn-cta");
    for (let j of joinInBtn) {
        $(j).click(function () {
            let nameGroup = $(this).attr("rel");
            if (j.innerText === "Tham gia") {
                let tagBtn = document.querySelector(`#${nameGroup} .btn-cta`);
                tagBtn.innerText = "Tham gia nhóm";
                $("#notiId").show();
                $(".noti .sub").text(`Tham gia nhóm thành công`);
                setTimeout(function () {
                    $("#notiId").hide();
                }, 3000);
            } else if (j.innerText === "Truy cập") {
                let tagBtn = document.querySelector(`#${nameGroup} .btn-cta`);
                tagBtn.innerText = "Rời nhóm";
                $(tagBtn).addClass("access");
            }
        });
    }

    /* Xử lý phần bình luận */

    $(".body-page").on("click", ".post-article .icon", function () {
        event.preventDefault();
        let likeId = $(this).attr("href");
        let a = document.querySelector(likeId);
        if (a.classList.contains("fa-regular")) {
            a.classList.remove("fa-regular");
            a.classList.add("fa-solid");
            let b = document.querySelector(`${likeId}Inf`);
            let num = Number(b.innerText);
            b.innerText = num + 1;

            // b.innerText = "Đã thích";
        } else if (a.classList.contains("fa-solid")) {
            a.classList.remove("fa-solid");
            a.classList.add("fa-regular");
            let b = document.querySelector(`${likeId}Inf`);
            let num = Number(b.innerText);
            b.innerText = num - 1;
        }
    });

    /* Thêm phần bình luận khi người dùng bình luận */

    let numWrite;
    let numLike;
    $(".body-page").on("change", ".write", function () {
        let vl = this.value;
        if (vl !== "") {
            let giaTri = $(this).attr("rel");
            $(`.${giaTri}`).append(
                `<li><div class="avatar-user"><i class="fa-solid fa-user"></i></div><div class="text"><p>${vl}</p></div></li>`
            );
        }
    });

    let stat = document.querySelectorAll(".write-status");
    for (let s of stat) {
        $(s).change(function () {
            let str = document.querySelectorAll(".write");
            let rel = $(s).attr("rel");
            for (let s of str) {
                let getVal = $(s).attr("rel");
                let strCut = getVal.substring(5);
                numWrite =
                    Number(numWrite) > Number(strCut) ? numWrite : strCut;
            }
            let tag = document.querySelectorAll(".body-page .icon");
            for (let t of tag) {
                numLike = Number(numLike);
                let str = $(t).attr("href");
                let strCut = str.substring(5);
                numLike = Number(numLike) > Number(strCut) ? numLike : strCut;
            }
            if (s.value !== "") {
                $(`#group${rel} .special`).after(`<div class="post-article">
                                        <div class="row">
                                            <div class="avatar">
                                                <i class="fa-solid fa-user avatar-user"></i>
                                            </div>
                                            <div class="name">
                                                ${valUser}
                                            </div>
                                        </div>
                                        <div class="row2-desc">
                                            <p class="desc">
                                                ${s.value}
                                            </p>
                                            <img
                                                src="./assets/image/news-5.jpg"
                                                alt=""
                                                class="image-article"
                                            />
                                        </div>
                                        <div class="row-3">
                                            <a href="#like${
                                                Number(numLike) + 1
                                            }" class="icon"
                                                ><i
                                                    class="fa-regular fa-thumbs-up like-btn"
                                                    id="like${
                                                        Number(numLike) + 1
                                                    }"
                                                ></i>
                                                <span
                                                    class="icon-inf"
                                                    id="like${
                                                        Number(numLike) + 1
                                                    }Inf"
                                                    >0</span
                                                >
                                            </a>
                                        </div>
                                        <div class="status-input comment">
                                            <ul class="comment-part write${
                                                Number(numWrite) + 1
                                            }" style="width:100%">
                                            </ul>
                                            <div class="comment-user">
                                                <div class="avatar-user">
                                                    <i class="fa-solid fa-user"></i>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Viết câu trả lời..."
                                                    class="write"
                                                    rel="write${
                                                        Number(numWrite) + 1
                                                    }"
                                                />
                                            </div>
                                        </div>
                                    </div>`);
            }
        });
    }

    /*Xử lý nút tham gia nhóm ở bên trong group */

    let btnJoin = document.querySelectorAll(".header-page .btn-cta");
    for (let b of btnJoin) {
        $(b).click(function () {
            let nameGroup = $(b).attr("href");
            event.preventDefault();
            if (b.innerText === "Tham gia nhóm") {
                let vl = $(b).attr("rel");
                let btn = document.querySelector(`.container a[rel=${vl}`);
                btn.innerText = "Truy cập";
                $(btn).addClass("access");
                b.innerText = "Rời nhóm";
                $(b).addClass("access");
            } else {
                let vl = $(b).attr("rel");
                let btn = document.querySelector(`.container a[rel=${vl}`);
                btn.innerText = "Tham gia";
                $(btn).removeClass("access");
                b.innerText = "Tham gia nhóm";
                $(b).removeClass("access");
                $(nameGroup).hide();
            }
        });
    }

    /* Ấn public-item */
    let sec = document.querySelectorAll(".private-items .link");
    let allLink = document.querySelectorAll(".navigation .link");
    let publicBtn = document.querySelectorAll(".public-items .link");
    for (let p of publicBtn) {
        $(p).click(function () {
            for (let a of sec) {
                let hrefLink = $(a).attr("href");
                $(hrefLink).hide();
            }
            for (let s of publicBtn) {
                let hrefLink = $(s).attr("href");
                $(hrefLink).show();
            }
        });
    }

    /* Chỉ hiện section được ấn vào */

    for (let s of sec) {
        $(s).click(function () {
            for (let s of publicBtn) {
                let hrefLink = $(s).attr("href");
                $(hrefLink).hide();
            }
            for (let a of allLink) {
                let hrefLink = $(a).attr("href");
                $(hrefLink).hide();
            }
            let getHref = $(s).attr("href");
            $(getHref).show();
        });
    }

    /* Khi click vào logo */
    let logo = document.querySelectorAll(".logo");
    $(logo).click(function () {
        $("html,body").animate(
            {
                scrollTop: 0,
            },
            1500
        );
    });

    /* Tải lại trang khi ấn nút thoát */

    $(".exit-btn").click(function () {
        location.reload();
    });
};
