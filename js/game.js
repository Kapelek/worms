//game
 function game_show(){
    $("#menu-screen").css("display","none");
    $("#myCanvas").fadeIn(200);
    $('#left-side').css('display','flex');
    $('#left-side').hide();
    $("#left-side").fadeIn(400);
}

//players names
var p1_name;
var p2_name;
var p3_name;
var p4_name;

function check_players_names(){
    if($("#p1-name").val()==""){
        p1_name="PLAYER1";
    }else{
        p1_name=$("#p1-name").val();
    }

    if($("#p2-name").val()==""){
        p2_name="PLAYER2";
    }else{
        p2_name=$("#p2-name").val();
    }

    if($("#p3-name").val()==""){
        p3_name="PLAYER3";
    }else{
        p3_name=$("#p3-name").val();
    }

    if($("#p4-name").val()==""){
        p4_name="PLAYER4";
    }else{
        p4_name=$("#p4-name").val();
    }
}

//keycode check
$("body").keyup(function(event){
    console.log("event.keyCode="+event.keyCode);
});

$( document ).ready(function() {
    initialize_keyboard();
});

//keycodes-list and initialize the keyboard
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_A = 65;
const KEY_D = 68;
const KEY_B = 66;
const KEY_N = 78;
const KEY_K = 75;
const KEY_L = 76;
const KEY_SPACE = 32;

var kstate = [false,false,false,false,false,false,false,false,false];

function initialize_keyboard(){
    $(document).keydown(function(e){
    //    console.log(e.keyCode);
        if(e.keyCode==KEY_LEFT) {
            kstate[0]=true;
        }
        if(e.keyCode==KEY_RIGHT) {
            kstate[1]=true;
        }
        if(e.keyCode==KEY_A) {
            kstate[2]=true;
        }
        if(e.keyCode==KEY_D) {
            kstate[3]=true;
        }
        if(e.keyCode==KEY_B) {
            kstate[4]=true;
        }
        if(e.keyCode==KEY_N) {
            kstate[5]=true;
        }
        if(e.keyCode==KEY_K) {
            kstate[6]=true;
        }
        if(e.keyCode==KEY_L) {
            kstate[7]=true;
        }
    });

    $(document).keyup(function(e){
        if(e.keyCode==KEY_LEFT) {
            kstate[0]=false;
        }
        if(e.keyCode==KEY_RIGHT) {
            kstate[1]=false;
        }
        if(e.keyCode==KEY_A) {
            kstate[2]=false;
        }
        if(e.keyCode==KEY_D) {
            kstate[3]=false;
        }
        if(e.keyCode==KEY_B) {
            kstate[4]=false;
        }
        if(e.keyCode==KEY_N) {
            kstate[5]=false;
        }
        if(e.keyCode==KEY_K) {
            kstate[6]=false;
        }
        if(e.keyCode==KEY_L) {
            kstate[7]=false;
        }

        if(e.keyCode==KEY_SPACE && (p2_game_state || p3_game_state || p4_game_state || pause_state)){
            if(kstate[8]){
                kstate[8]=false;
            }else{
                kstate[8]=true;
            }
        }
    });
}

var score_goal;

function score_goal_set(){
    score_goal=Math.floor(Math.abs($('#max-rounds').val()));
    if(score_goal==""){
        if(players_amount==2){
            score_goal=20;
        }
        else if(players_amount==3){
            score_goal=33;
        }else{
            score_goal=50; 
        }
    }
    $("#points-goal").text(score_goal);
}

const player_velocity = 1.4;

