function onload() {
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
    videoTitleElem.innerText = "選曲中...";
    videoAuthorElem.innerText = "";
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
        setTimeout(() => {
            videoArea.classList.remove("video_loading")
        }, "1000");
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