const paging = {
    '➡️': (int, max) => int.num_page < max ? ++int.num_page : int.num_page,
    '⬅️': (int, _) => int.num_page > 0 ? --int.num_page : 0
  };
  const paging_reaction_filter = (reaction, user) =>{

    console.log('user---->', user);
    return reaction.emoji.name === '➡️' || reaction.emoji.name === '⬅️';}
  module.exports={paging:paging,paging_reaction_filter:paging_reaction_filter};




  