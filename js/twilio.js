(async () => {
    const tokenRes = await fetch('https://liver-locust-8639.twil.io/video-token');
    const room = await Twilio.Video.connect(tokenRes.token, {
        name: 'VideoRoom'
    });
    console.log(`Connected to room ${room}`);
    room.participants.forEach(participantConnected);
})();

const participantConnected = (participant) => {
    const videoDom = document.createElement('div');
    videoDom.id = participant.sid;
    videoDom.className = 'videoDom';
    participant.on('trackAdded', track => trackAdded(videoDom, track));
    participant.tracks.forEach(track => trackAdded(videoDom, track));
    participant.on('trackRemoved', trackRemoved);

    $('.videosContainer').append(videoDom);
}

// トラックを追加します
function trackAdded(videoDom, track) {
    videoDom.appendChild(track.attach());
}

// トラックを削除します
function trackRemoved(track) {
    track.detach().forEach(element => element.remove());
}