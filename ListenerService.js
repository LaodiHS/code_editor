

function ListenerService (listenerService)
{
  
  const set = new Set();
  for (let [_, val] of listenerService) {
    set.add(val.type);
  };
    ([...set]).forEach((listen) =>
    document.addEventListener(listen, (event) =>
    {
      if (listenerService.has(event.target.parentElement)) {
        const element = listenerService.get(event.target.parentElement)
        const dep = element.dep;
        element.method(event, dep);
      }
    })
  );
}

module.exports =  ListenerService ;