function start_game(){
    // console.log("GAME-START");
    //display score goal
    score_goal_set();
    //create canvas
    create_canvas();
    //game show and left bar
    game_show();
    //players create
    check_players_names();
    if(players_amount==2){
        create_p1();
        create_p2();
        table();
        player_show_dot(p1);
        player_show_dot(p2);
        kstate[8]=false;
        setTimeout(start_check_pause_interval,2000);
        setTimeout(start_two_players_game_interval,2000);
    }
    if(players_amount==3){
        create_p1();
        create_p2();
        create_p3();
        table();
        player_show_dot(p1);
        player_show_dot(p2);
        player_show_dot(p3);
        kstate[8]=false;
        setTimeout(start_check_pause_interval,2000);
        setTimeout(start_three_players_game_interval,2000);
    }
    
    if(players_amount==4){
        create_p1();
        create_p2();
        create_p3();
        create_p4();
        table();
        player_show_dot(p1);
        player_show_dot(p2);
        player_show_dot(p3);
        player_show_dot(p4);
        kstate[8]=false;
        setTimeout(start_check_pause_interval,2000);
        setTimeout(start_four_players_game_interval,2000);
    }
    
    //leaderboard create
    leaderboard_create();
}

//game-state
  var p2_game_state=false;
  var p3_game_state=false;
  var p4_game_state=false;
  var pause_state = false;


//create canvas
var cw;
var ch;
var ctx;

function create_canvas(){
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d",{willReadFrequently: true});
    cw = canvas.width;
    ch = canvas.height;
}


function leaderboard_create_sub(p){
    if(p==p1){
       x=1; 
    }
    if(p==p2){
        x=2; 
    }
    if(p==p3){
        x=3; 
    }
    if(p==p4){
        x=4; 
    }
    $("#leaderboard-line-"+x).addClass("leaderboard-line_show");
    $("#leaderboard-line-"+x).css("border-bottom","2px solid "+p.color);
    $("#leaderboard-"+x).css("color",p.color);
    $("#leaderboard-"+x).text(p.name);
}

function leaderboard_create(){
    //delete existing
    for(var i=1;i<=4;i++){
        $(".leaderboard-line").removeClass("leaderboard-line_show");
    }
    if(players_amount==2){
        leaderboard_create_sub(p1);
        leaderboard_create_sub(p2);
    }
    if(players_amount==3){
        leaderboard_create_sub(p1);
        leaderboard_create_sub(p2);
        leaderboard_create_sub(p3);
    }
    if(players_amount==4){
        leaderboard_create_sub(p1);
        leaderboard_create_sub(p2);
        leaderboard_create_sub(p3);
        leaderboard_create_sub(p4);
    }
    $(".scores").text("0");
}


//create players

class player{
    //stats
    score = 0;
    alive = true;
    //game
    cancollide=true;
    size = 3;
    x=0;
    y=0;
    prev_x;
    prev_y;
    velocityX;
    velocityY;
    velocity = player_velocity;
    constructor(name,color) {
        this.name = name;
        this.color = color;
    }
}

var p1 = new player(null,null);
var p2 = new player(null,null);
var p3 = new player(null,null);
var p4 = new player(null,null);


function points_distance(x1,y1,x2,y2){
    var diff1=x2-x1;
    var diff2=y2-y1;
    var pow = Math.pow(diff1,2)+Math.pow(diff2,2);
    var d=Math.sqrt(pow);
    return d;
}
const min_distance=200;

function random_xy(){
    var r=Math.floor(Math.random() * (520-80)) + 81;
    return r;
}

const rand_vel_pos_or_neg=[-1,1];
function random_velocities(p){
    p.velocityX= (Math.random() * (2*player_velocity)) -player_velocity;
    p.velocityY= velocityY_calc(p);
    p.velocityX=p.velocityX*rand_vel_pos_or_neg[Math.floor(Math.random() * player_velocity) + 0];
    p.velocityY=p.velocityY*rand_vel_pos_or_neg[Math.floor(Math.random() * player_velocity) + 0];
}

