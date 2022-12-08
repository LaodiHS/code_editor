// class Chain {
//   constructor(type) {
//     this.type = type;

//     /**
//      *
//      *        sentence
//      *           clauses
//      *                '!' ',' ';'  %
//      *                      words... %     {assign a value from 1-> 100}
//      *                         word {particles} .01
//      *
//      */

//     this.NodeTemplate = class NodeTemplate {
//       constructor(string, size) {
//         this.string = string;
//         this.total = 0;
//         this.length = 0;
//         this.size = size;
//         this.iterator = 0;
//         this.mapping = {};
//       }
//       /**
//        * @returns string
//        */
//       index() {
//         return this.mapping[this.iterator++ % this.size];
//       }
//       /**
//        *
//        * @param {String} word particle
//        * @return {Object} word node object
//        */
//       nest_word(word) {
//         if (!this[word]) {
//           this[word] = { default: 0, current: 0 };
//           // Object.defineProperty(this[word], 'value', {
//           //   get: () =>
//           //   {
//           //     if(this.total === 0 ) this.current= this.default
//           //     if (!this[word].current) return 0;

//           //     return Math.floor(this[word].current-- / this.total--);
//           //   },
//           //    configurable:true
//           // })
//           this.mapping[word] = this.length;
//           this.length++;
//         }

//         this.total++;
//         this[word].default = Math.floor(++this[word].default / this.total);
//         this[word].current = Math.floor(++this[word].current / this.total);

//         return this[word];
//       }
//       clause_node(string, size) {
//         this[string] = new NodeTemplate(string, size);
//         return this[string];
//       }
//     };

//     const root_chain = {
//       chat: {},
//       thesis: {
//         paragraph: {
//           sentence: {
//             words: {},
//           },
//         },
//       },
//     };

//     let queue = Object.keys(root_chain).map((key) => [key, root_chain[key]]);

//     while (queue.length) {
//       let [keys, node] = queue.pop();

//       for (let key in node) {
//         if (key === type) {
//           this.root_chain = node;
//           queue.length = 0;
//           break;
//         }
//         queue.push([key, node[key]]);
//       }
//     }
//   }

//   parse_string_sentence(string_) {
//     string_ = string_.toLowerCase();
//     const punctuation_marks = { ",": true, ";": true, "!": true, "?": true };
//     const parent_clause = string_.split(" ");
//     let clause = "";
//     let clause_chain = new this.NodeTemplate(string_, parent_clause.length);
//     let root = clause_chain;
//     while (parent_clause.length) {
//       let word = parent_clause.shift();
//       clause += word;

//       function find() {
//         let k = 0;
//         let found = false;
//         while (k < word.length && !found) found = punctuation_marks[word[k++]];
//         return found;
//       }

//       if (find()) clause_chain.clause_node(clause, clause.split(" ").length);
//       else {
//         let word_nodes = clause_chain.nest_word(word);
//         do {
//           word = parent_clause.shift();

//           word_nodes[word] = { default: 0, current: 0 };
//         } while (word && !find());
//       }
//       clause = "";
//     }
//   }
//   meta_split(word) {}
// }

// // let word_chain = new Chain("sentence");
// // word_chain.parse_string_sentence("i like cats.")
// // word_chain.parse_string_sentence("i like dogs.")
// // word_chain.parse_string_sentence("hello, my name is mark.");
// // word_chain.parse_string_sentence("hello, my name is von")
// // word_chain.parse_string_sentence("hello! i like big butts.");
// // word_chain.parse_string_sentence("hello, how are you?");
// // word_chain.parse_string_sentence("hello, beef is my favorite food");
// // word_chain.parse_string_sentence("oh! hello, my name is twain");
// // word_chain.parse_string_sentence("jello is my favorite desert");

// let arr = [
//   "i like cats .",
//   "i like dogs .",
//   "i like cats .",
//   "hello! i like big butts .",
//   "hello! i like small butts .",
//   "hello! i like small butts too .",
//   // ("hello, my name is mark."),
//   // ("hello, my name is von"),
//   // "hello! i like big butts.",
//   // ("hello, how are you?"),
//   // ("hello, beef is my favorite food"),
//   // ("oh! hello, my name is twain"),
//   //   ("jello is my favorite desert")
// ];

// function find(word) {
//   const punctuation_marks = { ",": true, ";": true, "!": true, "?": true };
//   let k = 0;
//   let found = false;
//   while (k < word.length && !found) found = punctuation_marks[word[k++]];
//   return found;
// }
// let root = {};
// while (arr.length) {
//   let sentences = root;
//   let sentence = arr.shift();
//   const words = sentence.split(" ");
//   while (words.length) {
//     let sentence_word = words.shift();
//     sentences[sentence_word] = sentences[sentence_word] || {
//       prop: { count: 0 },
//     };
//     sentences[sentence_word].prop.count++;
//     sentences = sentences[sentence_word];
//   }
// }

