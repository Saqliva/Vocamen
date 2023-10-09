function getNiconicoSearchData() {
    let startTime = new Date();
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const ramenSheet = spreadsheet.getSheetByName('ramen');
    const udonSheet = spreadsheet.getSheetByName('udon');
    const detailSheet = spreadsheet.getSheetByName('listdetail');
    const blankSheet = spreadsheet.getSheetByName('blankTemplate');
    const sheets = [ramenSheet, udonSheet, detailSheet];

    if (PropertiesService.getScriptProperties().getProperty("runningType") === "ramen" || !PropertiesService.getScriptProperties().getProperty("runningType")) {
        console.log("=======ramen=======");
        let ramenTempSheet
        if (!PropertiesService.getScriptProperties().getProperty("runningType")) {
            ramenTempSheet = blankSheet.copyTo(spreadsheet);
            ramenTempSheet.setName("ramenTemp");
        }
        else {
            ramenTempSheet = spreadsheet.getSheetByName('ramenTemp');
        }
        let ramenSearch = getSnapshotSearchAPI("ramen", 0);
        let totalCountRamen;
        try {
            totalCountRamen = Number(ramenSearch.meta.totalCount);
        }
        catch (e) {
            totalCountRamen = -1;
        }
        if (totalCountRamen === -1) return;
        if (totalCountRamen <= 100) {
            for (var i = 0; i < totalCountRamen; i++) {
                let currentTime = new Date();
                let seconds = (currentTime - startTime) / 1000;
                if (seconds >= 300) {
                    PropertiesService.getScriptProperties().setProperty("runningType", "ramen");
                    PropertiesService.getScriptProperties().setProperty("indexI", i);
                    ScriptApp.newTrigger('getNiconicoSearchData').timeBased().after(1000 * 60).create();
                    return;
                }
                dataEdit(ramenTempSheet, "add", ramenSearch.data[i].contentId);
            }
        }
        else if (totalCountRamen > 100) {
            let requiredRequestCountRamen = Math.ceil(totalCountRamen / 100);
            let startI = Number(PropertiesService.getScriptProperties().getProperty("indexI"));
            if (!startI) startI = 0;
            let startJ = Number(PropertiesService.getScriptProperties().getProperty("indexJ"));
            if (!startJ) startJ = 0;
            ramenSearch = getSnapshotSearchAPI("ramen", startJ);
            console.log(Number(ramenSearch.meta.totalCount));
            for (var j = startJ; j < requiredRequestCountRamen; j++) {
                startJ = 0;
                if (j + 1 !== requiredRequestCountRamen) {
                    for (var i = startI; i < 100; i++) {
                        startI = 0;
                        console.log(`i:${i}, j:${j}, ${ramenSearch.data[i].contentId}`);
                        let currentTime = new Date();
                        let seconds = (currentTime - startTime) / 1000;
                        if (seconds >= 300) {
                            PropertiesService.getScriptProperties().setProperty("runningType", "ramen");
                            PropertiesService.getScriptProperties().setProperty("indexI", i);
                            PropertiesService.getScriptProperties().setProperty("indexJ", j);
                            ScriptApp.newTrigger('getNiconicoSearchData').timeBased().after(1000 * 60).create();
                            return;
                        }
                        dataEdit(ramenTempSheet, "add", ramenSearch.data[i].contentId);
                    }
                    ramenSearch = getSnapshotSearchAPI("ramen", j + 1);
                }
                else {
                    for (var i = startI; i < totalCountRamen - j * 100; i++) {
                        startI = 0;
                        console.log(`i:${i}, j:${j}, ${ramenSearch.data[i].contentId}`);
                        let currentTime = new Date();
                        let seconds = (currentTime - startTime) / 1000;
                        if (seconds >= 240) {
                            PropertiesService.getScriptProperties().setProperty("runningType", "ramen");
                            PropertiesService.getScriptProperties().setProperty("indexI", i);
                            PropertiesService.getScriptProperties().setProperty("indexJ", j);
                            ScriptApp.newTrigger('getNiconicoSearchData').timeBased().after(1000 * 60).create();
                            return;
                        }
                        dataEdit(ramenTempSheet, "add", ramenSearch.data[i].contentId);
                    }
                }
            }
        }
        ramenSheet.setName("ramenDel");
        ramenTempSheet.setName("ramen");
        listDetailEdit(ramenTempSheet, detailSheet.getRange("B6").getValue(), true);
        detailSheet.getRange("B6").setValue(0);
        spreadsheet.deleteSheet(ramenSheet);
        PropertiesService.getScriptProperties().deleteProperty("runningType");
        PropertiesService.getScriptProperties().deleteProperty("indexI");
        PropertiesService.getScriptProperties().deleteProperty("indexJ");
        console.log("=====end ramen=====");
    }

    if (PropertiesService.getScriptProperties().getProperty("runningType") === "udon" || !PropertiesService.getScriptProperties().getProperty("runningType")) {
        console.log("=======udon=======");
        let udonTempSheet
        if (!PropertiesService.getScriptProperties().getProperty("runningType")) {
            udonTempSheet = blankSheet.copyTo(spreadsheet);
            udonTempSheet.setName("udonTemp");
        }
        else {
            udonTempSheet = spreadsheet.getSheetByName('udonTemp');
        }
        let udonSearch = getSnapshotSearchAPI("udon", 0);
        let totalCountUdon;
        try {
            totalCountUdon = Number(udonSearch.meta.totalCount);
        }
        catch (e) {
            totalCountUdon = -1;
        }
        if (totalCountUdon === -1) return;
        if (totalCountUdon <= 100) {
            for (var i = 0; i < totalCountUdon; i++) {
                let currentTime = new Date();
                let seconds = (currentTime - startTime) / 1000;
                if (seconds >= 300) {
                    PropertiesService.getScriptProperties().setProperty("runningType", "udon");
                    PropertiesService.getScriptProperties().setProperty("indexI", i);
                    ScriptApp.newTrigger('getNiconicoSearchData').timeBased().after(1000 * 60).create();
                    return;
                }
                dataEdit(udonTempSheet, "add", udonSearch.data[i].contentId);
            }
        }
        else if (totalCountUdon > 100) {
            let requiredRequestCountUdon = Math.ceil(totalCountUdon / 100);
            let startI = Number(PropertiesService.getScriptProperties().getProperty("indexI"));
            if (!startI) startI = 0;
            let startJ = Number(PropertiesService.getScriptProperties().getProperty("indexJ"));
            if (!startJ) startJ = 0;
            udonSearch = getSnapshotSearchAPI("udon", startJ);
            console.log(Number(udonSearch.meta.totalCount));
            for (var j = startJ; j < requiredRequestCountUdon; j++) {
                startJ = 0;
                if (j + 1 !== requiredRequestCountUdon) {
                    for (var i = startI; i < 100; i++) {
                        startI = 0;
                        console.log(`i:${i}, j:${j}, ${udonSearch.data[i].contentId}`);
                        let currentTime = new Date();
                        let seconds = (currentTime - startTime) / 1000;
                        if (seconds >= 300) {
                            PropertiesService.getScriptProperties().setProperty("runningType", "udon");
                            PropertiesService.getScriptProperties().setProperty("indexI", i);
                            PropertiesService.getScriptProperties().setProperty("indexJ", j);
                            ScriptApp.newTrigger('getNiconicoSearchData').timeBased().after(1000 * 60).create();
                            return;
                        }
                        dataEdit(udonTempSheet, "add", udonSearch.data[i].contentId);
                    }
                    udonSearch = getSnapshotSearchAPI("udon", j + 1);
                }
                else {
                    for (var i = startI; i < totalCountUdon - j * 100; i++) {
                        startI = 0;
                        console.log(`i:${i}, j:${j}, ${udonSearch.data[i].contentId}`);
                        let currentTime = new Date();
                        let seconds = (currentTime - startTime) / 1000;
                        if (seconds >= 240) {
                            PropertiesService.getScriptProperties().setProperty("runningType", "udon");
                            PropertiesService.getScriptProperties().setProperty("indexI", i);
                            PropertiesService.getScriptProperties().setProperty("indexJ", j);
                            ScriptApp.newTrigger('getNiconicoSearchData').timeBased().after(1000 * 60).create();
                            return;
                        }
                        dataEdit(udonTempSheet, "add", udonSearch.data[i].contentId);
                    }
                }
            }
        }
        udonSheet.setName("udonDel");
        udonTempSheet.setName("udon");
        listDetailEdit(udonTempSheet, detailSheet.getRange("B7").getValue(), true);
        detailSheet.getRange("B7").setValue(0);
        spreadsheet.deleteSheet(udonSheet);
        PropertiesService.getScriptProperties().deleteProperty("runningType");
        PropertiesService.getScriptProperties().deleteProperty("indexI");
        PropertiesService.getScriptProperties().deleteProperty("indexJ");
        console.log("=====end udon=====");
    }
}

