const fetch = require("node-fetch");
var fs = require('fs');
const axios = require('axios');
const parser = require('node-html-parser')
const cheerio = require('cheerio')
const https = require('https');
const {
  preparePageForTests
} = require("./hide_automation.js")
const yahoo_ticker_data_search_dict = require("./dataBase.js").build_dictionary();
const nasdaq_api_autocomplete_search_dictionary = require("./dataBase.js").build_dictionary();
const historical_price_dict = require("./dataBase.js").build_dictionary();
const {
  SSL_OP_COOKIE_EXCHANGE
} = require("constants");

var file = fs.createWriteStream('tickers.txt');
// url = require('url');
// const proxyUrl = url.parse(process.env.IPB_HTTP);

let httpsProxyAgent = require('https-proxy-agent');




/**
 * 
 * @param {string} symbol Stock symbol 
 * @param {string} lang Language defult en
 * @param {string} region Region defualt CA
 * @param {string} search Search deafult default
 * @return {object}
 * @example const val = { symbol: 'APHA', name: 'Aphria Inc.', exch: 'NMS', type: 'S', exchDisp: 'NASDAQ', typeDisp: 'Equity' }
 */
async function yahoo_ticker_data_search(symbol, lang = 'en', region = 'CA', search = 'default') {
  let data = yahoo_ticker_data_search_dict.search(symbol);
  if (data && data.length) {
    return data.find(x => x.symbol === symbol.toUpperCase());
  }


  const ticker_data = await axios(`http://autoc.finance.yahoo.com/autoc?region=${region}&lang=${lang}-GB&query=${symbol.toUpperCase()}`, {
    method: 'get',
    proxy: {
      host: proxyUrl.hostname,
      port: proxyUrl.port,
      headers: {
        Host: requestUrl.host,
        'Proxy-Authorization': `Basic ${new Buffer(proxyUrl.auth).toString('base64')}`,
      }
    }
  }).then(data => data.data).catch(console.error);
  let query = await ticker_data.ResultSet.Query;
  data = await ticker_data.ResultSet.Result;
  yahoo_ticker_data_search_dict.build(query.toLowerCase(), data)
  // find best match


  let symbol_data = data.find(x => x.symbol === symbo.toUpperCase());
  return symbol_data
};

/**
 * 
 * @param {string} symbol Stock symbol 
 * @param {string} lang language en default
 * @param {string} region state CA default
 * @param {string} search 
 * @return {object} @example const object = { value: 'APHA',
 * url: 'https://www.nasdaq.com/market-activity/stock s/apha',
 * label: '<a href="/market-activity/stocks/apha">',
 * assetclass: 'stocks',
 * type: 'market-activity' }
 */
