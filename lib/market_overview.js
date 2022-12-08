function market_overview(modifiers = false) {

    const item = {
        "default": ".chart"
    }
    const keys = ["usa", "world"]


    return {
        goto
    }

    function url(symbol = "none") {
        return `https://finviz.com/map.ashx?t=sec_all`
    }

    function item_select(str_arr) {
        let ar = command_functions["#mo"].keys;
        for (let str_el of str_arr) {

            let item_found = ar.find(x => x === str_el);

            if (item_found) return command_functions["#mo"].item[item_found];
        }
        return command_functions["#mo"].item["default"];
    }
    async function goto(page1, symbol, query_str, msg) {
        filtered_resources = ['font', 'images'];

        await page1.goto(url(symbol, query_str), {
            "waitUntil": "networkidle0"
        }).catch(e => {
            console.error("error ", e)
        });

        let element = await page1.$$(item_select(query_str)).catch(e => {
            console.error("error", e)
        });
        await element[0].screenshot({
            path: `public/${symbol}_max_pain.png`
        }).catch(e => {
            console.error("error ", e)
        });
        //  await browser.close().catch(e => console.error("error ", e)); // close browser

        //console.error("enviorment", `${enviorment}${symbol}_max_pain.png`);
        let file = `${enviorment}${symbol}_max_pain.png`;
        msg.channel.send("", {
            files: [file]
        }).then(x => {

        }).catch(x => {
            console.error('error', x)
        });

    }

}

let market_screen_shot= market_overview()
module.exports = {market_screen_shot:market_screen_shot}