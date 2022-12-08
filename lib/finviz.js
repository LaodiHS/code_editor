const axios = require('axios')
const Discord = require('discord.js');
const {
  paging,
  paging_reaction_filter
} = require('./paging.js')
const {
  nasdaq_api_autocomplete_search
} = require("./tickers.js")
const finviz_dict = require("./dataBase.js").build_dictionary();

/**
 * 
 * @param {*} symbol string
 * @param {*} page puppeteer_module.js
 *@example ['stock price chart','stock data ex P/E ','ratings', 'meta catagories' ]
 */

setInterval(() => {

  finviz_dict.clear();

}, 8.64e7)


async function finvizStock(symbol, page) {
  let symbol_data = await nasdaq_api_autocomplete_search(symbol, page);
  let data = finviz_dict.search(symbol_data.value);
  if (data && data.length) {
    return data;
  }
  await page.goto(`https://finviz.com/quote.ashx?t=${symbol_data.value}`, {
    "waitUntil": "networkidle0",
  }).then(data =>
  {

   return data
  }).catch(
    console.error
  );
  const finviz_stock_speck = await page.evaluate(() => {
    const retreve = [];
    retreve[0] = document.getElementById('chart0').getAttribute('src');
    retreve[1] =[Array.from(document.getElementsByClassName("fullview-links")[1].children).map(meta=> ( { href : meta.href,text : meta.textContent } ))]
    retreve[2] = Array.from(document.getElementsByClassName('snapshot-table2')[0].getElementsByTagName('tr')).map(td => td.innerText.split('\t'));
    retreve[3] = Array.from(document.querySelectorAll(" .body-table-rating-upgrade, .body-table-rating-neutral, .body-table-rating-downgrade"))
      .map(col => Array.from(col.childNodes).map((row) => row.textContent)).filter((_, i, q) => (i % 2)).map(_ => _.filter(x => (!x ^ x != "\n")))
    retreve[4] = Array.from(Array.from(document.getElementsByClassName('fullview-links')[1].childNodes).map(node =>
      (node instanceof HTMLElement && node.hasAttribute('href')) ? [node.textContent, node.getAttribute('href')] : '')).filter(x => x)
    return retreve;
  }).then(x => x).catch(console.error);
  finviz_stock_speck.unshift(symbol_data);
  finviz_dict.build(symbol, finviz_stock_speck);
  return finviz_stock_speck;
}
async function finviz(symbol, query_str, page, msg) {
  let unstructured_data = await finvizStock(symbol, page);
  if (!unstructured_data || !unstructured_data.length) {
    msg.channel.send("That symbol might not be supported at this time or something may have went wrong").then(x => x).catch(console.error);
    return;
  }

  let format_data = unstructured_data.reduce((acc, val) => acc.concat(val), []);
  const symbol_data = format_data.shift();
  const chart = format_data.shift();
  const meta_data = format_data.shift();
 symbol_data.meta_data= meta_data;

  let data = [];
 
  for (let k = 0; k < format_data.length; k++) {
    let array = []
    let page = format_data[k];
    for (let i = 0; i < page.length; i += 2) {
      const data_object = {};

      if (page[i] && page[i + 1] && page[i + 1] != '-' && !page[i + 1].includes('.ashx')) {
        data_object['name'] = page[i]
        data_object['value'] = page[i + 1];
        data_object['inline'] = true;

        array.push(data_object);
      }
    }
    data.push(array);
  }


  let num_page = 0;
  const num_page_instance = {
    num_page: num_page
  };
  const embed = set_embed_and_page(num_page_instance, data, chart, symbol, symbol_data);
  const nav = await msg.channel.send(embed);

  /**
   *  User {
  id: '558127001584533515',
  username: 'ThiccRic',
  bot: false,
  discriminator: '3868',
  avatar: 'def39d3b76560d58474d473964919910',
  flags: UserFlags { bitfield: 0 },
  lastMessageID: '774004356021223424',
  lastMessageChannelID: '746893112093310976' }
   */



  const user_object = msg.author

  const left = await nav.react('⬅️');
  await left.message.react('➡️')
    .then(mReaction => {
    
      
      const collector = mReaction.message.createReactionCollector((reaction, user) => {
        if (user.id != user_object.id) return false;
        return reaction.emoji.name === '➡️' || reaction.emoji.name === '⬅️'
      }, {
        time: 180000,
        dispose: true
      });
     
      collector.on('remove', collect => {
        let reaction = collect.emoji.name;
        let page_dif = num_page_instance.num_page;
        if (page_dif === paging[reaction](num_page_instance, data.length)) return;
        const embed = set_embed_and_page(num_page_instance, data, chart, symbol, symbol_data)
        collect.message.edit(embed)
          .then(x => x)
          .catch(console.error);
      });
    
      collector.on('collect', collect => {

        const reaction = collect.emoji.name
        let diff = num_page_instance.num_page
        if (diff === paging[reaction](num_page_instance, data.length)) return;

        const embed = set_embed_and_page(num_page_instance, data, chart, symbol, symbol_data)
        collect.message.edit(embed)
          .then(newMsg => {})
          .catch(console.error);
      });
      collector.on('end', collected => {
        msg.channel.send(user_object.username + ` your interactive session has ended :stuck_out_tongue_winking_eye: `)
      });
    })
    .catch(console.error);
}


function set_embed_and_page(num_page_instance, data, chart, symbol,symbol_data) {

  symbol = symbol.toUpperCase();
  const embed = {
    color: 0x0099ff,
    title: `${symbol_data.company} `,
    url: '',
    author: {
      name: `Use the left and right arrows ⬅️ ➡️ to navigate through the metrics for the chart`,
      icon_url: '',
      url: '',
    },
    description: `${symbol_data.meta_data.map((x,i,a) =>{ 
      let val =  (i < a.length - 1 ) ? " | " : " ";
      let meta = x.text
       return meta + val; 
      })}`.replace(/,/g, " "),
    thumbnail: {
      url: 'https://images.freeimg.net/rsynced_images/news-97862_1280.png',
    },
    fields: data[num_page_instance.num_page],
    image: {
      url: chart + `&_=900000`,
    },
    timestamp: new Date(),
    footer: {
      text: `page ${num_page_instance.num_page} of ${(data.length-1) - (num_page_instance.num_page)}`,
      icon_url: `https://images.freeimg.net/rsynced_images/news-97862_1280.png`,
    },
  };

  return new Discord.MessageEmbed(embed);
}

module.exports = {
  finviz
};