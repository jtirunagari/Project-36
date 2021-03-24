var dog
var dogImage
var happyDog
var database
var foodS
var foodStock

function preload()
{
  dogImage=loadImage("images/dogImg.png")
	happyDog=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(800, 800);
  database=firebase.database()
  dog=createSprite(400,400,20,20)
  dog.addImage(dogImage)
  dog.scale=0.2
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  feed=createButton("Feed the dog");
  feed.position(700,95)
  feed.mousePressed(feedDog)
}


function draw() {  
background("green")

if(keyWentDown(UP_ARROW)){
  writeStock(foodS)
  dog.addImage(happyDog)
}
  drawSprites();
  textSize(25)
  fill("black")
  text("food left:",170,80)
  text("Click on the up arrow to feed the Dog!",170,120)

  fill(255,255,254),
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastfed%12 + "PM", 350,30)
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30)
  }
}
function writeStock(petFood){
  if(petFood<=0){
    petFood=0
  }
  else{
    petFood=petFood-1
  }
  database.ref('/').update({
    food:petFood
  })
}
function readStock(data){
  foodS=data.val();
}
function feedDog(){
  dog.addImage(happyDog)
  foodS.updatefoodStock(foodS.getfoodStock()-1)
  database.ref('/').update({
    Food:foodS.getfoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


