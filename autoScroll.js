
class AutoScroll
{
  static totalHeight = 0;
  
  constructor (a, b, selector)
  {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 1) throw Error("more than one element exits");
    const element = elements[0];
    this.scrollHeight = element.scrollHeight;
    this.time = 0;
  }
  async autoScroll (distance)
  {



    await new Promise((resolve, reject) =>
    {
      






    })
  }
  generateTime = (max, min) => {
    if (max < min) max = [min, min = max][0];

  }

}

async function autoScroll(){
   

        var totalHeight = 0;
        var distance = (Math.floor((Math.random() * 1000) % 500));
        let time=5000;
        generateTime = (max,min) =>
        {
            if (max < min) max = [min, min= max][0]; 
           time= (Math.floor((Math.random() * max) % min))
        };
        
        var timer = setInterval(() =>
        {
          distance = (Math.floor((Math.random() * 1000) % 900))
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            generateTime(1000, 500);
            if(totalHeight >= scrollHeight){
                clearInterval(timer);
                
            
            }
        }, time);
    

}

autoScroll()