function reset_player(p){
    p.score=0;
    alive=true;
    cancollide=true;
    size=5;
    p.prev_x=p.x;
    p.prev_y=p.y;
    random_velocities(p);
}
function create_p1(){
    p1.color=p1_color;
    p1.name=p1_name;
    p1.x=random_xy();
    p1.y=random_xy();
    reset_player(p1);
}
function create_p2(){
    p2.color=p2_color;
    p2.name=p2_name;
    random_xy_p2();
    reset_player(p2);
}
function random_xy_p2(){
    p2.x=random_xy();
    p2.y=random_xy();
    while(p2.x==0 && p2.y==0 || points_distance(p1.x,p1.y,p2.x,p2.y)<=min_distance && points_distance(p1.x,p1.y,p2.x,p2.y)>=-min_distance){
        p2.x=random_xy();
        p2.y=random_xy();
    }
}
function create_p3(){
    p3.color=p3_color;
    p3.name=p3_name;
    random_xy_p3();
    reset_player(p3);
}
function random_xy_p3(){
    p3.x=random_xy();
    p3.y=random_xy();
    while(p3.x==0 && p3.y==0 || points_distance(p1.x,p1.y,p3.x,p3.y)<=min_distance && points_distance(p1.x,p1.y,p3.x,p3.y)>=-min_distance || points_distance(p2.x,p2.y,p3.x,p3.y)<=min_distance && points_distance(p2.x,p2.y,p3.x,p3.y)>=-min_distance){
        p3.x=random_xy();
        p3.y=random_xy();
    }
}
function create_p4(){
    p4.color=p4_color;
    p4.name=p4_name;
    random_xy_p4();
    reset_player(p4);
}
function random_xy_p4(){
    p4.x=random_xy();
    p4.y=random_xy();
    while(p4.x==0 && p4.y==0 || points_distance(p1.x,p1.y,p4.x,p4.y)<=min_distance && points_distance(p1.x,p1.y,p4.x,p4.y)>=-min_distance || points_distance(p2.x,p2.y,p4.x,p4.y)<=min_distance && points_distance(p2.x,p2.y,p4.x,p4.y)>=-min_distance || points_distance(p3.x,p3.y,p4.x,p4.y)<=min_distance && points_distance(p3.x,p3.y,p4.x,p4.y)>=-min_distance){
        p4.x=random_xy();
        p4.y=random_xy();
    }
}
function table() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cw, ch);
}

//turning

function velocityY_calc(p){
    return Math.sqrt(Math.pow(p.velocity,2)-Math.pow(p.velocityX,2));
}

var angle=4;

function degreesToRadians(angle){
    return angle*Math.PI/180;
}

var radians = degreesToRadians(angle);

function player_turn_left(p){
    // console.log(p.name+" turned left");
    p.velocityX=p.velocityX * Math.cos(-radians) - p.velocityY*Math.sin(-radians);
    p.velocityY=p.velocityX * Math.sin(-radians) + p.velocityY*Math.cos(-radians);

    const velocity = Math.sqrt(Math.pow(p.velocityX, 2) + Math.pow(p.velocityY, 2));
    p.velocityX = p.velocityX / velocity * p.velocity;
    p.velocityY = p.velocityY / velocity * p.velocity; 
}

function player_turn_right(p){
    // console.log(p.name+" turned right");
    p.velocityX=p.velocityX * Math.cos(radians) - p.velocityY*Math.sin(radians);
    p.velocityY=p.velocityX * Math.sin(radians) + p.velocityY*Math.cos(radians);

    const velocity = Math.sqrt(Math.pow(p.velocityX, 2) + Math.pow(p.velocityY, 2));
    p.velocityX = p.velocityX / velocity * p.velocity;
    p.velocityY = p.velocityY / velocity * p.velocity;  
}