async function nasdaq_api_autocomplete_search(symbol, page, lang = 'en', region = 'CA', search = 'default', ) {
  if (!symbol) return false;
  let data = nasdaq_api_autocomplete_search_dictionary.search(symbol);
  if (data && data.length) {
    return data.find(x => x.symbol === symbol.toUpperCase());
  }

  //await preparePageForTests(page);

  // page.on('response', async response => {
  //   //console.info("URL", response.request().url());
  //   // console.info("Method", response.request().method())
  //   // console.info("Response headers", response.headers())
  //   // console.info("Request headers", response.request().headers())
  //   // Use this to get the content as text
  //   // const responseText = await response.text();
  //   // ... or as buffer (for binary data)
  //   //const responseBuffer = await response.buffer();
  //   // ... or as JSON, if it's a JSON (else, this will throw!)
  //   if (response.request().url().includes('search_api_autocomplete')) {
  //     const responseObj = await response.json();
  //     console.log('jason-object----------->', responseObj);
  //   }
  // });

  // await page.goto(`https://www.nasdaq.com/search_api_autocomplete/search?q=${symbol}&langcode=${lang}`).then(x => x.data).catch(console.error)
  //  let ticker_data = await axios(`https://www.nasdaq.com/search_api_autocomplete/search?q=${symbol}&langcode=${lang}`, {
  //     method: 'get',  proxy: {
  //       host: proxyUrl.hostname,
  //       port:proxyUrl.port,
  //       headers: {
  //         Host: requestUrl.host,
  //         'Proxy-Authorization': `Basic ${new Buffer(proxyUrl.auth).toString('base64')}`,
  //       }
  //     }
  //   }).then(data => (console.log(data),data.data) ).catch(x=>console.log(x) );
     const data_l = await axios(`https://finviz.com/api/suggestions.ashx?input=${symbol}`).then(data=>data.data).catch(console.error);
  
     data_l[0]['exchange'] = data_l[0]['exchange'] === "NASD" ? "NASDAQ" : data_l[0]['exchange'];

     const stock_object ={ value: data_l[0]['ticker'], exchange:data_l[0]['exchange'],company:data_l[0]['company']}
  
  // ticker_data.forEach(compontents => {
  //   compontents.url = `https://www.nasdaq.com` + compontents.url;
  //   compontents.label = compontents.label.split(/\n/g)[1].trim();
  //   compontents.assetclass = compontents['assetclass'] ? compontents.assetclass : null;
  //   compontents.type = compontents.url.split(/\//g)[3];
  //   if (compontents.assetclass === 'stocks' && compontents.value === symbol.toUpperCase()) {
  //     stock_object = compontents;

  //   }

  // })





  // let merge_data = await stock_quote(stock_object.value, stock_object.assetclass)


  // let keys = Object.keys(merge_data.data)
  // for (let key of keys) {
  //   if (key === 'primaryData' || key === 'keyStats') continue;
  //   stock_object[key] = merge_data.data[key]
  // }


  // if (stock_object.exchange.includes('-')) stock_object.exchange = stock_object.exchange.split('-')[0];


   nasdaq_api_autocomplete_search_dictionary.build(symbol.toLowerCase(), stock_object);

  return stock_object

  // return {}


};
/**
 * 
 * @param {string} symbol stock symbols
 * @param {string} assetClass assetClass ex 'stock' 
 * @return {object} 
 * @example
 * async function stock_quote(symbol, stock_object);
 * @example
 *  return  { data:
 *  { symbol: 'APHA',
 *   companyName: 'Aphria Inc. Common Shares',
 *   stockType: 'Common Shares',
 *   exchange: 'NASDAQ-GS',
 *   isNasdaqListed: true,
 *   isNasdaq100: false,
 *   isHeld: false,
 *  primaryData:
 *     { lastSalePrice: '$4.855',
 *       netChange: '-1.025',
 *       percentageChange: '-17.43%',
 *       deltaIndicator: 'down',
 *       lastTradeTimestamp: 'DATA AS OF Oct 15, 2020 3:13 PM ET',
 *       isRealTime: true },
 *    secondaryData: null,
 *    keyStats:
 *     { Volume: [Object],
 *       PreviousClose: [Object],
 *       OpenPrice: [Object],
 *       MarketCap: [Object] },
 *    marketStatus: 'Market Open',
 *    assetClass: 'STOCKS' },
 * message: null,
 * status: { rCode: 200, bCodeMessage: null, developerMessage: null } }
 **/
async function stock_quote(symbol, assetClass) {
  const stock_data = await axios(`https://api.nasdaq.com/api/quote/${symbol.toUpperCase()}/info?assetclass=${assetClass}`, {
    method: 'get'
  }).then(data => data.data).catch(console.error);
  return stock_data;
}







const Nasdaq_api = {
  get_exchange: async (symbol) => {
    const data = await nasdaq_api_autocomplete_search(symbol);
    const lo = await stock_quote(data.value, data.assetclass);
    console.log(lo);
  },

  option_chain: async (symbol, limit = 60) => {
    const data = await nasdaq_api_autocomplete_search(symbol);
    return await axios(`https://api.nasdaq.com/api/quote/${data.value}/option-chain?assetclass=${data.assetclass}&limit=${limit}`, {
      method: 'get'
    }).then(response => response.data).catch(console.error)
  },
  expected_momentum: async (symbol, limit = 60) => {
    const data = await nasdaq_api_autocomplete_search(symbol);
    return await axios(`https://api.nasdaq.com/api/analyst/${data.value}/estimate-momentum`, {
      method: 'get'
    }).then(response => response.data).catch(console.error)
  },

  earnings_foracst: async (symbol, limit = 60) => {
    const data = await nasdaq_api_autocomplete_search(symbol);
    return await axios(`https://api.nasdaq.com/api/analyst/${data.value}/earnings-forecast`, {
      method: 'get'
    }).then(response => response.data).catch(console.error)
  },
  earnings_surprise: async (symbol, limit = 60) => {
    const data = await nasdaq_api_autocomplete_search(symbol);
    return await axios(`https://api.nasdaq.com/api/company/${data.value}/earnings-surprise`, {
      method: 'get'
    }).then(response => response.data).catch(console.error)
  },
  headline: async (symbol, range_start = 0, range_end = 8) => {
    const data = await nasdaq_api_autocomplete_search(symbol);
    return await axios(`https://www.nasdaq.com/api/v1/news-headlines-fetcher/${data.value}/${range_start}/${range_end}`, {
      method: 'get'
    }).then(response => response.data).catch(console.error)
  },
  /**
  * @emits object
  *@example
return {
  "data": {
    "symbol": "KGC",
    "totalRecords": 128,
    "tradesTable": {
      "headers": {
        "date": "Date",
        "close": "Close/Last",
        "volume": "Volume",
        "open": "Open",
        "high": "High",
        "low": "Low"
      },
      "rows": [{
          "date": "10/15/2020",
          "close": "$9.2",
          "volume": "7,120,848",
          "open": "$9.2",
          "high": "$9.335",
          "low": "$9.1"
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        },
        {
          6 items
        }
      ]
    }
  },
  "message": null,
  "status": {
    3 items
  }
}
/// <see cref="https://api.nasdaq.com/api/quote/KGC/historical?assetclass=stocks&fromdate=2020-04-16&limit=18&todate=2020-10-16#"/>
   */
  historical_price: async (symbol, page = 0, limit = 18, from_date = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDay(), to_date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()) => {
    const data = await nasdaq_api_autocomplete_search(symbol);
    console.log('stock_data ', data);
    page = page * 18;
  
    return await axios(`https://api.nasdaq.com/api/quote/${data.value}/historical?assetclass=${data.assetclass}&fromdate=2010-10-17&limit=${limit}&offset=${page}&todate=${to_date}`, {
      method: 'get'
    }).then(response => response.data).catch(console.error);
  },


  short_interest: {

    //https://api.nasdaq.com/api/quote/KGC/short-interest?assetClass=stocks


  },

  institutional_holdings: async (symbol, limit = 10) => {
    //const type = {activity:`ACTIVITY`,soldout: `SOLDOUT`,total : `TOTAL`,new: 'NEW',increased:`INCREASE`,decreased:`DECREASED`};
    const types = [`ACTIVITY`, `SOLDOUT`, `TOTAL`, 'NEW', `INCREASED`, `DECREASED`];
    let results = await Promise.all(types.map(type => axios(`https://api.nasdaq.com/api/company/${symbol}/institutional-holdings?limit=${limit}&tableonly=true&type=${type}&sortColumn=date&sortOrder=DESC`, {
      method: 'get'
    }).then(x => x)));


    let companies = results.map(result => {

      return result.data.data.holdingsTransactions;

    })



    //let m = companies[0].table


  }
};








