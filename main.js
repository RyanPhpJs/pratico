

class Container {
  constructor(selector) {
    this.el = document.querySelector(selector);
  }

  createRound() {
    const roundGroup = document.createElement("div");
    roundGroup.className = "round_group";
    this.el.appendChild(roundGroup);
    return new Round(roundGroup);
  }
  
  createTitle(){
    return this.createRound().createTitle();
  }
}

class Round {
  constructor(parentEl) {
    this.parent = parentEl;
    this.invert = false;
  }
  
  createTitle(){
    const title = document.createElement("div");
    title.innerHTML = "<h1>Xadrez Prático 3</h1>"
    title.className = "title";
    this.parent.appendChild(title)
  }

  addGame(player1, player2, winnerIndex = 1) {
    const group = document.createElement("div");
    group.className = "square_group";

    const createPlayer = (player, isWinner) => {
      const square = document.createElement("div");
      square.className = "square";
      if (isWinner) square.classList.add("winner");

      const span = document.createElement("span");
      const name = document.createElement("p");
      name.textContent = player.name;
      const rating = document.createElement("p");
      rating.textContent = "♟️" + player.rating;
      span.appendChild(name);
      span.appendChild(rating);

      const img = document.createElement("img");
      img.src = player.image || "";

      square.appendChild(span);
      square.appendChild(img);
      return square;
    };

    group.appendChild(createPlayer(player1, winnerIndex === 0));
    
    const lig1 = document.createElement("div");
    lig1.className = "ligation " + (winnerIndex === 0 ? "winner": "");
    group.appendChild(lig1);

    const lig2 = document.createElement("div");
    lig2.className = "ligation " + (winnerIndex === 1 ? "winner": "");
    group.appendChild(lig2);
    
    const lig3 = document.createElement("div");
    lig3.className = "ligation connector " + (winnerIndex >= 0 && winnerIndex <= 1 ? "winner": "") + (this.invert ? " invert" : "");
    group.appendChild(lig3);
    this.invert = !this.invert;
    

    const ligNext = document.createElement("div");
    ligNext.className = "ligation next " + (winnerIndex > -1 && winnerIndex < 3 ? "winner" : "");
    group.appendChild(ligNext);

    group.appendChild(createPlayer(player2, winnerIndex === 1));
    
    this.parent.appendChild(group);
  }
}
async function load() {
// Exemplo de uso
const container = new Container("#content");

const Player = (a,b,c) => ({
  name: a, rating: b, image: c
});
const Uknown = Player("A definir", "?", "/images/avatar.png")


const Players = {
  pananu: Player("Pananu", 2253, "https://images.chesscomfiles.com/uploads/v1/user/64579422.55e80822.50x50o.12befe128f3f@2x.jpg"),
  aikoh: Player("Aiikoh", 2347, "https://images.chesscomfiles.com/uploads/v1/user/75348440.538eb94c.50x50o.fdf4255de75a@2x.png"),
  flex: Player("FlexPrime", 2066, "https://images.chesscomfiles.com/uploads/v1/user/145025217.87f48625.160x160o.49c595a299e0@2x.jpg"),
  vigg: Player("Vigg-Sama", 2308, "https://images.chesscomfiles.com/uploads/v1/user/37041584.f3cea36f.160x160o.e5e7ef619d74@2x.png"),
  danilo: Player("DaniloH4", 1902, "https://images.chesscomfiles.com/uploads/v1/user/140829961.edf14fca.160x160o.91323431a23f@2x.jpg"),
  augusto: Player("August0Lisboa", 2206, "https://images.chesscomfiles.com/uploads/v1/user/222799889.79948331.160x160o.d5b1bd21e2a6@2x.jpg"),
  mairos: Player("Mairos", 1185, "https://cdn.discordapp.com/avatars/1141090881743618098/72cc8f8a1d012e6c6fe97a98a636d980.png?size=4096&ignore=true"),
  silver: Player("Silver", 2317, "https://images.chesscomfiles.com/uploads/v1/user/129116046.4d9106ac.160x160o.2e8295879585@2x.gif"),
  heey: Player("Heey", 2031, "https://images.chesscomfiles.com/uploads/v1/user/186088979.6dd99439.160x160o.9470fca1e58c@2x.png"),
  tuguta: Player("Tuguta", 2015, "https://images.chesscomfiles.com/uploads/v1/user/415307575.dde4e70c.160x160o.a6a711fd437b@2x.jpg"),
  star: Player("Star", 2113, "https://images.chesscomfiles.com/uploads/v1/user/187936543.c234d0e2.160x160o.80fa8712dd4d@2x.png"),
  sszss8: Player("Sszss8", 1936, "https://images.chesscomfiles.com/uploads/v1/user/184512597.1031db5d.160x160o.7b5b1ca171e5@2x.jpg"),
  koren: Player("Vitorkoren", 2328, "https://images.chesscomfiles.com/uploads/v1/user/107177642.3369d8e1.160x160o.a476b7e21a12@2x.jpg"),
  tarrash: Player("SiegbertTarrasch19", 2247, "https://images.chesscomfiles.com/uploads/v1/user/137119366.7e208bee.160x160o.748afbffa0e0@2x.jpeg"),
  zeck: Player("ZeckQI", 2123, "https://images.chesscomfiles.com/uploads/v1/user/288474861.f4ddaf70.160x160o.ed1d90567652@2x.jpg"),
  dragon: Player("Dragon003", 2273, "https://images.chesscomfiles.com/uploads/v1/user/42509588.a4e44ebe.160x160o.73e2df3f5c41@2x.jpg")
}

const query = new URLSearchParams(location.search);
const fetchRes = await fetch("/results.txt?time=" + Date.now());
const res = (await fetchRes.text()).split(/\r?\n/g).map(e => {
  if(e === "0") return 0;
  if(e === "1") return 1;
  return -1;
})

const games = [[
  [Players.pananu, Players.aikoh],
  [Players.flex, Players.vigg],
  [Players.danilo, Players.augusto],
  [Players.mairos, Players.silver],
  [Players.heey, Players.tuguta],
  [Players.star, Players.sszss8],
  [Players.koren, Players.tarrash],
  [Players.zeck, Players.dragon],
], [
  [null, null],
  [null, null],
  [null, null],
  [null, null]
], [
  [null, null],
  [null, null]
], [
  [null, null]
]]

let gameCount = -1;
let roundIndex = -1;
container.el.innerHTML = "";
for(const round of games){
  roundIndex++;
  let index = -1;
  const gamer = container.createRound()
  for(const game of round){
    gameCount++;
    index++;
    gamer.addGame(
      game[0] || Uknown,
      game[1] || Uknown,
      typeof res[gameCount] !== "undefined" ? res[gameCount] : -1
    );
    if(res[gameCount] === 0 || res[gameCount] === 1) {
      if(round.length > 1)
      games[roundIndex + 1][Math.floor(index/2)][index%2] = game[res[gameCount]]
    }
}
}
  container.createTitle();

}

load()