//add scores to leaderboard
function addscores(p){
    if(p.name==p1.name){
        if(players_amount==2){
            if(p2.alive==true){
                p2.score++;
            }
        }
        if(players_amount==3){
            if(p2.alive==true){
                p2.score++;
            }
            if(p3.alive==true){
                p3.score++;
            }
        }
        if(players_amount==4){
            if(p2.alive==true){
                p2.score++;
            }
            if(p3.alive==true){
                p3.score++;
            }
            if(p4.alive==true){
                p4.score++;
            }
        }
    }
    else if(p.name==p2.name){
        if(players_amount==2){
            if(p1.alive==true){
                p1.score++;
            }
        }
        if(players_amount==3){
            if(p1.alive==true){
                p1.score++;
            }
            if(p3.alive==true){
                p3.score++;
            }
        }
        if(players_amount==4){
            if(p1.alive==true){
                p1.score++;
            }
            if(p3.alive==true){
                p3.score++;
            }
            if(p4.alive==true){
                p4.score++;
            }
        }
    }
    else if(p.name==p3.name){
        if(players_amount==3){
            if(p1.alive==true){
                p1.score++;
            }
            if(p2.alive==true){
                p2.score++;
            }
        }
        if(players_amount==4){
            if(p1.alive==true){
                p1.score++;
            }
            if(p2.alive==true){
                p2.score++;
            }
            if(p4.alive==true){
                p4.score++;
            }
        }
    }
    else if(p.name==p4.name){
        if(players_amount==4){
            if(p1.alive==true){
                p1.score++;
            }
            if(p2.alive==true){
                p2.score++;
            }
            if(p3.alive==true){
                p3.score++;
            }
        }
    }
    order_leaderboard();
}

function bubbleSort(scoreboard){
    for(var i = 0; i < scoreboard.length; i++){
        for(var j = 0; j < ( scoreboard.length - i -1 ); j++){
            if(scoreboard[j].score < scoreboard[j+1].score){
                var temp = scoreboard[j];
                scoreboard[j] = scoreboard[j + 1];
                scoreboard[j+1] = temp;
            }
        }
    }
    return scoreboard;
}

var first;
var second;
var third;
var fourth;

function order_leaderboard(){
    if(players_amount==2){
        var scoreboard = [p1,p2];
        scoreboard = bubbleSort(scoreboard);
        first_place(scoreboard[0]);
        first=scoreboard[0];
        second_place(scoreboard[1]);
        second=scoreboard[1];

        end_check();
    }
    if(players_amount==3){
        var scoreboard = [p1,p2,p3];
        scoreboard = bubbleSort(scoreboard);
        first_place(scoreboard[0]);
        first=scoreboard[0];
        second_place(scoreboard[1]);
        second=scoreboard[1];
        third_place(scoreboard[2]);
        third=scoreboard[2];

        end_check();
      
    }
    if(players_amount==4){
        var scoreboard = [p1,p2,p3,p4];
        scoreboard = bubbleSort(scoreboard);
        first_place(scoreboard[0]);
        first=scoreboard[0];
        second_place(scoreboard[1]);
        second=scoreboard[1];
        third_place(scoreboard[2]);
        third=scoreboard[2];
        fourth_place(scoreboard[3]);
        fourth=scoreboard[3];

        end_check();
    }
}

function first_place(p){
    $("#leaderboard-line-1").css("border-bottom","2px solid "+p.color);
    $("#leaderboard-1").css("color",p.color);
    $("#leaderboard-1").text(p.name);
    $("#score-1").text(p.score);
}

function second_place(p){
    $("#leaderboard-line-2").css("border-bottom","2px solid "+p.color);
    $("#leaderboard-2").css("color",p.color);
    $("#leaderboard-2").text(p.name);
    $("#score-2").text(p.score);
}

function third_place(p){
    $("#leaderboard-line-3").css("border-bottom","2px solid "+p.color);
    $("#leaderboard-3").css("color",p.color);
    $("#leaderboard-3").text(p.name);
    $("#score-3").text(p.score);
}

function fourth_place(p){
    $("#leaderboard-line-4").css("border-bottom","2px solid "+p.color);
    $("#leaderboard-4").css("color",p.color);
    $("#leaderboard-4").text(p.name);
    $("#score-4").text(p.score);
}

