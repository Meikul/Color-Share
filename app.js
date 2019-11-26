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

  window.onclick = activeClickHandle;

  function activeClickHandle(e) {
    window.onclick = null;
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
    rafTimeout(()=>{
      window.onclick = activeClickHandle;
    }, 300);
  }
  // dbRef.on('value', snap => {
  //   let val = snap.val();
  //   var rgbText = document.getElementById('rgb');

  // });

  dbRef.on('value', snap => {
    const animationDuration = 1500;
    let val = snap.val();
    var rgbText = document.getElementById('rgb');
    var circleElem = document.createElement('div');
    var metaTheme = document.querySelector('meta[name=theme-color]');
    circleElem.classList.add('circle');
    document.body.append(circleElem);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let x = val.position.x;
    let y = val.position.y;
    circleElem.style.display = "block";
    circleElem.style.backgroundColor = "rgb("+val.red+","+val.green+","+val.blue+")";
    circleElem.style.top = 100*y+"vh";
    circleElem.style.left = 100*x+"vw";

    let rad = (width > height) ? 2.81 * width : 2.81 * height; 
    circleElem.style.width = rad+'px';
    circleElem.style.height = rad+'px';

    if(width > height) circleElem.classList.add('growing-widescreen');
    else circleElem.classList.add('growing-tallscreen');
    rafTimeout(() => {
      document.body.style.backgroundColor = "rgb("+val.red+","+val.green+","+val.blue+")";
      rgbText.innerHTML = `${val.red} ${val.green} ${val.blue}`;
      metaTheme.setAttribute('content', "rgb("+val.red+","+val.green+","+val.blue+")");  
      rafTimeout(() => {
        circleElem.style.display = 'none';
        circleElem.remove();
      }, (animationDuration * 0.3));
    }, (animationDuration * 0.6));
   
  });

  function rafTimeout (callback,delay){
    var dateNow=Date.now,
        requestAnimation=window.requestAnimationFrame,
        start=dateNow(),
        stop,
        timeoutFunc=function(){
          dateNow()-start<delay?stop||requestAnimation(timeoutFunc):callback()
        };
    requestAnimation(timeoutFunc);
    return{
      clear:function(){stop=1}
    }
  }
}());

// "green": {
//   ".validate" : "newData.child('green').isNumber() && newData.child('green').val() > -1 && newData.child('green').val() < 256"
//  },

 /*".write": "newData.hasChildren(['red', 'green', 'blue']) && newData.child('red').isNumber() && newData.child('green').isNumber() && newData.child('blue').isNumber()"*/