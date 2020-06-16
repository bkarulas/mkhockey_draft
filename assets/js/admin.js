

getUndraftedPlayers(year);



let lastPick;

function getUndraftedPlayers(year){
    phpurl = geturl+"undrafted&year="+year;
    $.ajax({url: phpurl, method: "GET"})
    .then((response) => {
        getNextPick(year, JSON.parse(response));
    })
}

function getNextPick(year, undraftedPlayers){
    phpurl = geturl+"lastpick&year="+year;
    $.ajax({url: phpurl, method: "GET"})
    .then ((response) => {
        let nextPick = parseInt(JSON.parse(response))+1
        getNextTeam(year, undraftedPlayers, nextPick)
    })
}

function getNextTeam(year, undraftedPlayers, nextPick){
    phpurl = geturl+"teamsinfo&year="+year;
    $.ajax({url: phpurl, method: "GET"})
    .then((response) => {
        nextTeam = findNextTeam(JSON.parse(response),nextPick);
        draftMenu(year, undraftedPlayers, nextPick, nextTeam)
    })
}

function findNextTeam(teams, pick){
    switch (pick){
        case 1: case 8: case 9: case 16: case 17: case 24: case 25: case 32: case 33: case 40: case 41:
            return teams[0].id;
            break;
        case 2: case 7: case 10: case 15: case 18: case 23: case 26: case 31: case 34: case 39: case 42:
            return teams[1].id;
            break;
        case 3: case 6: case 11: case 14: case 19: case 22: case 27: case 30: case 35: case 38: case 43:
            return teams[2].id;
            break;
        case 4: case 5: case 12: case 13: case 20: case 21: case 28: case 29: case 36: case 37: case 44:
            return teams[3].id;
            break;
        default:
            return "ERROR";
    }
}




//DRAFT A PLAYER  type="button" class="btn btn-success" value="DRAFT" onclick="draftThisPlayer()"
//draft menue
function draftMenu(year, undraftedPlayers, nextPick, nextTeam){

    const dropdownSelection = document.getElementById("draft-dropdown");
    $("#draft-button").attr("type","button").attr("class","btn btn-success").attr("value", "DRAFT").attr("onclick",`draftThisPlayer(${nextPick}, ${nextTeam})`);

	for (let i=0; i<undraftedPlayers.length; i++){
		let option = document.createElement("option");
        option.value = undraftedPlayers[i].id;
		option.text = `${undraftedPlayers[i].name}`;
        dropdownSelection.add(option);
    }   
}

function draftThisPlayer(nextPick, nextTeam){
	let draftedPlayer = {
        id : parseInt(document.getElementById("draft-dropdown").value),
        pick :nextPick,
        team :nextTeam
    }
    phpurl = `${posturl}draftplayer&year=${year}&pick=${draftedPlayer.pick}&team=${draftedPlayer.team}&id=${draftedPlayer.id}`;
    $.ajax({url: phpurl, method: "POST"})
    .then(()=>{
        window.location.reload();
    })
}



