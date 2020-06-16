getBoardBarInfo(19);

function getBoardBarInfo(year){
    phpurl = geturl+"teamsinfo&year="+year;
    $.ajax({url: phpurl, method: "GET"})
    .then((response) => {
        createBar(JSON.parse(response));
    })
}

function createBar(captians){
    phpurl = geturl+"lastdrafted&year="+year;
    $.ajax({url: phpurl, method: "GET"})
    .then((response) => {
        printBar(JSON.parse(response), captians);
    })
}

function printBar(lastPicked, captians){
    let maxPick = rounds * teams
    console.log(maxPick);
    if (parseInt(lastPicked[0].picked) > 0){
        $('#past-pick').html(`<b>${lastPicked[0].team}</b> - ${lastPicked[0].name} <span class='picknum'>(${lastPicked[0].picked})</span>`)
    }else{
        $('#past-pick').html("----------");
    }
    $('#current-pick').html(`<b>${findTeamName(parseInt(lastPicked[0].picked)+1, captians)}</b> <span class='picknum'>(${parseInt(lastPicked[0].picked)+1})</span>`);
    if (parseInt(lastPicked[0].picked)+2 <= maxPick){
        $('#next-pick').html(`<b>${findTeamName(parseInt(lastPicked[0].picked)+2, captians)}</b> <span class='picknum'>(${parseInt(lastPicked[0].picked)+2})</span>`);
    }else{
        $('#next-pick').html("End of Draft");
    }
}

function findTeamName (pick, captians){
    console.log('Next Pick'+pick);
    console.log(captians);

    switch (pick){
        case 1: case 8: case 9: case 16: case 17: case 24: case 25: case 32: case 33: case 40: case 41:
            return captians[0].name;
            break;
        case 2: case 7: case 10: case 15: case 18: case 23: case 26: case 31: case 34: case 39: case 42:
            return captians[1].name;
            break;
        case 3: case 6: case 11: case 14: case 19: case 22: case 27: case 30: case 35: case 38: case 43:
            return captians[2].name;
            break;
        case 4: case 5: case 12: case 13: case 20: case 21: case 28: case 29: case 36: case 37: case 44:
            return captians[3].name;
            break;
        default:
            return "ERROR";
    }
}