function getSnapshotSearchAPI(type, pageOffset) {
    return JSON.parse(UrlFetchApp.fetch(`https://api.vocamen.akai.pw/api/search/${type}?offset=${pageOffset}`).getContentText());
}

function dataEdit(sheet, editType, contentId) {
    const search = videoSearchByContentId(sheet, contentId);
    if (editType === "add" && !search) {
        registerSheet(sheet, contentId, getLastRow(sheet));
    }
    if (editType === "del" && search) {
        unregisterSheet(sheet, Number(search.replace("A", "")));
    }
}

function getLastRow(sheet) {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const detailSheet = spreadsheet.getSheetByName('listdetail');
    if (sheet.getName() === "ramen") {
        return detailSheet.getRange("B1").getValue() + 2;
    }
    if (sheet.getName() === "udon") {
        return detailSheet.getRange("B2").getValue() + 2;
    }
    if (sheet.getName() === "ramenTemp") {
        return detailSheet.getRange("B6").getValue() + 2;
    }
    if (sheet.getName() === "udonTemp") {
        return detailSheet.getRange("B7").getValue() + 2;
    }
}

function listDetailEdit(sheet, amount, absolute) {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const detailSheet = spreadsheet.getSheetByName('listdetail');
    if (sheet.getName() === "ramen") {
        if (amount === 0) return;
        if (absolute) {
            detailSheet.getRange("B1").setValue(amount);
        }
        else {
            detailSheet.getRange("B1").setValue(detailSheet.getRange("B1").getValue() + amount);
        }
        detailSheet.getRange("B4").setValue(new Date());
    }
    if (sheet.getName() === "udon") {
        if (amount === 0) return;
        if (absolute) {
            detailSheet.getRange("B2").setValue(amount);
        }
        else {
            detailSheet.getRange("B2").setValue(detailSheet.getRange("B2").getValue() + amount);
        }
        detailSheet.getRange("B4").setValue(new Date());
    }
    if (sheet.getName() === "ramenTemp") {
        if (amount === 0) return;
        if (absolute) {
            detailSheet.getRange("B6").setValue(amount);
        }
        else {
            detailSheet.getRange("B6").setValue(detailSheet.getRange("B6").getValue() + amount);
        }
        detailSheet.getRange("B4").setValue(new Date());
    }
    if (sheet.getName() === "udonTemp") {
        if (amount === 0) return;
        if (absolute) {
            detailSheet.getRange("B7").setValue(amount);
        }
        else {
            detailSheet.getRange("B7").setValue(detailSheet.getRange("B7").getValue() + amount);
        }
        detailSheet.getRange("B4").setValue(new Date());
    }
}

