var MarkovChain = require('markovchain')


var m = new MarkovChain('863, 456, 785')
 
m.parse('863 456 785')
 
console.log(m.parse('8.63 4.56 7.85').end(1).process())







// const MarkovGen = require('markov-generator');
 
// let markov = new MarkovGen({
//   input: ['array of sentences', 'to base the chains on', 'should go here'],
//   minLength: 10
// });
 
// let sentence = markov.makeChain();
// console.log(sentence);