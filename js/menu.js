function start_screen_close(){
    $('#start-screen').css('display','none');
    $('#players_amount-screen').css('display','flex');
    $('#players_amount-screen').hide();
    $('#players_amount-screen').fadeIn(500);
}

//menu
function max_rounds_set(){
    if(players_amount==2){
        return 20;
    }
    else if(players_amount==3){
        return 33;
    }else{
        return 50;
    }
}

var players_amount;
function players_amount_pick(x){
    start_int_check_colors();
    players_amount=x;
    $('#players_amount-screen').css('display','none');
    $('#menu-screen').css('display','flex');
    $('#menu-screen').hide();
    $('#menu-screen').fadeIn(500);
    $('#max-rounds').val(max_rounds_set());
    for(var i=1;i<=x;i++){
        $("#p"+i+"-line").css("display","flex");
    }
}
    //color pick
var p1_cp=0;
var p1_color=0;
var p2_cp=0;
var p2_color=0;
var p3_cp=0;
var p3_color=0;
var p4_cp=0;
var p4_color=0;

function color_pick(line,cp,color){
    // console.log(line,cp,color);
    var cpf1p= "#"+line+" .color_pick_frame1 p";
    var cpf1= "#"+line+" .color_pick_frame1";
    if(line=="p1-line"){
        if(p1_cp==0){
            p1_cp=cp;
            p1_color=color;
            sub_color_pick(line,cp,color,cpf1p,cpf1);
        }else{
            $("."+p1_cp).removeClass("picked");
            sub_color_pick_add_unique_attributes(p1_cp,p1_color)
            p1_cp=cp;
            p1_color=color;
            sub_color_pick(line,cp,color,cpf1p,cpf1);
        }
    }
    else if(line=="p2-line"){
        if(p2_cp==0){
            p2_cp=cp;
            p2_color=color;
            sub_color_pick(line,cp,color,cpf1p,cpf1);
        }else{
            $("."+p2_cp).removeClass("picked");
            sub_color_pick_add_unique_attributes(p2_cp,p2_color)
            p2_cp=cp;
            p2_color=color;
            sub_color_pick(line,cp,color,cpf1p,cpf1);
        }
    }
    else if(line=="p3-line"){
        if(p3_cp==0){
            p3_cp=cp;
            p3_color=color;
            sub_color_pick(line,cp,color,cpf1p,cpf1);
        }else{
            $("."+p3_cp).removeClass("picked");
            sub_color_pick_add_unique_attributes(p3_cp,p3_color)
            p3_cp=cp;
            p3_color=color;
            sub_color_pick(line,cp,color,cpf1p,cpf1);
        }
    }
    else if(line=="p4-line"){
        if(p4_cp==0){
            p4_cp=cp;
            p4_color=color;
            sub_color_pick(line,cp,color,cpf1p,cpf1);
        }else{
            $("."+p4_cp).removeClass("picked");
            sub_color_pick_add_unique_attributes(p4_cp,p4_color)
            p4_cp=cp;
            p4_color=color;
            sub_color_pick(line,cp,color,cpf1p,cpf1);
        }
    }
}
function sub_color_pick(line,cp,color,cpf1p,cpf1){
    $("#"+line).css("border","2px solid "+color);
    $(cpf1p).css("display","none");
    $(cpf1).css("background-color",color);
    $("."+cp).addClass("picked");
    $(" ."+cp).removeAttr("onclick");
}

function sub_color_pick_add_unique_attributes(p_cp,p_color){
    //atrybuty powinny sie dodac dla kazdej z osobna linii
    $("#p1-line .color_pick_frame2"+" ."+p_cp).attr("onclick","color_pick('p1-line','"+p_cp+"','"+p_color+"')");
    $("#p2-line .color_pick_frame2"+" ."+p_cp).attr("onclick","color_pick('p2-line','"+p_cp+"','"+p_color+"')");
    $("#p3-line .color_pick_frame2"+" ."+p_cp).attr("onclick","color_pick('p3-line','"+p_cp+"','"+p_color+"')");
    $("#p4-line .color_pick_frame2"+" ."+p_cp).attr("onclick","color_pick('p4-line','"+p_cp+"','"+p_color+"')");
}

function check_colors(){
    var count_picked=$(".picked").length/4;
    if(count_picked==players_amount){
        $("#start-game").fadeIn();
        stop_int_check_colors();
    }else{
        $("#start-game").hide();
    }
}

var interval_check_colors;

function start_int_check_colors(){
    interval_check_colors = setInterval(check_colors,100);
}

function stop_int_check_colors(){
    clearInterval(interval_check_colors);
}

function menu_back(){
    $('#menu-screen').css('display','none');
    $('#players_amount-screen').css('display','flex');
    $('#players_amount-screen').hide();
    $('#players_amount-screen').fadeIn(500);
    players_picks_clear();
    stop_int_check_colors();
}

const all_colors = ['blue','purple','red','green','yellow','orange','hotpink','aqua','lemonchiffon','gray'];
function players_picks_clear(){
    $(".picked").removeClass("picked");
    $(".players_name_pick").val("");
    for(var x=1;x<=4;x++){
        p1_cp=0;
        p1_color=0;
        p2_cp=0;
        p2_color=0;
        p3_cp=0;
        p3_color=0;
        p4_cp=0;
        p4_color=0;
        $("#p"+x+"-line").css("display","none");
        $("#p"+x+"-line"+" .color_pick_frame1").css("background-color","transparent")
        $("#p"+x+"-line .color_pick_frame1 p").css("display","block");
        $("#p"+x+"-line").css("border","2px solid transparent");
        for(var y=1;y<=10;y++){
            $("#p"+x+"-line .color_pick_frame2"+" ."+"cp"+y).attr("onclick","color_pick('p"+x+"-line','"+"cp"+y+"','"+all_colors[y-1]+"')");
        }
    }
}