async function Build_and_get_Data() {

  let intervals = 10;
  let months = 12;
  const historical_price = [...Array(10)].map(_ => ([...Array(3)].map(_ => [...Array(10)].fill(null))))

  const table_schema = {
    1: historical_price[data_type[0]],
    2: historical_price[data_type[0]][data_type[1]],
    3: historical_price[data_type[0]][data_type[1]][data_type[2]]
  }



  let index = 0 / 10;
  return {
    getData
  }

  function getYear(year_input, data = false) {
    let year = year_input % 10
    if (data) return historical_price[year];
    return year;
  }

  function getMonth(month_input, year, data = false) {
    let month = mongth_input % 12
    if (data) return historical_price[getYear(year)][month]
    return month;
  }

  function getDay(day_input, month_input, year_input, day_input) {
    let year = getYear(year_input)
    let month = getMonth(month_input)
    let day = day_input % 30;
    return historical_price[year][month][day]
  }


  function getData(year = 1, month = 1, day = 1, symbol) {
    const data_type = [year, month, day]
    let pointer = data_type.length - 1;
    while (pointer) {
      if (!data_type[pointer]) {
        data_type.pop();
      } else break;
      pointer--;
    }

  }
  async function set_data(symbol, year, month, day) {



    await Nasdaq_api.historical_price(symbol, )




  }

  console.log('-------->', data_type)







}







module.exports = {
  getTrickerData: yahoo_ticker_data_search,
  Nasdaq_api
};










/**
 * @return {Object} data [ {href: string, time_title : [time_string , title] ]
 */

async function getNews() {

  let obj = await Nasdaq_api.headline('apha');

  let $ = cheerio.load(obj, {
    normalizeWhitespace: true,
    xmlMode: true
  });

  let pr = Array.from($(`span`)).map(x => {
    return x.children.map(z => {
      return z.data
    })
  })



  pr = pr.reduce((empty, val, index, arr) => {
    let m = arr[index + 1];
    if (m && !(index % 2)) {
      empty.push([val[0], m[0]])
    }
    return empty;
  }, [])

  let href = Array.from($(`a`)).map(x => {
    return x.children.map(z => {
      return z.parent.attribs.href
    })


  }).map(x => x[0]);

  let news_item = href.map((x, i) => ({
    href: x,
    time_title: pr[i]
  }))


  return news_item;

}

(async () => {
  // let stock_object_search = await nasdaq_api_autocomplete_search('ACB')
  // let history = await Nasdaq_api.historical_price('ACB', 10);
  // console.log('----------->', JSON.stringify(history))
  // console.log(stock_object_search);
  //stock_quote(symbol, stock_object_search.assetclass);

  // let result = await getNews()

  // let b = Build_and_get_Data()

  // b.getData();

  // Nasdaq_api.get_exchange('ACB');

})();



module.exports = {
  getYahooTrickerData: yahoo_ticker_data_search,
  nasdaq_api_autocomplete_search: nasdaq_api_autocomplete_search,
  nasdaqApi: Nasdaq_api
};