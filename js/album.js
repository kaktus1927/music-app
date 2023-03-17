let container = document.querySelector(`.album`);

let search = new URLSearchParams(window.location.search);

let i = search.get(`i`);

// готово! i это нужное нам число

let album = albums[i];
if (!album) {
    container.innerHTML = `ОШИБКА!!! Редирект на главную через 5 секунд`
    setTimeout(() => {
        window.location.pathname = `index.html`
    }, 5000);

} else {

    container.innerHTML = `
    <div class="card mb-3">
    <div class="row">
        <div class="col-4">
            <img src="${album.img}" alt="" class="img-fluid rounded-start">
        </div>
        <div class="col-8">
            <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text">${album.description}</p>
                <p class="card-text"><small class="text-muted">Сборник выпущен в ${album.year} году</small></p>
            </div>

        </div>
    </div>
    </div>
    `
    let playlist = document.querySelector(`.playlist`);

    let tracks = album.tracks;

    for (let j = 0; j < tracks.length; j++) {
        let track = tracks[j];

        playlist.innerHTML += `
            <li class="track list-group-item d-flex align-items-center">
                <img src="assets/playlist_play.png" alt="" class="img-pause me-3" height="30px">
                <img src="assets/playlist_plaing.png" alt="" class="img-play me-3 d-none" height="30px">
                <div class ="name1">
                    <div>${track.title}</div>
                    <div class="text-secondary">${track.author}</div>
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style = "width: 0%;" ></div>
                </div>
                <div class="ms-auto time">${track.time}</div>
                <audio class="audio" src="${track.src}"></audio>
            </li>

        `

    }
    

    
    function setupAudio() {
        // Найди коллекцию с треками
        let trackNodes = document.querySelectorAll(`.track`); 
        for (let i = 0; i < trackNodes.length; i++) { 
            // Один элемент
            let node = trackNodes[i]; 
            let timeNode = node.querySelector(`.time`); 
            let track = tracks[i]; 
            // Тег аудио внутри этого элемента
            let imgPause = node.querySelector(`.img-pause`);
            let imgPlay = node.querySelector(`.img-play`); 
            let audio = node.querySelector(`.audio`); 
            let progressBar = node.querySelector(`.progress-bar`); 
            
            
        node.addEventListener(`click`, function () {
        // Если трек сейчас играет...
        if (track.isPlaying) {
            isPlaying = false;
            // Поставить на паузу
            audio.pause();
            imgPause.classList.remove(`d-none`);
            imgPlay.classList.add(`d-none`);

            // Если трек сейчас не играет...
        } else {
            track.isPlaying = true;
            // Включить проигрывание
            audio.play();
            imgPause.classList.add(`d-none`);
            imgPlay.classList.remove(`d-none`);
            updateProgress()
        }
        });
        function updateProgress() {
            // Нарисовать актуальное время
            let time = getTime(audio.currentTime)
            if (timeNode.innerHTML != time) {
                timeNode.innerHTML = time;
                progressBar.style.width = audio.currentTime*100/audio.duration + `%`;
            }
            
            
          
            // Нужно ли вызвать её ещё раз?
            if (track.isPlaying) {
                requestAnimationFrame(updateProgress);
            }
            
          }
        }
    }
    setupAudio()
    function getTime (time) {
        let currentSeconds = Math.floor (time);
        let minutes = Math.floor(currentSeconds/60);
        let seconds = Math.floor(currentSeconds%60);

        if (minutes < 10) {
            minutes = `0` + minutes;
        } if (seconds < 10) {
            seconds = `0` + seconds;
        }
        
        return `${minutes}:${seconds}`

    }
}