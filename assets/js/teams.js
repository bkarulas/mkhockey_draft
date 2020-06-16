//GET TEAM ROSTER
for (t=1; t<=teams; t++){
    getTeamInfo(year, t)
}
function getTeamInfo(year, t){
    phpurl = geturl+"teamroster&year="+year+"&team="+t;
    $.ajax({url: phpurl, method: "GET"})
    .then((response) => {
        teamBreakDown(JSON.parse(response), t)
    })
}

function teamBreakDown(team, t){
    let defense=[];
    let forward=[];
    team.forEach(player => {
        if (player.pos==2) {
            defense.push(player);
        } else if (player.pos == 3) {
            forward.push(player);
        } else if (player.pos==4){
            defense.length < 4 ? defense.push(player) : forward.push(player);
        }
    });
    //sort each poition by deaft pick
    defense.sort(function(a, b) {return parseFloat(a.picked) - parseFloat(b.picked);});
    forward.sort(function(a, b) {return parseFloat(a.picked) - parseFloat(b.picked);});
    let teamName = team[0].name.split(' ');
    teamName = "Team "+teamName[0];

    printTeamRoster(team[0], teamName, defense, forward, t);
}

function printTeamRoster(goalie, teamName, defense, forward, t){
    $('#team-name'+t).attr('class','teamname').text(teamName);
    $('#goalie'+t).attr('class','team-goalie').append(printGoalie(goalie))
    .add(printTeam(t, defense,'defense', defense.length))
    .add(printTeam(t, forward, 'forward', defense.length))
    //printGoalie(goalie,t)
}

function printGoalie (goalie){
    return ($('<div>').attr('class','roster-pos').text('G').add($('<div>').attr('class','roster-name').text(goalie.name)))
}

function printTeam(t, players, pos, defNum){
    pos == 'defense' ? (defNum < 4 ? posNum = 4-defNum : posNum = 0) : (defNum < 4 ? posNum = rounds-4-players.length : posNum = rounds-defNum-players.length)
    for (let i=0; i<players.length; i++) {
        $('#'+pos+t).append($('<div>').attr('class',"team-"+pos).append($('<div>').attr('class','roster-pos').text(pos.charAt(0).toUpperCase()).add($('<div>').attr('class','roster-name').text(players[i].name))))
    };
    for (let e=0; e<posNum; e++){
        $('#'+pos+t).append($('<div>').attr('class','emptpy-pos').append($('<div>').attr('class','roster-pos').text(pos.charAt(0).toUpperCase()).add($('<div>').attr('class','roster-name').text(' '))))
    }
}