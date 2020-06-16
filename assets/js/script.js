const geturl = './assets/php/routes/get-routes.php?api=';
const posturl = './assets/php/routes/post-routes.php?api=';

const year = 19;
const rounds = 11;
const teams = 4;
const posType = 3;
const totalPicks = (rounds*teams);

const roundWidth = 10;
const playerWidth = ((100-roundWidth)/teams)+'%';
const undraftWidth = ((100-10)/posType)+'%';

const secHome = document.getElementById("home");
const secDraftBar = document.getElementById("draft-bar");
const secBoard = document.getElementById("the-draft-board");
const secTeams = document.getElementById("team-rosters");
const secUndrafted = document.getElementById("undrafted");
//const secRules = document.getElementById("draft-rules");
const secAdminHome = document.getElementById("admin-home");


 
document.addEventListener('DOMContentLoaded', () => {
    secAdminHome.style.display = 'none';
    secHome.style.display = "block";
    secDraftBar.style.display = "none";
    secBoard.style.display = "none";
    secTeams.style.display = "none";
    secUndrafted.style.display = "none";

});

function menuClick(showSec){
    switch (showSec){
      case 'home':
        secAdminHome.style.display = 'none';
        secHome.style.display = "block";
        secDraftBar.style.display = "none";
        secBoard.style.display = "none";
        secTeams.style.display = "none";
        secUndrafted.style.display = "none";
        break;
      case 'board':
        secAdminHome.style.display = 'none';
        secHome.style.display = "none";
        secDraftBar.style.display = "none";
        secBoard.style.display = "block";
        secTeams.style.display = "none";
        secUndrafted.style.display = "none";
        break;
      case 'roster':
        secAdminHome.style.display = 'none';
        secHome.style.display = "none";
        secDraftBar.style.display = "none";
        secBoard.style.display = "none";
        secTeams.style.display = "flex";
        secUndrafted.style.display = "none";
        break;
      case 'undrafted':
        secAdminHome.style.display = 'none';
        secHome.style.display = "none";
        secDraftBar.style.display = "none";
        secBoard.style.display = "none";
        secTeams.style.display = "none";
        secUndrafted.style.display = "flex";
        break;
      case 'rules':
        secAdminHome.style.display = 'block';
        secHome.style.display = "none";
        secDraftBar.style.display = "none";
        secBoard.style.display = "none";
        secTeams.style.display = "none";
        secUndrafted.style.display = "none";
        break;
    case 'adminhome':
        secAdminHome.style.display = 'block';
        secHome.style.display = "none";
        secDraftBar.style.display = "none";
        secBoard.style.display = "none";
        secTeams.style.display = "none";
        secUndrafted.style.display = "none";
        break;
      default:
        secHome.style.display = "block";
        secDraftBar.style.display = "none";
        secBoard.style.display = "none";
        secTeams.style.display = "none";
        secUndrafted.style.display = "none";
    }  
  }