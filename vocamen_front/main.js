function songPick() {
    let noodleType = document.getElementsByName('noodle_type');
    let checkValue = '';
    for (let i = 0; i < noodleType.length; i++) {
        if (noodleType.item(i).checked) {
            checkValue = noodleType.item(i).value;
        }
    }

    let request, res;
    if (checkValue === "3m") {
        request = new Request("https://api.vocamen.akai.pw/api/pick/ramen");
        try {
            res = fetch(request);
        }
        catch (e) {
            console.log("failed");
            return;
        }
        if (res.status == 200) {
            console.log(res.json());
        }
    }
    if (checkValue === "5m") {
        request = new Request("https://api.vocamen.akai.pw/api/pick/udon");
        try {
            res = fetch(request);
        }
        catch (e) {
            console.log("failed");
            return;
        }
        if (res.status == 200) {
            console.log(res.json())
        }
    }
}