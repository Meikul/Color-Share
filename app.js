(function(){
  var config = {
    apiKey: "AIzaSyDtPZdkvokETEdPm1X-x2z2AZKm8z0CM78",
    authDomain: "color-share.firebaseapp.com",
    databaseURL: "https://color-share.firebaseio.com",
    storageBucket: "color-share.appspot.com",
    messagingSenderId: "30330701234"
  };
  firebase.initializeApp(config);
  const dbRef = firebase.database().ref();

  window.onclick = function(){
    var num = [];
    for (var i=0; i<3; i++){
      num[i] = Math.floor(Math.random() * 255);
    }
    dbRef.set({
      red: num[0],
      green: num[1],
      blue: num[2]
    });
  }

  dbRef.on('value', snap => {
    let val = snap.val();
    document.body.style.backgroundColor = "rgb("+val.red+","+val.blue+","+val.green+")";
    document.getElementById('rgb').innerHTML = val.red+"  "+val.blue+"  "+val.green;
  });
}());
