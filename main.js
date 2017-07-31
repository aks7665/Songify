// variables
var songList =  ['Badri Ki Dulhania (Title Track)','Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song'];
var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3'];

var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;

var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
        'fileName': 'song1.mp3',
        'image': 'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
        'image': 'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image': 'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:30',
        'fileName': 'song4.mp3',
        'image': 'song4.jpg'
    }]

    var slength = songs.length;
    var wid =0;
    var varvdk =0;

// to set the progress bar according the song current time
$('audio').on('timeupdate', function() {
  var audio = document.querySelector('audio');
  $('.progress-filled').stop().animate({'width': (audio.currentTime) / audio.duration * 100 + '%'}, 250, 'linear');
});

function fancyTimeFormat(time) { ////to display time in fancy format like 2:05, previously it was in seconds like 125 seconds
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function updateCurrentTime() { //function to show the time of song both duration and current time
  var song = document.querySelector('audio');
  // console.log(song.currentTime);
  // console.log(song.duration);
  var currentTime = Math.floor(song.currentTime);
  currentTime = fancyTimeFormat(currentTime);
  var duration = Math.floor(song.duration);
  duration = fancyTimeFormat(duration)
  $('.time-elapsed').text(currentTime);
  $('.song-duration').text(duration);
}

window.onload = function() { //Once whole page has loaded then this function will be called

      for(var i =0; i<songs.length; i++) { //  to display name,artist,album,duration
          // for all songs in single loop and loop will execute one less than the length of songs array bcoz it starts from 0
        var obj = songs[i]; // like obj = song array ke [0] index pr jo object h wo assign hoga
        var name = '#song' + (i+1); // like name = #song1 because when we use + operator with a string and int value(string + int) then it concat
        var song = $(name);
        song.find('.song-name').text(obj.name); // $(#song1).find('.song-name').text(obj.name); first it selects element with #song1 id then inside this finds element having song-name class and then set text there
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1) // to call fuction addSongNameClickEvent and passes file name and position to function as arguments
        changeCurrentSongDetails(songs[0]); // to set the image of song1 when page is loaded first time
    };

    

  //   // to load the song which user had played laast time before closing or refresing the page by using local storage of browser
  // if(!localStorage.getItem('name')) {  // If there is no song data stored in local storage
  //
  // }
  // else { // If any song data is stored in the local storage
  //   var audio = document.querySelector('audio');
  //   //assigning the song details that are stored in local storage
  //   currentSongNumber = localStorage.getItem('current-song-number');
  //   audio.src = localStorage.getItem('fileName');
  //   audio.currentTime = localStorage.getItem('current-time');
  //   $('.current-song-name').text(localStorage.getItem('name'));
  //   $('.current-song-album').text(localStorage.getItem('album'));
  //   $('.current-song-image').attr('src', 'img/' + localStorage.getItem('image'));
  // }

  updateCurrentTime(); // to update the time first time
  setInterval(function() { //This function will be called every time after 1 second or 1000 milliseconds
  updateCurrentTime();
  },1000);
  $('#songs').DataTable({
    paging: false // to remove page no from table
  });// to display song info using table plugin
}

function toggleSong() { //to play and pause the song and changes icon also
  var song = document.querySelector('audio');
  if(song.paused == true) { //when song is paused
    // console.log('Playing');
    $('.play-icon').removeClass('fa-play').addClass('fa-pause');
    song.play();
  }
  else {
    // console.log('Pausing');
    $('.play-icon').removeClass('fa-pause').addClass('fa-play');
    song.pause();
  }
}

function toggleVolume() { // to mute song
  var song = document.querySelector('audio');
  if(song.muted == false) { //when song is muted
    $('.volume').removeClass('fa-volume-up').addClass('fa-volume-off');
    song.muted = true;
  }
  else { //when song is unmute
    $('.volume').removeClass('fa-volume-off').addClass('fa-volume-up');
    song.muted = false;
  }
}

function toggleVdk() { // when we click on vdk button it makes main section hidden and shows vdk section
    $('.special').toggleClass('hidden');
    $('.content').toggleClass('hidden');
    $('.ivdk').toggleClass('disabled');
    varvdk = 1 - varvdk ;
  }


function changeCurrentSongDetails(songObj) { // to change the image,albumname of the songs
    $('.current-song-image').attr('src','img/' + songObj.image);
    $('.current-song-name').text(songObj.name);
    $('.current-song-album').text(songObj.album);
    wid =0;
}

