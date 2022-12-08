
const axios = require('axios');

const Agent = require('agentkeepalive');
const keepAliveAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 60000, // free socket keepalive for 30 seconds
});
  const agent=    axios.create({httpAgent: keepAliveAgent});




async function getData(){
const body={
'draw': 30,
'columns[0][data]': 0,
'columns[0][name]': 'date',
'columns[0][searchable]': true,
'columns[0][orderable]': true,
'columns[0][search][value]': '08/03/2020|',
'columns[0][search][regex]': false,
'columns[1][data]': 1,
'columns[1][name]': 'symbol',
'columns[1][searchable]': true,
'columns[1][orderable]': true,
'columns[1][search][value]': 'spy',
'columns[1][search][regex]': true,
'columns[2][data]': 2,
'columns[2][name]': 'short',
'columns[2][searchable]': true,
'columns[2][orderable]': true,
'columns[2][search][value]': '|',
'columns[2][search][regex]': false,
'columns[3][data]': 3,
'columns[3][name]': 'total',
'columns[3][searchable]': true,
'columns[3][orderable]': true,
'columns[3][search][value]':'' ,
'columns[3][search][regex]': false,
'columns[4][data]': 4,
'columns[4][name]': 'EOD Vol',
'columns[4][searchable]': true,
'columns[4][orderable]': true,
'columns[4][search][value]':'' ,
'columns[4][search][regex]': false,
'columns[5][data]': 5,
'columns[5][name]': 'Open',
'columns[5][searchable]': true,
'columns[5][orderable]': true,
'columns[5][search][value]': '|',
'columns[5][search][regex]': false,
'columns[6][data]': 6,
'columns[6][name]': 'High',
'columns[6][searchable]': true,
'columns[6][orderable]': true,
'columns[6][search][value]': '',
'columns[6][search][regex]': false,
'columns[7][data]': 7,
'columns[7][name]': 'Low',
'columns[7][searchable]': true,
'columns[7][orderable]': true,
'columns[7][search][value]': '',
'columns[7][search][regex]': false,
'columns[8][data]': 8,
'columns[8][name]': 'Close',
'columns[8][searchable]': true,
'columns[8][orderable]': true,
'columns[8][search][value]': '',
'columns[8][search][regex]': false,
'columns[9][data]': 9,
'columns[9][name]': 'formula_1',
'columns[9][searchable]': false,
'columns[9][orderable]': false,
'columns[9][search][value]': '',
'columns[9][search][regex]': false,
'columns[10][data]': 10,
'columns[10][name]': 'formula_4',
'columns[10][searchable]': false,
'columns[10][orderable]': false,
'columns[10][search][value]': '',
'columns[10][search][regex]': false,
'columns[11][data]': 11,
'columns[11][name]': 'formula_2',
'columns[11][searchable]': false,
'columns[11][orderable]': false,
'columns[11][search][value]': '',
'columns[11][search][regex]': false,
'columns[12][data]': 12,
'columns[12][name]': 'formula_3',
'columns[12][searchable]': false,
'columns[12][orderable]': false,
'columns[12][search][value]': '',
'columns[12][search][regex]': false,
'order[0][column]': 0,
'order[0][dir]': 'asc',
'start': 0,
'length': 50,
'search[value]': '',
'search[regex]': false,
'wdtNonce': '050f3853a6',
'sRangeSeparator': '|',
}
 let response = await   agent(`https://www.algowins.com/wp-admin/admin-ajax.php?action=get_wdtable&table_id=2`,{method:'post','data':body, headers:{'Content-Type': 'multipart/form-data' }}).then(x=>x).catch(x=> console.log('error---->',x) );

console.log('response------>', response)



}

getData();