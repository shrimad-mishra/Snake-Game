let input_axis = {x: 0, y: 0}; 
let hightest_score_box = document.getElementById("highest_score_box");
const food_sound = new Audio('music/food.mp3');
const game_over_sound = new Audio('music/gameover.mp3');
const move_sound = new Audio('music/move.mp3');
const background_sound = new Audio('music/music.mp3');
let snake_speed = 12;
let score = 0;
let last_paint_time = 0;
let snake_array = [
    {x: 13, y: 15}
];

let food = {x: 6, y: 7};

function main(current_time) {
    window.requestAnimationFrame(main);
    
    if((current_time - last_paint_time)/1000 < 1/snake_speed){
        return;
    }

    last_paint_time = current_time;
    main_game_engine();
}

function is_collided(snake) {

    for (let i = 1; i < snake_array.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function main_game_engine(){

    if(is_collided(snake_array)){
        game_over_sound.play();
        background_sound.pause();
        input_axis =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snake_array = [{x: 13, y: 15}];
        background_sound.play();
        score = 0; 
    }

    if(snake_array[0].y === food.y && snake_array[0].x ===food.x){
        food_sound.play();
        score += 1;
        if(score>hightest_score){
            hightest_score = score;
            localStorage.setItem("hightest_score", JSON.stringify(hightest_score));
            hightest_score_box.innerHTML = "Hightest Score: " + hightest_score;
        }
        score_box.innerHTML = "Score: " + score;
        snake_array.unshift({x: snake_array[0].x + input_axis.x, y: snake_array[0].y + input_axis.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for (let i = snake_array.length - 2; i>=0; i--) { 
        snake_array[i+1] = {...snake_array[i]};
    }

    snake_array[0].x += input_axis.x;
    snake_array[0].y += input_axis.y;

    board.innerHTML = "";
    snake_array.forEach((e, index)=>{
        snake_element = document.createElement('div');
        snake_element.style.gridRowStart = e.y;
        snake_element.style.gridColumnStart = e.x;

        if(index === 0){
            snake_element.classList.add('head');
        }
        else{
            snake_element.classList.add('snake');
        }
        board.appendChild(snake_element);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

background_sound.play();

let hightest_score = localStorage.getItem("hightest_score");

if(hightest_score === null){
    hightest_score = 0;
    localStorage.setItem("hightest_score", JSON.stringify(hightest_score))
} else{
    hightest_score = JSON.parse(hightest_score);
    hightest_score_box.innerHTML = "hightest_score: " + hightest_score;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    input_axis = {x: 0, y: 1}
    move_sound.play();
    switch (e.key) {
        case "ArrowUp":
            input_axis.x = 0;
            input_axis.y = -1;
            break;

        case "ArrowDown":
            input_axis.x = 0;
            input_axis.y = 1;
            break;

        case "ArrowLeft":
            input_axis.x = -1;
            input_axis.y = 0;
            break;

        case "ArrowRight":
            input_axis.x = 1;
            input_axis.y = 0;
            break;
        default:
            break;
    }

});