//collision with border
function collision_border_check(p){
    var r = p.size+0.5;
    var  m = r/p.velocity;
    var col_x=p.x+p.velocityX*m;
    var col_y=p.y+p.velocityY*m;
     //border
     if(col_x<=0 || col_x>=600 || col_y<=0 || col_y>=600){
        p.alive=false;
        addscores(p);
    }
}

//collision with color
const colors_rgb = [0,0,255,128,0,128,255,0,0,0,128,0,255,255,0,255,165,0,255,105,180,0,255,255,255,250,205,128,128,128];
const colors_count = 10;

function collision_color_check(p){
    var r = p.size+0.5;
    var  m = r/p.velocity;
    var col_x=p.x+p.velocityX*m;
    var col_y=p.y+p.velocityY*m;
    // console.log(p.name,col_x,col_y,p.x,p.y,p.velocityX,p.velocityY);
    //color
    var n = ctx.getImageData(col_x,col_y,1,1).data;
    // console.log(n);
    for(var i=0;i<colors_count*3;i+=3){
        if(n[0]==colors_rgb[i] && n[1]==colors_rgb[i+1] && n[2]==colors_rgb[i+2]){
            p.alive=false;
            addscores(p);
        }
    }
}

//making holes

function rand_make_space(){
    return Math.floor(Math.random() * (1000 - 1) + 1);
}

function make_space(p){
    p.cancollide=false;
    setTimeout(make_space_stop,200,p);
}

function make_space_stop(p){
    p.cancollide=true;
}

//player-update
function player_update(p,l,r){

    if(p.cancollide==true && p.alive==true){
        collision_color_check(p);
    }
    if(p.alive==true){
        collision_border_check(p);
    }
    if(p.alive==true){
        if(kstate[l]){
            player_turn_left(p);
        }
        if(kstate[r]){
            player_turn_right(p);
        }

        p.prev_x=p.x;
        p.prev_y=p.y;

        p.x += p.velocityX;
        p.y += p.velocityY;

        if(p.cancollide==true && p.alive==true){
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.fill();

            if(rand_make_space()<=5){
                make_space(p);
            }
        }else{
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(p.prev_x, p.prev_y, p.size, 0, 2 * Math.PI);
            ctx.fillStyle = "black";
            ctx.fill();
        }
    }
}

//players-dots-show
function player_show_dot(p){
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.alive=true;
}

//two-players-game
var two_players_game_interval;

function start_two_players_game_interval(){
    p2_game_state=true;
    two_players_game_interval = setInterval(two_players_game,games_interval);
    pause_state=false;
    $("#pause-screen").removeClass("show_flex");
}

function stop_two_players_game_interval(){
    p2_game_state=false;
    clearInterval(two_players_game_interval);
}

function two_players_game(){
    player_update(p1,0,1);
    player_update(p2,2,3);
}

//three players-game
var three_players_game_interval;

function start_three_players_game_interval(){
    p3_game_state=true;
    three_players_game_interval = setInterval(three_players_game,games_interval);
    pause_state=false;
    $("#pause-screen").removeClass("show_flex");
}

function stop_three_players_game_interval(){
    p3_game_state=false;
    clearInterval(three_players_game_interval);
}

function three_players_game(){
    player_update(p1,0,1);
    player_update(p2,2,3);
    player_update(p3,4,5);
}

//four players-game
var four_players_game_interval;

function start_four_players_game_interval(){
    four_players_game_interval = setInterval(four_players_game,games_interval);
    p4_game_state=true;
    pause_state=false;
    $("#pause-screen").removeClass("show_flex");
}

function stop_four_players_game_interval(){
    clearInterval(four_players_game_interval);
    p4_game_state=false;
}

function four_players_game(){
    player_update(p1,0,1);
    player_update(p2,2,3);
    player_update(p3,4,5);
    player_update(p4,6,7);
}