// let input = "hello! i like big butts".split(" ");
// console.log(input.join(" "));
// let result = [];
// let iter_root = root;
// while (iter_root) {
//   const adjacent = Object.keys(iter_root).filter((key) => key !== "prop");
//   let weight = ["", 0],
//     size = adjacent.length;
//   while (adjacent.length) {
//     const key = adjacent.pop();
//     const avg = iter_root[key];
//     weight = weight[1] < avg.prop.count ? [key, avg.prop.count] : weight;
//   }
//   weight = weight[0];
//   result.push(weight);
//   iter_root = iter_root[weight];
// }

// console.log(result.join(" "));

// let average = root;
// iter_root = JSON.stringify(root);
// iter_root = JSON.parse(iter_root);
// let root_queue = [iter_root];
// while (root_queue.length) {
//   let root = root_queue.pop();
//   let branches = Object.keys(root).filter((key) => key !== "prop");
//   root.prop = { count: root.prop || { count: 0 }, max: 0, max_default: 0 };

//   let i = 0;
//   while (i < branches.length) {
//     let key = branches[i++];

//     root[key].prop.average =
//       root[key].prop.average ||
//       Math.ceil(root[key].prop.count / branches.length);
//     root[key].prop.default =
//       root[key].prop.default ||
//       Math.ceil(root[key].prop.count / branches.length);

//     root.prop.max += root[key].prop.default || 0;
//     root.prop.max_default += root[key].prop.default || 0;
//     root_queue.push(root[key]);
//   }
// }

// let questions = ["of butts ", "butts are healthy"];

// const skip_prop = (x) => x !== "prop";

// while (questions.length) {
//   const question = questions.pop().split(" ");
//   const tree = question.reduce((o, v) => ((o[v] = []), o), {});
//   const search = [];

//   Object.keys(iter_root)
//     .filter(skip_prop)
//     .forEach((key) => {
//       if (root[key]) search.push([key, root[key], []]);
//     });

//   while (search.length) {
//     let [word, root, chain, parent_color] = search.pop();

//     if (tree[word]) {
//       let depth_first = Object.keys(root)
//         .filter(skip_prop)
//         .map((key) => [key, root, chain.slice(), 1]);

//       while (depth_first.length) {
//         let [word_child, node, chain, color] = depth_first.pop();
//         let chain_copy;
//         if (color) {
//           chain_copy = chain.slice();
//         } else chain_copy = chain;
//         chain_copy.push(word_child);

//         if (
//           word_child === "." ||
//           !Object.keys(node[word_child]).filter(skip_prop).length
//         ) {
//           chain.push(word_child);
//           tree[word].push(chain.join(" "));
//           continue;
//         }

//         let child_nodes = node[word_child];
//         if (!child_nodes) continue;
//         for (let child_str of Object.keys(child_nodes).filter(skip_prop)) {
//           depth_first.push([child_str, child_nodes[child_str], chain_copy, 1]);
//         }
//       }
//     }

//     let q = Object.keys(root).filter(skip_prop);
//     let color = q.length > 1 ? 1 : 0;
//     while (q.length) {
//       let word_child = q.pop();
//       let chain_copy;
//       if (color) chain_copy = chain.slice();
//       else chain_copy = chain;
//       chain_copy.push(word_child);

//       let child = root[word_child];
//       if (child) search.push([word_child, child, chain_copy, color]);
//     }
//   }
//   console.log(tree);
// }

// const permutations = ["I eat cake", "I like to eat food"];
// const permute = [];
// let i = 0;
// while (permutations.length) {
//   const str = permutations.pop().split(" ");
//   permute.push(str.join(" "));
//   const c = str.length * (str.length - 1);
//   let k = 0;
//   while (k < c - 1) {
//     let letters = permute[permute.length - 1].split(" ");
//     const l = (k + 1) % str.length;
//     const d = k % str.length;
//     letters[d] = [letters[l], (letters[l] = letters[d])][0];
//     permute.push(letters.join(" "));
//     k++;
//   }
// }

//                     hello
//                         my
// oh
//     hello

// chat = Statement -> Response
// Statement
//     |
//     V
// flow_of_thought -> (from consistent elements) -> form a model -> establish a likely flow of throught in the form of a decision tree

//     // meta ordering: ",", ";", "!","?"
// { ",": { default: 50, current: 50 }, "!": { default: 50, current: 50 }, length:2, i:0,  total : 100, index:()=> () => mapping[i++ % length]}

