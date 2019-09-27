'use strict';
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

const fs = require('fs');

fs.readFile('/Users/djr/Dropbox (Sunflower)/Temp/KRISEN01.json', (err, data) => {
    if (err) throw err;
    let krisen = JSON.parse(data);
    // console.log(krisen);
    const asize = krisen.length;
    var krisencpy = krisen.slice(); // Create a copy 
    var i = 0;
    var rnd0 = 0;
    krisen.forEach(function(item) {
      if (item.Priority === 'X') {
        i++;
        rnd0 = getRandomInt(krisencpy.length-1);
        krisencpy.splice(rnd0,0,item)  // Insert item twice again to increase chance of getting choosen
        rnd0 = getRandomInt(krisencpy.length-1);
        krisencpy.splice(rnd0,0,item)
        //rnd0 = getRandomInt(krisencpy.length-1);
        // krisencpy.splice(rnd0,0,item)

        // console.log(i+": "+rnd0)
        // console.log(item.PartA + " <-> " + item.PartB)
      }
      // krisencpy.push(item);
    });
    // console.log(krisencpy.length)
    // console.log(i)
    var krisenfinal = [];
    var doubles = 0;
    var previdxA = 0;
    var previdxB = 0;
    for(var i=0; krisenfinal.length < 30; i++){
    rnd0 = getRandomInt(krisencpy.length-1);
    // const item = krisen.find((item) => item.MainIndex === rnd0);
    // console.log(rnd0)
    // console.log(krisencpy[rnd0]) // Will print the second object in the array
    const xx = krisenfinal.find((item) => item.Combinations === krisencpy[rnd0].Combinations);
    if (xx != undefined || previdxA === krisencpy[rnd0].IndexA || previdxB === krisencpy[rnd0].IndexB) {
      doubles++
      // console.log(xx)
    } else {
      krisenfinal.push(krisencpy[rnd0]);
      previdxA = krisencpy[rnd0].IndexA
      previdxB = krisencpy[rnd0].IndexB
    }
    
    }
    //console.log(krisenfinal);
    console.log("Doppelte: "+doubles)
    String.prototype.repeat = function(length) {
      return Array(length + 1).join(this);
     };
     function pad (str, max) {
      str = str.toString();
      return str.length < max ? pad(" " + str, max) : str;
    }
    var i = 1;
    krisenfinal.forEach(function(item) {
      console.log(pad(i,2)+": "+(item.Priority === "X" ? "X: " : "   ")+(item.Category_Combo.substring(0,1)+"*"+pad(item.IndexA,2)+"*"+item.PartA+" ".repeat(60)).substring(0,60) + " <-> "+ item.Category_Combo.substring(1,2)+"*"+pad(item.IndexB,2)+"*"+item.PartB )
      i++
    });
    // console.log(krisenfinal.length);
    

});

console.log('This is after the read call');
