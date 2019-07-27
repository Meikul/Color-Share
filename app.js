(function(){
  var config = {
    apiKey: "AIzaSyDtPZdkvokETEdPm1X-x2z2AZKm8z0CM78",
    authDomain: "color-share.firebaseapp.com",
    databaseURL: "https://color-share.firebaseio.com/",
    storageBucket: "color-share.appspot.com",
    messagingSenderId: "30330701234"
  };
  firebase.initializeApp(config);
  const dbRef = firebase.database().ref();

  window.onclick = function(e){
    pageHeight = window.innerHeight;
    pageWidth = window.innerWidth;
    proportionalY = e.pageY / pageHeight;
    proportionalX = e.pageX / pageWidth;
    var num = [];
    for (var i=0; i<3; i++){
      num[i] = Math.floor(Math.random() * 255);
    }
    console.log(
      {
        pageX: e.pageX,
        pageY: e.pageY,
        pageHeight: window.innerHeight,
        pageWidth: window.innerWidth,
        x: proportionalX,
        y: proportionalY
      }
    );
    dbRef.set({
      red: num[0],
      green: num[1],
      blue: num[2],
      position: {
        x: proportionalX,
        y: proportionalY
      }
    });
  }

  dbRef.on('value', snap => {
    let val = snap.val();
    var oldPos = document.querySelector('#position');
    var pos = oldPos.cloneNode(true);
    oldPos.parentNode.replaceChild(pos, oldPos);
    console.log(window.innerHeight*val.position.y+"px");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let x = val.position.x;
    let y = val.position.y;
    // let size = 283 + (width > height ? "vw" : "vh");
    let elem = document.querySelector('#position');
    elem.style.display = "block";
    elem.style.backgroundColor = "rgb("+val.red+","+val.green+","+val.blue+")";
    elem.style.top = 100*y+"vh";
    elem.style.left = 100*x+"vw";
    // let textElem = document.querySelector('#pos-text');
    // textElem.style.top = -100*y+50+"vh";
    // textElem.style.left = -100*x+50+"vw";
    elem.classList.remove('growing-widescreen', 'growing-tallscreen');
    if(width > height) elem.classList.add('growing-widescreen');
    else elem.classList.add('growing-tallscreen');
    // $('#position').animate({height: '280vh', width: '280vh'}, {duration: 500, easing: 'linear'});
    // $('#position').find('#pos-text').animate({top: '+=140vh', left: '+=140vh'}, {duration: 500, easing: 'linear'});
    let rad = (width > height) ? 2.81 * width : 2.81 * height; 
    elem.style.width = rad+'px';
    elem.style.height = rad+'px';
    setTimeout(() => {
      document.body.style.backgroundColor = "rgb("+val.red+","+val.green+","+val.blue+")";
      document.getElementById('rgb').innerHTML = val.red+"  "+val.green+"  "+val.blue;
      // document.getElementById('pos-text').innerHTML = val.red+"  "+val.green+"  "+val.blue;
      document.querySelector('meta[name=theme-color]').setAttribute('content', "rgb("+val.red+","+val.green+","+val.blue+")");  
      document.querySelector('#position').style.display = "none";
    }, 300);
  });
}());

// "green": {
//   ".validate" : "newData.child('green').isNumber() && newData.child('green').val() > -1 && newData.child('green').val() < 256"
//  },

 /*".write": "newData.hasChildren(['red', 'green', 'blue']) && newData.child('red').isNumber() && newData.child('green').isNumber() && newData.child('blue').isNumber()"*/