// // word_order
// [hello] -> {
//     my: { default: 25, current: 25 }, i: { default: 25, current: 25 }, how: { default: 25, current: 25 }, beef: { default: 25, current: 25 }, total: 100, length:4, i: 0,
//         index: () => mapping[i++ % length],
//             mapping: { 0: "my", 1: "i", 2: "how", 3: "beef" }
// }

//     |
//     V
//  Response

// function arrange() {
//   let randomNum = [];
//   let i = 1000;
//   let c = 1;
//   while (i > 0) {
//     randomNum[--i] = Math.floor(Math.random() * (1000 - c) + c);
//   }

//   let circle_source = {};
//   let place = [];
//   let hold = randomNum.slice();
//   for (let val of randomNum) {
//     let circle = circle_source;

//     let node = JSON.stringify(val).split("");
//     node.push(".");
//     let depth = node.length;

//     for (let char of node) {
//       if (char === ".") {
//         circle[char] = circle[char] || [];
//         circle[char].push(val);
//         continue;
//       }
//       circle[char] = circle[char] || {};

//       circle = circle[char];
//     }
//   }

//   let lookup = circle_source;
//   let queue = [lookup];
//   let resolved = [];

//   for (let node of queue) {
//     for (let key in node) {
//       for (let marker in node[key]) {
//         if (marker === ".") {
//           for (let num of node[key]["."]) {
//             resolved.push(num);
//           }
//           continue;
//         }
//       }
//       queue.push(node[key]);
//     }
//   }
//   randomNum.sort((a, b) => a - b);
// }
// arrange();

// const perm = ["I eat cake", "I like to eat food", "I eat hamburgers", "I"];

// class wordAnalysis {
//   constructor() {
//     this.word_table = {};
//   }
//   statementTree(sentences) {
//     for (let sentence of sentences) {
//       let temp_table = this.word_table;
//       for (let word of sentence.split(" ")) {
//         temp_table[word] = temp_table[word] || { a_: 0, b_: 0, c_: 0 };
//         temp_table[word].a_++;
//         temp_table[word].b_++;
//         const length = Object.keys(temp_table[word]).length - 3;
//         temp_table[word].c_ = length;
//         temp_table = temp_table[word];
//       }

//       //{ i: [eat - 2 - 1, like - 1 - 1, dr - 3 - dt - 3: cake - 1 - 1, to - 1 - 1: eat - 1 - 1: food - 1 - 1 }
//     }
//     return this.word_table;
//   }
// }

// let tree = new wordAnalysis();
// var fs = require("fs");
// const path = require("path");
// const { resourceLimits } = require("worker_threads");
// const directoryPath = __dirname;
// let promise = false;
// fs.readdir(`${directoryPath}/txtfolder`, function (err, files) {
//   //handling error
//   if (err) {
//     return console.log("Unable to scan directory: " + err);
//   }
//   let word_tree;
//   files= files.filter(file=> parseInt(file) && parseInt(file)> 26 && parseInt(file) < 210 )
//   while(files.length) {
//     let file = files.pop();
    
    
//     if (file.includes(".txt" )) {
//       let result = fs.readFileSync(
//         `${directoryPath}/txtfolder/${file}`,
//         "utf8"
//       );
//     let text=  result.split("\n")[1].split(".").map((x) => x.trim().toLowerCase() );

//       word_tree = tree.statementTree(text);
//       promise = !files.length && text ? true : false;

//     }
    
//   };

//   while (!promise) {
  
//   }
  
//   let temp = word_tree;
//   let valuesGreaterThanTen = {}
    
//   let val = Object.keys(temp)
//     .filter(startingWord =>
//       temp[startingWord].a_ > 5
    
//   ).map(startingWord=> [startingWord,temp[startingWord].a_,temp[startingWord]] ).sort((a,b) => b[2].a_- a[2].a_)
  

//   let root_q = [{ node: word_tree, str: "" }];

//   let result = [];
//   for (let { node, str } of root_q) {
//     let filter = { a: true, b: true, c: true };
    

//     Object.keys(node).forEach((word) => {
//       if (node.a && node.a > 5) {
//         let temp = [node];
//         let str_i = str;
//         for (let leaf of temp) {
//           let keys = Object.keys(leaf);

//           if (!keys.length) result.push(str_i);

//           keys.forEach((leafNode) => {
//             temp.push(node[leafNode]);
//             str_i += " " + leafNode;
//           });
//         }
//       }

//       if (!filter[word]) {
//         root_q.push({ node: node[word], str: +str.slice() + " " + word });
//       }
//     });
//   }

//   console.log(result);
// });



