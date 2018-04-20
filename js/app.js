document.addEventListener("DOMContentLoaded", function() {


  let numberOfTiles = 20;
  let board = "";
  let score = "";
  let tilesAll = [];
  let tilesClicked = [];
  let tilesImages = [
      "./img/1.jpg",
      "./img/2.jpg",
      "./img/3.jpg",
      "./img/4.jpg",
      "./img/5.jpg",
      "./img/6.jpg",
      "./img/7.jpg",
      "./img/8.jpg",
      "./img/9.jpg",
      "./img/10.jpg",
  ];
  let counter = 0;
  let clickable = true ;

  function resetData() {
      board = document.querySelector(".board");
      board.innerHTML = "";

      score = document.querySelector(".score");
      score.innerHTML = "";

      tilesAll = [];
      tilesClicked = [];
      counter = 0;
      clickable = true;
      score.innerHTML = "Liczba prób:"
  }

  function createBoard() {
      for (let i = 0; i < numberOfTiles; i++) {
          tilesAll.push(Math.floor(i / 2));
      }

      for (let i = 0; i<numberOfTiles; i++) {
          const random = Math.floor(Math.random()*i);
          const temp = tilesAll[i];
          tilesAll[i] = tilesAll[random];
          tilesAll[random] = temp;
      }
      for (let i = 0; i <numberOfTiles; i++) {
          const tile = document.createElement("div");
          tile.classList.add("tile");
          board.appendChild(tile);


          tile.dataset.tileType = tilesAll[i];
          tile.dataset.index = i;


          tile.addEventListener('click', clickOnTile = (e) =>{

              if (clickable === true) {

                  if (!tilesClicked[0] || tilesClicked[0].dataset.index !== e.target.dataset.index) {
                      tilesClicked.push(e.target);
                      e.target.style.backgroundImage = 'url(' + tilesImages[e.target.dataset.tileType] + ')';
                      e.target.classList.add("uncover");
                  }
                  if (tilesClicked.length === 2) {
                      if (tilesClicked[0].dataset.tileType === tilesClicked[1].dataset.tileType) {
                          setTimeout(pairDone = () => {
                              tilesClicked[0].classList.add("done");
                              tilesClicked[1].classList.add("done");
                              tilesClicked = [];
                              clickable = true;
                          }, 500)

                      }
                      else {
                          setTimeout(pairWrong = () => {
                              tilesClicked[0].style.backgroundImage = "";
                              tilesClicked[1].style.backgroundImage = "";
                              tilesClicked = [];
                              clickable = true;
                          }, 500)

                      }
                      counter++;
                      score.innerHTML = "Liczba prób: " + counter;
                      clickable = false;
                  }
              }

          });

      }

    }
  resetData();
  createBoard();
  document.querySelector(".start").addEventListener("click",resetData);
  document.querySelector(".start").addEventListener("click",createBoard)


}); 