function addSongNameClickEvent(songObj,position) { //to play the song when we click on the song in playlist
    var id = '#song' + position;
    var songName = songObj.fileName;
    $(id).click(function() {
      var audio = document.querySelector('audio');
      var currentSong = audio.src;
      if(currentSong.search(songName) != -1) // it checks currentSong(which is playing)'s path(song/songName/__/song1.mp3) is having the filename(song1.mp3) if it has ten it return index value otherwise -1
      { // if it is true then call toggleSong funtion to pause & play currentSong
        toggleSong();
        console.log(position);
      }
      else {  // otherwise change the the song and play this song
        audio.src = songName;
        toggleSong();
        changeCurrentSongDetails(songObj); // when song is changed then this function is called to change the image,albumname of the song
        currentSongNumber = position;
      }
    });
}

function timeJump() { // to jump the till before last 5 seconds
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}

function randomExcluded(min, max, excluded) { // random number generator
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}

function songNext() { // this fuction plays next song
  var audio = document.querySelector('audio');
  if(currentSongNumber != slength) // if song is last song in playist then when we click on next button it play first song of playlist
  {
    var nextSongObj = songs[currentSongNumber];
    audio.src = nextSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(nextSongObj);
    currentSongNumber = currentSongNumber + 1;
  }
  else{ // otherwise play next song
    var nextSongObj = songs[0];
    audio.src = nextSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(nextSongObj);
    currentSongNumber =  1;
  }
}

function songPrevious() { // this fuction plays previous song
  var audio = document.querySelector('audio');
  if(currentSongNumber == 1) // if song is first song in playist then when we click on previous utton it play last song of playlist
  {
    var nextSongObj = songs[slength - 1]; // slength is length of songs array
    audio.src = nextSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(nextSongObj);
    currentSongNumber = slength;
    // console.log(currentSongNumber);
    // console.log('if');
  }
  else // otherwise play previous song
  {
    currentSongNumber = currentSongNumber - 1;
    var nextSongObj = songs[currentSongNumber - 1];
    audio.src = nextSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(nextSongObj);
    console.log(currentSongNumber);
  }
}

function setVolume() { // fuction to change volume level by slider
   var audio = document.querySelector('audio');
   audio.volume = document.getElementById("volumebtn").value;
}