function videoSearchByContentId(sheet, contentId) {
    const textFinder = sheet.createTextFinder(contentId);
    const cells = textFinder.findAll();
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].getA1Notation().startsWith("A") && cells[i].getValue() == contentId) return cells[i].getA1Notation();
    }
    return false;
}

function registerSheet(sheet, contentId, rowNum) {
    const videoInfo = getVideoInfo(contentId);
    if (sheet.getName() === "ramen" || sheet.getName() == "ramenTemp") {
        if (convertTimeToSec(videoInfo.length) <= 170 || convertTimeToSec(videoInfo.length) >= 190 || videoInfo.embeddable == 0) return;
    }
    else if (sheet.getName() === "udon" || sheet.getName() == "udonTemp") {
        if (convertTimeToSec(videoInfo.length) <= 290 || convertTimeToSec(videoInfo.length) >= 310 || videoInfo.embeddable == 0) return;
    }
    else return;
    sheet.getRange(`A${rowNum}`).setValue(contentId);
    sheet.getRange(`B${rowNum}`).setValue(videoInfo.title);
    sheet.getRange(`C${rowNum}`).setValue(videoInfo.user_nickname);
    sheet.getRange(`D${rowNum}`).setValue(convertTimeToSec(videoInfo.length));
    sheet.getRange(`E${rowNum}`).setValue(videoInfo.watch_url);
    listDetailEdit(sheet, 1, false);
    return;
}

function unregisterSheet(sheet, rowNum) {
    sheet.deleteRow(rowNum);
    listDetailEdit(sheet, -1, false);
    return
}

function convertTimeToSec(timeStr) {
    return Number(timeStr.split(':')[0]) * 60 + Number(timeStr.split(':')[1]);
}

function getVideoInfo(contentId) {
    const xmldoc = XmlService.parse(UrlFetchApp.fetch(`https://ext.nicovideo.jp/api/getthumbinfo/${contentId}`).getContentText());
    const thumb = xmldoc.getRootElement().getChild('thumb');
    let videoInfo = {
        video_id: thumb.getChildText("video_id"),
        title: thumb.getChildText("title"),
        description: thumb.getChildText("description"),
        thumbnail_url: thumb.getChildText("thumbnail_url"),
        first_retrieve: thumb.getChildText("first_retrieve"),
        length: thumb.getChildText("length"),
        movie_type: thumb.getChildText("movie_type"),
        size_high: thumb.getChildText("size_high"),
        size_low: thumb.getChildText("size_low"),
        view_counter: thumb.getChildText("view_counter"),
        comment_num: thumb.getChildText("comment_num"),
        mylist_counter: thumb.getChildText("mylist_counter"),
        last_res_body: thumb.getChildText("last_res_body"),
        watch_url: thumb.getChildText("watch_url"),
        thumb_type: thumb.getChildText("thumb_type"),
        embeddable: thumb.getChildText("embeddable"),
        no_live_play: thumb.getChildText("no_live_play"),
        genre: thumb.getChildText("genre"),
        user_id: thumb.getChildText("user_id"),
        user_nickname: thumb.getChildText("user_nickname"),
        user_icon_url: thumb.getChildText("user_icon_url")
    };

    let tags = thumb.getChild("tags").getChildren();
    let tagsObj = { tags: new Array() };
    for (var i = 0; i < tags.length; i++) {
        tagsObj["tags"].push(tags[i].getText());
    }
    videoInfo = Object.assign(videoInfo, tagsObj);
    return videoInfo;
}

function test() {
    console.log(getSnapshotSearchAPI("ramen", 0));
}