//pause
var check_pause_interval;
function start_check_pause_interval(){
    check_pause_interval=setInterval(check_pause,games_interval);
}
function stop_check_pause_interval(){
    clearInterval(check_pause_interval);
    pause_state=false;
}
function check_pause(){
    // console.log("check_pause()");
    if((p2_game_state || p3_game_state || p4_game_state) && kstate[8] && !pause_state){
        console.log("game-paused");
        stop_two_players_game_interval();
        stop_three_players_game_interval();
        stop_four_players_game_interval();
        pause_state=true;
        $("#pause-screen").addClass("show_flex");
    }
    else if(!kstate[8] && pause_state){
        console.log("game-resumed");
        if(players_amount==2){
            start_two_players_game_interval();
        }
        else if(players_amount==3){
            start_three_players_game_interval();
        }else{
            start_four_players_game_interval();
        }
    }
}


var alive_arr = [];

function end_check(){

    if(players_amount==2){
        alive_arr = [p1.alive,p2.alive]; 
        if(alive_arr.filter(x => x==true).length==1){
            stop_two_players_game_interval();
            stop_check_pause_interval();
            end_check_sub();
        }
    }
    if(players_amount==3){
        alive_arr = [p1.alive,p2.alive,p3.alive];
        if(alive_arr.filter(x => x==true).length==1){
            stop_three_players_game_interval();
            stop_check_pause_interval();
            end_check_sub();
        }
    }
    if(players_amount==4){
        alive_arr = [p1.alive,p2.alive,p3.alive,p4.alive];
        if(alive_arr.filter(x => x==true).length==1){
            stop_four_players_game_interval();
            stop_check_pause_interval();
            end_check_sub();
        }   
    }
}

function end_check_sub(){
    if(first.score>=score_goal && first.score-second.score>=2){
        end_game();
    }else{
        setTimeout(next_round,2000);
    }
}

function end_game(){
    // console.log("end of the game");
    $("#end-screen").addClass("show_flex");
    $("#end-screen").hide();
    $("#end-screen").fadeIn(1500);
    $("#winner").css("color",first.color);
    $("#winner").text(first.name);

}

function next_round(){
    if(players_amount==2){
        p1.x=random_xy();
        p1.y=random_xy();
        random_velocities(p1);

        random_xy_p2();
        random_velocities(p2);

        table();
        player_show_dot(p1);
        player_show_dot(p2);

        setTimeout(start_check_pause_interval,2000);
        setTimeout(start_two_players_game_interval,2000);
    }
    if(players_amount==3){
    
        p1.x=random_xy();
        p1.y=random_xy();
        random_velocities(p1);

        random_xy_p2();
        random_velocities(p2);

        random_xy_p3()
        random_velocities(p3);

        table();
        player_show_dot(p1);
        player_show_dot(p2);
        player_show_dot(p3);

        setTimeout(start_check_pause_interval,2000);
        setTimeout(start_three_players_game_interval,2000);
    }

    if(players_amount==4){
        p1.x=random_xy();
        p1.y=random_xy();
        random_velocities(p1);
        
        random_xy_p2();
        random_velocities(p2);

        random_xy_p3();
        random_velocities(p3);

        random_xy_p4();
        random_velocities(p4);

        table();
        player_show_dot(p1);
        player_show_dot(p2);
        player_show_dot(p3);
        player_show_dot(p4);
        setTimeout(start_check_pause_interval,2000);
        setTimeout(start_four_players_game_interval,2000);
    }
}

function play_again(){
    $('#myCanvas').css('display','none');
    stop_check_pause_interval();
    $('#pause-screen').removeClass("show_flex");
    $('#end-screen').removeClass("show_flex");
    $('#left-side').css("display","none");
    $('#menu-screen').css('display','flex');
    $('#menu-screen').hide();
    $('#menu-screen').fadeIn(500);
}

const games_interval=17;