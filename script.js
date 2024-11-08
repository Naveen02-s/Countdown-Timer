//Start exwcuting after loading the DOM
document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.querySelector('.start');
  const removeAllBtn = document.querySelector('.removeAll');
  const userInputDate = document.querySelector('#date');
  const userInputTime = document.querySelector('#time');

  const inputArea = document.querySelector('.input-area');
  const popup = document.querySelector('.popup')

  //add eventlistener on start button
  startBtn.addEventListener('click', (e) => {
    //prevent default behaviour--(good practice)
    e.preventDefault();

    const date = userInputDate.value;
    const time = userInputTime.value;

    //if date and value will be empty 
    if (date === '') {
        userInputDate.style.border = "1px solid red";
        return;
    } else if (time === '') {
        userInputTime.style.border = "1px solid red";
        return;
    }

    const endTime = new Date(date + " " + time);
    createNewTimer(endTime);

    // Reset input fields
    userInputDate.style.border = "none";
    userInputTime.style.border = "none";
    userInputDate.value = '';
    userInputTime.value = '';
  });

  removeAllBtn.addEventListener('click', () => {
    console.log(document.querySelector('main').childNodes)
  })

  function createNewTimer(endTime) {

    //create a unique id
    const timerID = `timer-${Date.now()}`;

    const dispSection = document.createElement('section');
    dispSection.id = timerID;
    dispSection.className = 'display-timer';

    const days = dispBox('days');
    const hours = dispBox('hours');
    const minutes = dispBox('minutes');
    const seconds = dispBox('seconds');
    const divider1 = createDivider();
    const divider2 = createDivider();
    const divider3 = createDivider();

    const removeBtn = document.createElement('div');
    removeBtn.className = 'dlt-btn';
    removeBtn.innerHTML = '&#10006';
    removeBtn.addEventListener('click', () => {
        clearInterval(interval);
        document.querySelector('main').removeChild(dispSection);
    });

    dispSection.append(days, divider1, hours, divider2, minutes, divider3, seconds, removeBtn);
    showTimer(dispSection);

    let interval = setInterval(() => {
      calculateTime(endTime, dispSection, interval);
    }, 1000);
  }

  function dispBox(boxName) {
      let box = document.createElement('div');
      box.className = `${boxName}`;

      const dispContainer = document.createElement('div');
      dispContainer.classList.add(`disp-${boxName}`, 'box');
      dispContainer.innerHTML = '00';

      const p = document.createElement('p');
      p.innerHTML = `${boxName}`;

      box.append(dispContainer, p);
      return box;
  }

  function createDivider() {
      const divider = document.createElement('div');
      divider.className = 'divider';
      divider.innerHTML = ':';
      return divider;
  }

  function calculateTime(endTime, dispSection, interval) {
    const currentTime = new Date();

    if (endTime < currentTime) {
      clearInterval(interval);
      return;
    }

    const timeLeft = (endTime - currentTime) / 1000;
    const remainingTime = {
        noOfDays: Math.floor(timeLeft / (24 * 60 * 60)),
        noOfHours: Math.floor((timeLeft / (60 * 60)) % 24),
        noOfMins: Math.floor((timeLeft / 60) % 60),
        noOfSecs: Math.floor(timeLeft % 60),
    };

    displayCountdown(remainingTime, dispSection);
  }

  function displayCountdown(remainingTime, dispSection) {
    const days = dispSection.querySelector('.disp-days');
    const hours = dispSection.querySelector('.disp-hours');
    const minutes = dispSection.querySelector('.disp-minutes');
    const seconds = dispSection.querySelector('.disp-seconds');

    days.innerText = remainingTime.noOfDays.toString().padStart(2, '0');
    hours.innerText = remainingTime.noOfHours.toString().padStart(2, '0');
    minutes.innerText = remainingTime.noOfMins.toString().padStart(2, '0');
    seconds.innerText = remainingTime.noOfSecs.toString().padStart(2, '0');

    //adding audio and popup when countdown reaches 00:00:00:00
    if(days.innerText === "00" && hours.innerText === "00" && minutes.innerText === "00" && seconds.innerText === "00" ){
      document.querySelector('main').removeChild(dispSection);
      let audio = new Audio("Assets/audio.mp3");
      audio.play();
      showPopup();
  }
  }

  function showTimer(newTimer) {
      document.querySelector('main').appendChild(newTimer);
  }

function showPopup() { 
  inputArea.style.display = 'none'
  popup.style.display = 'block';
}

//adding event on popup 
popup.addEventListener('click', () => {
  inputArea.style.display = 'grid';
  popup.style.display = 'none';
})
});
