getUndraftedPlayers(year);

function getUndraftedPlayers(year){
    phpurl = geturl+"undrafted&year="+year;
    $.ajax({url: phpurl, method: "GET"})
    .then((response) => {
        printUndrafted(JSON.parse(response));
    })
}

function printUndrafted(players){
    players.forEach(player => {
        $('#undraft'+player.pos).append($('<div>').attr('class','undraftedplayer').attr('data',player.id).text(player.name));
    });
}