/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
    async fetch(request, env, ctx) {
        const requestUrl = new URL(request.url);
        let offset = requestUrl.searchParams.get('offset');
        if (offset === null) offset = 0;
        const headers = new Headers({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "86400"
        })
        let url
        if (requestUrl.pathname === "/api/search/ramen" || requestUrl.pathname === "/api/search/ramen/") {
            url = `https://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search?q=ラーメンタイマー VOCALOID&targets=tags&fields=contentId&_sort=-viewCounter&_context=testApp&_limit=100&_offset=${Number(offset) * 100}`;
        }
        else if (requestUrl.pathname === "/api/search/udon" || requestUrl.pathname === "/api/search/udon/") {
            url = `https://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search?q=うどんタイマー VOCALOID&targets=tags&fields=contentId&_sort=-viewCounter&_context=testApp&_limit=100&_offset=${Number(offset) * 100}`;
        }
        else if (requestUrl.pathname.includes("/api/pick/")) {
            url = `https://sheets.googleapis.com/v4/spreadsheets/1K6R7e_AGmJP8CWPz_l20fcpM4y1xpKfK6jDArDKMJG8/values/listdetail?key=${env.SHEETS_API_KEY}`;
            let req = new Request(encodeURI(url));
            const resListDetail = await fetch(req);
            if (requestUrl.pathname === "/api/pick/ramen" || requestUrl.pathname === "/api/pick/ramen/") {
                url = `https://sheets.googleapis.com/v4/spreadsheets/1K6R7e_AGmJP8CWPz_l20fcpM4y1xpKfK6jDArDKMJG8/values/ramen?key=${env.SHEETS_API_KEY}`;
                req = new Request(encodeURI(url));
                const resRamenPick = await fetch(req);
                const resRamenPickJson = JSON.parse(JSON.stringify(await resRamenPick.json()))
                const songIndex = Math.floor(Math.random() * (Number(JSON.parse(JSON.stringify(await resListDetail.json())).values[0][1]) + 1) - 1) + 1;
                return new Response(JSON.stringify({ contentId: resRamenPickJson.values[songIndex][0], title: resRamenPickJson.values[songIndex][1], author: resRamenPickJson.values[songIndex][2] }), { headers: headers });
            }
            if (requestUrl.pathname === "/api/pick/udon" || requestUrl.pathname === "/api/pick/udon/") {
                url = `https://sheets.googleapis.com/v4/spreadsheets/1K6R7e_AGmJP8CWPz_l20fcpM4y1xpKfK6jDArDKMJG8/values/udon?key=${env.SHEETS_API_KEY}`;
                req = new Request(encodeURI(url));
                const resUdonPick = await fetch(req);
                const resUdonPickJson = JSON.parse(JSON.stringify(await resUdonPick.json()))
                const songIndex = Math.floor(Math.random() * (Number(JSON.parse(JSON.stringify(await resListDetail.json())).values[1][1]) + 1) - 1) + 1;
                return new Response(JSON.stringify({ contentId: resUdonPickJson.values[songIndex][0], title: resUdonPickJson.values[songIndex][1], author: resUdonPickJson.values[songIndex][2] }), { headers: headers });
            }
        }
        else {
            return new Response("", { status: 404 });
        }
        let req = new Request(encodeURI(url));
        const response = await fetch(req);
        const value = JSON.stringify(await response.json());
        return new Response(value);
    },
};