$('audio').on('ended',function() { // this event runs automatically when any song ends
  if (varvdk == 0) { // IS VDK IS OPEN THEN NO SOUND WILL BE PLAYED WHEN DRUM SOUND IS ended
    var audio = document.querySelector('audio');
    if (willShuffle == 1) { // when shuffle is on it play random song from playlist
        var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our random function
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) { // it automatically plays next song in playlist
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) { // when loop is on then it plays first song again after playlist ends
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else { // after last song is endedd in playlist then it turn on play button
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
  }
});


// welcome-screen
var name = $('#name-input').val();
var email = $('#email').val();
var pswd = $('#password').val();
var counter = 0;

function checkName() { // to check the length of user name
  name = $('#name-input').val();
  if (name.length > 2) { // it checks user name should be greater than 2 and increases counter by 1
      $('.main .user-name').text(name);
      counter++;
  } else { //otherwise error box will displayed and input box border changed to red
      $('#name-input').addClass('error');
      $('#errorBox1').removeClass('hidden');
  }
}

function checkEmail() {
  email = $('#email').val();
  if (email == "test@acadview.com") { // it checks user name should be equal to test@acadview.com
      $('#email').addClass('green');
      counter++;
  } else { //otherwise error box will displayed and input box border changed to red
      $('#email').addClass('error');
      $('#errorBox2').removeClass('hidden');
  }
}

function checkPass() {
  pswd = $('#password').val();
  if (pswd == "JavascriptRocks") { // it checks user name should be equal to JavascriptRocks and increases counter by 1
      $('#pswd').addClass('green');
      counter++;
  } else { //otherwise error box will displayed and input box border changed to red
      $('#password').addClass('error');
      $('#errorBox3').removeClass('hidden');
  }
}

$('#name-input').on('blur', function() { // this event is fire when we remove our focus from user-name input box
  checkName();
});

$('#email').on('blur', function() { // this event is fire when we remove our focus from email input box
  checkEmail();
});


$('#password').on('blur', function() { // this event is fire when we remove our focus from password input box
  checkPass();
});

$('#loginbtn').on('click', function() { // function is executed when we click on login button
    name = $('#name-input').val();
    message = "Welcome, " + name;
  if (name.length > 2 && email == "test@acadview.com" && pswd == "JavascriptRocks") {
    message = "Welcome, " + name;
    $('.user-name').text(message); //sets name on the top of main page
    $('.welcome-screen').addClass('hidden');
    $('.main').removeClass('hidden');
  }
  else {
    checkPass();
    checkName();
    checkEmail();
  }
});

$('.fa-step-backward').on('click', function() {
  // console.log('previous');
  songPrevious();
});

$('.fa-step-forward').on('click',function() {
  // console.log('next');
  songNext();
});

$('.fa-repeat').on('click',function() { // for loop icon disable and enable
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});

$('.fa-random').on('click',function() { // for shuffle icon disable and enable
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});

$('.play-icon').on('click', function() { // to play song when we click on play icon
    toggleSong();
});

$('.volume').on('click', function() { // to mute song when we click on play icon
    // console.log('clicke');
    toggleVolume();
});

$('.ivdk').on('click', function() { // to change icon we click on vdk icon
    toggleVdk();
});


$('body').on('keypress', function(event) { // to play and pause song when we press space key
  var target = event.target;
  if (event.keyCode == 32 && target.tagName !='INPUT') { // here 32 is keycode of space key and don`t call this function inside input tag so song will not pause when we are search box
    toggleSong();
  }
});

// to save the current song details in local storage when we closes or refreshes the tab
// $(window).on('unload', function() {
//   if(typeof(Storage) !== undefined) { //it checks that browser supports local storage if supports then save the song details
//     var audio = document.querySelector('audio');
//     var songObj = songs[currentSongNumber - 1];
//     // localStorage.setItem('name', songObj.name);// key - value
//     // localStorage.setItem('album', songObj.album);
//     // localStorage.setItem('artist', songObj.artist);
//     // localStorage.setItem('duration', songObj.duration);
//     // localStorage.setItem('fileName', songObj.fileName);
//     // localStorage.setItem('image', songObj.image);
//     // localStorage.setItem('current-time', audio.currentTime);
//     // localStorage.setItem('current-song-number', currentSongNumber);
//
//   }
//   else {
//     console.log("shfhjsd");
//   }
// });

// virtual drum kit

function removePlaying(e) { // THIS FUNCTION REMOVES PLAYING CLASS
  vdiv.classList.remove("playing");
}

var vdiv;
var keys;
  document.querySelector('body').addEventListener('keypress', function(event) { // ye event body select karega or usme jab koi key press karenge tab execute hoga
    if (varvdk == 1) {
        var keyCode = event.keyCode; //yaha keyCode variable me jo key press karenge uski keyCode value store hogi
        var audioId = "#aud" + keyCode;
        // console.log(audioId);
        var song = document.querySelector(audioId); // ye us keyCode ki according audio tag select karega jis pe audioId hogi
        song.currentTime = 0; // ye current time ko 0 kr dega kyoki hum ek hi key ko press karenge to is reason se je bar bar play hoga without any time gap
        song.play();
        var divId = "#div" + keyCode;
        // console.log(divId);
        vdiv = document.querySelector(divId); // ye us keyCode ki according div select karega
        // console.log(event.keyCode);
        // console.log(song);
        vdiv.classList.add("playing"); // or ye code us div pr playing class laga dega
        // console.log(vdiv);
        setTimeout(function () {
          vdiv.classList.remove("playing");
          // keys = document.querySelectorAll('.keys');
          // keys.forEach(i => i.classList.remove("playing");
          // console.log('remove');
        },100);
        // var keys = document.querySelectorAll('.keys');
        // keys.forEach(i => i.addEventListener('transitionend',removePlaying));
    }
  });

// audio effects
var wahwah;
var overdrive;
var filter;
var tremolo;
var compressor;
var phaser;
var delay;
var chorus;


function tunaDemo() {
   var tuna = new Tuna(context);

    wahwah = new tuna.WahWah({
      automode: true,                //true/false
      baseFrequency: 0.5,            //0 to 1
      excursionOctaves: 2,           //1 to 6
      sweep: 0.2,                    //0 to 1
      resonance: 10,                 //1 to 100
      sensitivity: 0.5,              //-1 to 1
      bypass: 1
    });

    overdrive = new tuna.Overdrive({
      outputGain: 0.5,         //0 to 1+
      drive: 0.7,              //0 to 1
      curveAmount: 1,          //0 to 1
      algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
      bypass: 1
    });

    filter = new tuna.Filter({
      frequency: 20000, //20 to 22050
      Q: 50, //0.001 to 100
      gain: 20, //-40 to 40 (in decibels)
      filterType: "bandpass", //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
      bypass: 1
    });

    tremolo = new tuna.Tremolo({
      intensity: 1,    //0 to 1
      rate: 8,         //0.001 to 8
      stereoPhase: 80,    //0 to 180
      bypass: 1
    });

    compressor = new tuna.Compressor({
      threshold: -1,    //-100 to 0
      makeupGain: 1,     //0 and up (in decibels)
      attack: 1,         //0 to 1000
      release: 0,        //0 to 3000
      ratio: 4,          //1 to 20
      knee: 5,           //0 to 40
      automakeup: true,  //true/false
      bypass: 1
    });

    chorus = new tuna.Chorus({
      rate: 7,         //0.01 to 8+
      feedback: 0.8,     //0 to 1+
      delay: 0.8,     //0 to 1
      bypass: 1          //the value 1 starts the effect as bypassed, 0 or 1
    });

    delay = new tuna.Delay({
      feedback: 0.85,    //0 to 1+
      delayTime: 8000,    //1 to 10000 milliseconds
      wetLevel: 0.8,    //0 to 1+
      dryLevel: 1,       //0 to 1+
      cutoff: 18000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
      bypass: 1
    });

    phaser = new tuna.Phaser({
      rate: 8,                     //0.01 to 8 is a decent range, but higher values are possible
      depth: 0.8,                    //0 to 1
      feedback: 0.8,                 //0 to 1+
      stereoPhase: 130,               //0 to 180
      baseModulationFrequency: 1100,  //500 to 1500
      bypass: 1
    });
}

 var context =new AudioContext;
 tunaDemo();
 var sonng = document.querySelector('audio');
 var source = context.createMediaElementSource(sonng);

 source.connect(wahwah.input);
 source.connect(overdrive.input);
 source.connect(filter.input);
 source.connect(tremolo.input);
 source.connect(compressor.input);
 source.connect(phaser.input);
 source.connect(delay.input);
 source.connect(chorus.input);

 var btn1 = document.querySelector('#btn1');
 var btn2 = document.querySelector('#btn2');
 var btn3 = document.querySelector('#btn3');
 var btn4 = document.querySelector('#btn4');
 var btn5 = document.querySelector('#btn5');
 var btn6 = document.querySelector('#btn6');
 var btn7 = document.querySelector('#btn7');
 var btn8 = document.querySelector('#btn8');

 wahwah.connect(context.destination);
 overdrive.connect(context.destination);
 filter.connect(context.destination);
 tremolo.connect(context.destination);
 compressor.connect(context.destination);
 phaser.connect(context.destination);
 delay.connect(context.destination);
 chorus.connect(context.destination);

 btn1.addEventListener("click",function(e) {
   $(this).toggleClass("playing");
   if(wahwah.bypass) {
     wahwah.bypass = 0;
   }
   else {
     wahwah.bypass = 1;
   }
 });

 btn2.addEventListener("click",function(e) {
   $(this).toggleClass("playing");
   if(overdrive.bypass) {
     overdrive.bypass = 0;
   }
   else {
     overdrive.bypass = 1;
   }
 });

 btn3.addEventListener("click",function(e) {
   $(this).toggleClass("playing");
   if(filter.bypass) {
     filter.bypass = 0;
   }
   else {
     filter.bypass = 1;
   }
 });

 btn4.addEventListener("click",function(e) {
   $(this).toggleClass("playing");
   if(tremolo.bypass) {
     tremolo.bypass = 0;
   }
   else {
     tremolo.bypass = 1;
   }
 });

 btn5.addEventListener("click",function(e) {
   $(this).toggleClass("playing");
   if(compressor.bypass) {
     compressor.bypass = 0;
   }
   else {
     compressor.bypass = 1;
   }
 });

 btn6.addEventListener("click",function(e) {
   $(this).toggleClass("playing");
   if(chorus.bypass) {
     chorus.bypass = 0;
   }
   else {
     chorus.bypass = 1;
   }
 });

 btn7.addEventListener("click",function(e) {
   $(this).toggleClass("playing");
   if(delay.bypass) {
     delay.bypass = 0;
   }
   else {
     delay.bypass = 1;
   }
 });

 btn8.addEventListener("click",function(e) {
   $(this).toggleClass("playing");
   if(phaser.bypass) {
     phaser.bypass = 0;
   }
   else {
     phaser.bypass = 1;
   }
 });
