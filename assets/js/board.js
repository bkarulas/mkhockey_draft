let rounds = 12;
let teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];
let playerPicked = [
    {
        name: 'First Last Name',
        pos: 'Defense',
        pick: 1
    },
    {
        name: 'First Last Name',
        pos: 'Forward',
        pick: 2
    },
    {
        name: 'First Last Name',
        pos: 'Def/For',
        pick: 3
    },
    {
        name: 'First Last Name',
        pos: 'Defense',
        pick: 4
    },
    {
        name: 'First Last Name',
        pos: 'Forward',
        pick: 5
    },
    {
        name: 'First Last Name',
        pos: 'Def/For',
        pick: 6
    },
]
let roundWidth = 10;
let playerWidth = ((100-roundWidth)/teams.length)+'%';
console.log(playerWidth);

createBoard(rounds, teams)
draftedPlayers(playerPicked);


//DRAFT BOARD OUTLINE
function createBoard(rounds, teams){
    //TITLE
    $('#board-title').attr('class','board-row').append($('<div>').width(roundWidth+'%').attr('class','cell-round').text('#')
    .add(teamTitles(teams)));
    //ROUNDS
    for (let r=1; r<=rounds; r++){
        $('#rounds').append($('<div>').attr('class','board-row').attr('id','round'+r)
        .append($('<div>').width(roundWidth+'%').attr('class','cell-round').text(r)
        .add(pickedPlayer(r))));
    }
}

function teamTitles(teams){
    return ($('<div>').width(playerWidth).attr('class','cell-team').text(teams[0])
    .add($('<div>').width(playerWidth).attr('class','cell-team').text(teams[1]))
    .add($('<div>').width(playerWidth).attr('class','cell-team').text(teams[2]))
    .add($('<div>').width(playerWidth).attr('class','cell-team').text(teams[3])))
}

function pickedPlayer(r){
    if (r%2!=0){
        return ($('<div>').width(playerWidth).attr('class','cell-player').attr('id', 'pick'+(r*4-3))
        .add($('<div>').width(playerWidth).attr('class','cell-player').attr('id', 'pick'+(r*4-2)))
        .add($('<div>').width(playerWidth).attr('class','cell-player').attr('id', 'pick'+(r*4-1)))
        .add($('<div>').width(playerWidth).attr('class','cell-player').attr('id', 'pick'+(r*4-0))));
    }else{
        return ($('<div>').width(playerWidth).attr('class','cell-player').attr('id', 'pick'+(r*4-0))
        .add($('<div>').width(playerWidth).attr('class','cell-player').attr('id', 'pick'+(r*4-1)))
        .add($('<div>').width(playerWidth).attr('class','cell-player').attr('id', 'pick'+(r*4-2)))
        .add($('<div>').width(playerWidth).attr('class','cell-player').attr('id', 'pick'+(r*4-3))));
    }
}

function draftedPlayers(pick){
    console.log(pick);
    for (i=0; i<pick.length; i++){
         let p=i+1;
        $('#pick'+p).attr('class',`cell-player ${pick[i].pos.toLowerCase()}`).append($('<div>').attr('class','player-name').text(pick[i].name)
        .add($('<div>').attr('class','player-pos').text(pick[i].pos))
        .add($('<div>').attr('class','player-num').text(pick[i].pick)));
     }
}

