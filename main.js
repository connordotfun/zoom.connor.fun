
const videos = [
    'https://ak3.picdn.net/shutterstock/videos/1032303773/preview/stock-footage-young-professional-woman-doctor-wear-uniform-with-stethoscope-talk-by-conference-video-call-chat.webm',
    'https://ak8.picdn.net/shutterstock/videos/1037339318/preview/stock-footage-smiling-young-indian-woman-blogger-vlogger-influencer-sit-at-home-speaking-looking-at-camera.webm',
    'https://ak9.picdn.net/shutterstock/videos/1025576939/preview/stock-footage-happy-asian-teen-girl-student-looking-at-camera-webcamera-making-video-call-to-distant-friend-or.webm',
    'https://ak2.picdn.net/shutterstock/videos/1032278312/preview/stock-footage-confident-smiling-businessman-webinar-speaker-coach-entrepreneur-teacher-talking-looking-at-camera.webm',
    'https://ak1.picdn.net/shutterstock/videos/1025576981/preview/stock-footage-older-middle-aged-woman-waving-hand-looking-at-camera-speaking-to-webcam-making-video-call-at-home.webm',
    'https://ak2.picdn.net/shutterstock/videos/1031328632/preview/stock-footage-face-young-handsome-man-operator-look-at-camera-smie-taking-calls-smile-in-call-center-office.webm',
    'https://ak5.picdn.net/shutterstock/videos/1042086325/preview/stock-footage-head-shot-close-up-happy-old-retired-man-looking-at-camera-sitting-at-home-webcam-view-s.webm',
    'https://ak3.picdn.net/shutterstock/videos/1045309183/preview/stock-footage-confident-young-indian-muslim-business-woman-wear-hijab-speak-look-at-camera-islamic-arabic-lady.webm',
    'https://ak9.picdn.net/shutterstock/videos/1039338329/preview/stock-footage-serious-senior-old-grandfather-talking-looking-at-camera-at-home-elder-man-online-teacher-blogger.webm',
    'https://ak0.picdn.net/shutterstock/videos/1028517230/preview/stock-footage-overjoyed-millennial-vloggers-record-amusing-video-couple-sitting-on-couch-chatting-looking-at-web.webm',
    'https://ak9.picdn.net/shutterstock/videos/1039986119/preview/stock-footage-drunk-sleepy-woman-is-vomiting-in-toilet-sitting-on-the-floor-with-wine-bottle-in-hand-at-home.webm',
]

var users = null;

function getUsers() {
    $.ajax({
        url: 'https://randomuser.me/api/?results=9',
        dataType: 'json',
        success: function(data) {
          users = data.results;
        }
      });       
}

function createVideos() {
    //TODO: select random element to be user's webcam.
    var videoSources = _.sampleSize(videos, 9);
    var containers = document.getElementsByClassName('zoomy');
    var userIndex = _.random(8);
    for (i = 0; i < videoSources.length; i++) {
        var container = containers[i];
        var player = document.createElement('video');
        player.setAttribute('src', videoSources[i]);
        player.setAttribute('loop', '');
        player.setAttribute('autoplay', '');
        player.setAttribute('class', 'video-window');

        if (i == userIndex) {
            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                  .then(function (stream) {
                    player.srcObject = stream;
                  })
                  .catch(function (err0r) {
                    console.log("Something went wrong!");
                  });
              }
        }
        
        player.width = container.offsetWidth;
        player.height = container.offsetHeight;

        container.appendChild(player);
    }
    
}

function randomTalking() {
    var index = _.random(8);
    var containers = document.getElementsByClassName('zoomy');
    
    for (i = 0; i < containers.length; i++) {
        containers[i].style.outline = '2px none greenyellow'
    }

    containers[index].style.outline = '2px solid greenyellow';
}

function newChatMessage() {
    if (users != null && _.random(5) == 0) { //users loaded and 1/6 chance
        console.log("new message");
        $.ajax({
            url: 'https://connor-dot-fun-slack-off.herokuapp.com/new_pairing',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                user = users[_.random(8)];
                firstName = user.name.first;
                lastName = user.name.last;
                image = user.picture.thumbnail;

                createChatDom(firstName, lastName, image, data[0].text);
            }
        }); 
    }
}

function createChatDom(firstName, lastName, image, message) {
    var container = document.getElementsByClassName("control-side")[0];
    var chatElement = document.createElement('div');
    chatElement.setAttribute('class', 'chat-element');
    var chatImage = document.createElement('img');
    chatImage.setAttribute('class', 'chat-icon');
    var chatName = document.createElement('div');
    chatName.setAttribute('class', 'chat-name');
    var chatMessage = document.createElement('div');
    chatMessage.setAttribute('class', 'chat-message');

    chatElement.appendChild(chatImage);
    chatElement.appendChild(chatName);
    chatElement.appendChild(chatMessage);

    container.appendChild(chatElement);

    chatMessage.innerText = message;
    chatName.innerText = firstName + " " + lastName;

    chatImage.setAttribute('src', image);
}
