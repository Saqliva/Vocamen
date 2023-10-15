var cookieObj = {};
var shareData = {
    videoId: "",
    videoTitle: ""
};

function onload() {
    onResize();
    loadCookie();

    let timeoutId = 0;
    window.addEventListener("resize", function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            onResize();
        }, 500);
    }, false);

    const agent = window.navigator.userAgent.toLowerCase()
    if (agent.indexOf("firefox") != -1) {
        alert("Firefoxでの閲覧を検出しました。\n動作への影響はありませんが、Firefoxの仕様上、らぁめん/うどんの選択状況が確認できない場合があります。ご了承ください。")
    }

    if (!window.matchMedia('(display-mode: standalone)').matches) {
        console.log(cookieObj)
        if (cookieObj.pwasuggest == null) {
            document.cookie = "pwasuggest=enabled";
            loadCookie();
        }
    }
    else {
        document.getElementById("pwa_sug").remove();
    }
}

function loadCookie() {
    let s = document.cookie.split(';');
    s.forEach(function (value) {
        let key_value = value.split('=');
        let obj = { [key_value[0]]: key_value[1] };
        Object.assign(cookieObj, obj);
    });
}

function onResize() {
    const boxes = [
        document.getElementById("banner"),
        document.getElementById("video_area"),
        document.getElementById("video_details"),
        document.getElementById("mainpanel")
    ];

    let boxesHeight = 0;
    for (let i = 0; i < boxes.length; i++) {
        boxesHeight += boxes[i].offsetHeight;
    }

    if (boxesHeight < window.innerHeight)
        boxesHeight += window.innerHeight - boxesHeight;

    const main = document.getElementById("main");
    main.style.minHeight = `${boxesHeight}px`;
}

function songPick() {
    const videoArea = document.getElementById("video_area");
    if (document.querySelector("#video_area script") != null) {
        while (videoArea.lastChild) {
            videoArea.removeChild(videoArea.lastChild);
        }
    }
    videoArea.classList.add("video_loading");
    const videoTitleElem = document.getElementById("video_title");
    const videoAuthorElem = document.getElementById("video_author");
    const shareAndLinkBtns = document.querySelector("#video_details div:nth-child(2)");
    const shareButton = document.querySelector("#video_details div:nth-child(2) a:nth-child(1)");
    const linkButton = document.querySelector("#video_details div:nth-child(2) a:nth-child(2)");
    videoTitleElem.innerText = "選曲中...";
    videoAuthorElem.innerText = "";
    shareAndLinkBtns.classList.add("hidden");
    linkButton.href = "";
    const noodleType = document.getElementsByName('noodle_type');
    let checkValue = '';
    for (let i = 0; i < noodleType.length; i++) {
        if (noodleType.item(i).checked) {
            checkValue = noodleType.item(i).value;
        }
    }

    let xhr = new XMLHttpRequest();

    try {
        if (checkValue === "3m") {
            xhr.open("GET", "https://api.vocamen.akai.pw/api/pick/ramen");
        }
        else if (checkValue === "5m") {
            xhr.open("GET", "https://api.vocamen.akai.pw/api/pick/udon");
        }
        xhr.send();
    }
    catch (e) {
        console.log("failed");
        return;
    }
    xhr.onload = function () {
        response = JSON.parse(xhr.response)
        console.log(response);
        let videoAreaW = videoArea.clientWidth;
        let videoAreaH = videoArea.clientHeight;
        let videoId = response.contentId;
        let videoTitle = response.title;
        let videoAuthor = response.author;
        const script = document.createElement("script");
        const noscript = document.createElement("noscript");
        const vidA = document.createElement("a");
        script.src = `https://embed.nicovideo.jp/watch/${videoId}/script?w=${videoAreaW}&h=${videoAreaH}`
        vidA.href = `https://www.nicovideo.jp/watch/${videoId}`;
        vidA.innerText = videoTitle;
        videoArea.appendChild(script);
        script.after(noscript);
        noscript.appendChild(vidA);

        videoTitleElem.innerText = videoTitle;
        videoAuthorElem.innerText = videoAuthor;

        linkButton.href = `https://nico.ms/${videoId}`;
        shareData.videoId = videoId;
        shareData.videoTitle = videoTitle;

        if (shareAndLinkBtns.classList.contains("hidden"))
            shareAndLinkBtns.classList.remove("hidden");

        if (cookieObj.pwasuggest === "enabled") {
            const pwaSug = document.getElementById("pwa_sug");
            if (pwaSug) pwaSug.classList.add("show");
        }

        shareButton.addEventListener("click", () => {
            if (window.navigator.share) {
                try {
                    window.navigator.share({
                        title: `ボカ麺`,
                        text: `${shareData.videoTitle}\n#ボカ麺 で聴いています\nhttps://vocamen.akai.pw\n#${shareData.videoId}`,
                        url: `https://nico.ms/${shareData.videoId}`,
                    });
                } catch (e) {
                    alert(e.message);
                }
            }
        });

        setTimeout(() => {
            videoArea.classList.remove("video_loading")
        }, "1000");
    }
}

function pwa_close(isForever) {
    const pwaSug = document.getElementById("pwa_sug");
    pwaSug.classList.remove("show");
    setTimeout(() => {
        pwaSug.remove();
    }, "1000");
    if (isForever) {
        document.cookie = "pwasuggest=blocked";
    }
}

function togglePanel() {
    const mainPanel = document.getElementById("mainpanel");
    if (mainPanel.classList.contains("hidden")) {
        mainPanel.classList.remove("hidden");
    }
    else {
        mainPanel.classList.add("hidden");
    }
}

function toggleAbout() {
    const aboutContainer = document.getElementById("about_container");
    if (aboutContainer.classList.contains("hidden")) {
        aboutContainer.classList.remove("hidden");
    }
    else {
        aboutContainer.classList.add("hidden");
    }
}