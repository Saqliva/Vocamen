function songPick() {
    let noodleType = document.getElementsByName('noodle_type');
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
        let videoArea = document.getElementById("video_area");
        if (document.querySelector("#video_area script") != null) {
            while(videoArea.lastChild){
                videoArea.removeChild(videoArea.lastChild);
            }
        }
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

        let videoTitleElem = document.getElementById("video_title");
        let videoAuthorElem = document.getElementById("video_author");

        videoTitleElem.innerText = videoTitle;
        videoAuthorElem.innerText = videoAuthor;
    }
}