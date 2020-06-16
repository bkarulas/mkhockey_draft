getBoardInfo(year);
getDraftedPlayers(year);



//DRAFT BOARD OUTLINE
function getBoardInfo(year){
    phpurl = geturl+"teamsinfo&year="+year;
    $.ajax({url: phpurl, method: "GET"})
    .then((response) => {
        createBoard(JSON.parse(response));
    })
}

function createBoard(teams){
    $('#board-title').attr('class','board-row').append($('<div>').width(roundWidth+'%').attr('class','cell-round').text('')
    .add(teamTitles(teams)));
    //ROUNDS
    for (let r=1; r<=rounds; r++){
        $('#board-rounds').append($('<div>').attr('class','board-row').attr('id','round'+r)
        .append($('<div>').width(roundWidth+'%').attr('class','cell-round').text(r)
        .add(pickedPlayer(r))));
    }
}

function teamTitles(teams){
    return ($('<div>').width(playerWidth).attr('class','cell-team').text(teams[0].name)
    .add($('<div>').width(playerWidth).attr('class','cell-team').text(teams[1].name))
    .add($('<div>').width(playerWidth).attr('class','cell-team').text(teams[2].name))
    .add($('<div>').width(playerWidth).attr('class','cell-team').text(teams[3].name)))
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

//THE PLAYERS
function getDraftedPlayers(year){
    phpurl = geturl+"drafted&year="+year;
    $.ajax({url: phpurl, method: "GET"})
    .then((response) => {
        draftedPlayers(JSON.parse(response));
        emptpyBox(JSON.parse(response).length+1);
    })
  };

function draftedPlayers(pick){
    for (i=0; i<pick.length; i++){
        let posClass = pick[i].pos.replace('/','-').toLowerCase();
        let p=i+1;
        $('#pick'+p).attr('class',`cell-player ${posClass}`).attr('data',pick[i].id)
        .append($('<div>').attr('class','player-name').text(pick[i].name)
        .add($('<div>').attr('class','player-pos').text(pick[i].pos))
        .add($('<div>').attr('class','player-num').text(pick[i].picked)));
     }
}

function emptpyBox(left){
    for (let e=left; e<=totalPicks; e++){
        $('#pick'+e).attr('class','cell-player no-pick')
        .append($('<div>').attr('class', 'player-num').text(e));
    }
}

