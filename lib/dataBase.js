// const {write_to_file} = require("./lib/write_to_file");

// symbols key: string 

function build_dictionary() {
    let dict = {}

    return {
        build,
        search,
        dict
    }

    function build(string, data) {
        string = string.toLowerCase()
       // console.log('string', string); 
        let str = string.split('').map(x => x.charCodeAt() - 'a'.charCodeAt());
        if (typeof (string) != 'string' || !str.every(m => m >= 0 && m <= 25)) return 'not a string';


        let len = str.length;
        let start = 0;
        let temp = dict;
        while (start < len) {
            let code = str[start];
            if (!temp[code] && (start !== len - 1)) {
                temp[code] = {};
                temp = temp[code];
            }
            if (start === len - 1) {
                temp[code] = data;
            }
            start++;
        }
        return dict;
    }

    function search(string) {
        string = string.toLowerCase();
       // console.log('string--->', string)
        let str = string.split('').map(x => x.charCodeAt() - 'a'.charCodeAt());
        let len = str.length;
        let start = 0;
        let temp = dict;
        while (start < len) {
            if (temp[str[start]]) {
                temp = temp[str[start]]
                start++;
            } else return false;
        }
       // console.log('temp--->', temp)
        return temp ? temp : false;
    }
    function clear(){
        dict={};
    }
}


// const user_dic = new build_dictionary();

// let build = user_dic.build('h7llo', {
//     data: "some stuff"
// })

// let dic = user_dic.dict;


module.exports = {
    build_dictionary
};