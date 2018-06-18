(function(){
var images = [];
images[0] = "obelisk.png";
images[1] = "elephants.png";
images[2] = "bridge.png";
images[3] = "dragon.png";
images[4] = "path.png";
images[5] = "monkey.png";
images[6] = "tree.png";
images[7] = "temple.png";
images[8] = "forest.png";

var map = [];
map[0] = "You discover an old stone obelisk.";
map[1] = "While walking you notice some elephants passing you on the side.";
map[2] = "Walking along the river you see brigde shaped by the forest itself.";
map[3] = "Somehow you find a sleeping dragon!";
map[4] = "You are on a misty crossroad. There seems to be a clearance '<strong>North</strong>' from here.";
map[5] = "You meet a lonely lost monkey down the road.";
map[6] = "You stumble over something and find the mythical tree of the forest. You stumbled over it's roots.";
map[7] = "An old temple is in front of you. It looks spooky.";
map[8] = "You find a banana plantation, an abandoned one in fact.";

var blockedPathMessages = [];

blockedPathMessages[0] = "The obelisk's magic power keeps you from going there.";
blockedPathMessages[1] = "You don't want to mess with the elephants. You can't cross their path.";
blockedPathMessages[2] = "You don't want to walk on the river, there is a bridge after all.";
blockedPathMessages[3] = "You can't step over the dragon!";
blockedPathMessages[4] = "";
blockedPathMessages[5] = "The monkey blocks you from going there.";
blockedPathMessages[6] = "The swampy lake looks peaceful. You can't cross it because you can't swim.. too bad.";
blockedPathMessages[7] = "You do not dare trespass on the temple's grounds.";
blockedPathMessages[8] = "The grass only gets taller from here on. You can't go there.";

var helpMessages = []

helpMessages[0] = "There is a path to the 'East' and 'South'.<br/> Strange, looks like something is missing from the obelisk's center.";
helpMessages[1] = "There is a path to the 'East', 'South' and 'West'.<br/> Elephants sure are interesing creatures.";
helpMessages[2] = "There is a path to the 'South' and 'West'.<br/> Sometimes I'm baffled by nature's beauty.";
helpMessages[3] = "There is a path to the 'North', 'East' and 'South'.<br/> Be careful not to wake the dragon.";
helpMessages[4] = "You seem to be only able to follow compass directions.";
helpMessages[5] = "There is a path to the 'North', 'South' and 'West'.<br/> The monkey extends it's arm but what possesion of yours could he make <strong>use</strong> of?";
helpMessages[6] = "There is a path to the 'North' and 'East'.<br/>  You stay a while looking at the fascinating tree. You feel much better.";
helpMessages[7] = "There is a path to the 'North', 'East' and 'West'.<br/> You hear faint music coming from inside.";
helpMessages[8] = "There is a path to the 'North' and 'West'.<br/> This seems to be abandoned for a long time, sad.";



// player vars
var mapLocation = 4;
var playerInput = "";
var gameMessage = "";
var backpack = [

];
var gameWon = false;

//image
var image = document.querySelector("#scene");

// actions that the player can do
var actionsIKnow = ["north","east","south","west","take","use","drop","help"];
var action =  "";

// items the player can interact with
var items = ["banana"];
var itemsIknow = ["banana", "stone", "flute", "sword"];
var itemLocations = [8]
var item = "";

// input/output element
var output = document.querySelector("#output");
output.innerHTML = map[mapLocation];
var input = document.querySelector("#input");

// set button event
var button = document.querySelector("button");
button.addEventListener("click", clickHandler, false);
// set enter key event
window.addEventListener("keydown", keyHandler, false);


// updating player's location
render();

function clickHandler(){
  playGame();
  document.querySelector("#input").value="";
}

function keyHandler(event){
  if(event.keyCode === 13){
    playGame();
    document.querySelector("#input").value="";
  }
}

function playGame(){
  // convert player input to lowercase
  playerInput = input.value.toLowerCase();
  // show events from previous turn
  gameMessage ="";
  action ="";
  item = "";
  console.log("play function.");

  // figure out player action
for(i=0; i< actionsIKnow.length; i++){
  if(playerInput.indexOf(actionsIKnow[i]) !== -1){
    action = actionsIKnow[i];
    console.log("player's action: " + action);
    break;
  }
}
  // figure out the item the plauer wants
for(i=0; i< itemsIknow.length; i++){
  if(playerInput.indexOf(itemsIknow[i]) !== -1){
    item = itemsIknow[i];
    console.log("player's mentioned item: " + item);
  }
}

switch(action){
  case "north":
    if (mapLocation >= 3){
      mapLocation = mapLocation - 3;
    }
    else{
      gameMessage = blockedPathMessages[mapLocation];
    }
    break;

  case "east":
    if (mapLocation % 3 != 2){
    mapLocation = mapLocation + 1;
    }
    else{
      gameMessage = blockedPathMessages[mapLocation];
    }
    break;

  case "south":
    if (mapLocation < 6){
    mapLocation = mapLocation + 3;
    }
    else{
      gameMessage = blockedPathMessages[mapLocation];
    }
    break;

  case "west":
    if (mapLocation  % 3 != 0){
      mapLocation = mapLocation - 1;
    }
    else{
        gameMessage = blockedPathMessages[mapLocation];
    }
  break;

  case "take":
    takeItem();
    break;

  case "drop":
    dropItem();
    break;

  case "use":
    useItem();
    break;

  case "help":
    callForHelp();
    break;

  default:
    gameMessage = "I don't understand that.<br/> Type in <strong>help</strong> for directions.";
    console.log("Unknown command: " + "\"" + playerInput + "\" ");
}

// render game
render();
}

function callForHelp(){
  // check ic backpack is empty
  if(backpack.length !== 0){
    //show impvoed help
    gameMessage = helpMessages[mapLocation] + "<br/><br/> You're carrying a: "+ backpack.join(", ");
  }
  else{
    //show basic help
    gameMessage = helpMessages[mapLocation];
  }

}

function takeItem(){
  // index number of the item in the items array
  var itemIndexNumber = items.indexOf(item);
  console.log("take - Item index number: " + itemIndexNumber);
  // Does the player know about the item yet and is it on this location yet
  // note* make it so that the itemsIknow are pushed in the array once I find them on the ground and that the array is empty on start.
  if(itemIndexNumber !== -1
    && itemLocations[itemIndexNumber] === mapLocation){
    gameMessage = "You take the " + item + ". ";
    // add the item to the player's backpack
    backpack.push(item);
    //remove item from the world
    items.splice(itemIndexNumber, 1);
    itemLocations.splice(itemIndexNumber, 1);

  }
  else{
    gameMessage = "You can't do that.";
  }
  console.log("take-- Item locations: " + itemLocations);
  console.log("take-- map location: " + mapLocation);
  console.log("take-- World items: " + items);
  console.log("take-- Items I know: " + itemsIknow);
  console.log("take-- Backpack contents: " + backpack);
}

function dropItem(){
  //check if backpack is empty
  if(backpack.length !== 0){
    //find item index number
    var backpackIndexNumber = backpack.indexOf(item);
    //check if this item is in the backpack, by checking it's index
    if (backpackIndexNumber !== -1){
    //display that the item was dropped
    gameMessage = "You drop the " + item + ".";

    //move the item from the backpack to the gameworld on this location
    items.push(backpack[backpackIndexNumber]);
    itemLocations.push(mapLocation);

    // and remove it from the player's backpack
    backpack.splice(backpackIndexNumber,1);
    }
    else{
      gameMessage = "You don't have a " + item + ".";
    }
  }
  else{
    gameMessage = "You're not carrying anything.";;
  }
  console.log("drop-- Item locations: " + itemLocations);
  console.log("drop-- map location: " + mapLocation);
  console.log("drop-- World items: " + items);
  console.log("drop-- Items I know: " + itemsIknow);
  console.log("drop-- Backpack contents: " + backpack);
}

function useItem(){
//find the item's array index number in the backpack
var backpackIndexNumber = backpack.indexOf(item);
// if the item index is -1 then it's not in the backpack
  if (backpackIndexNumber === -1){
    gameMessage = "You don't have this item."
  }
// check if there are no items in the backpack
  if (backpack.length === 0){
    gameMessage = gameMessage + "You don't have any items."
  }
//If the item is found figure what to do with it
  if (backpackIndexNumber !== -1){
    console.log("I'm in the if, the item was recognised");
    switch(item)
   {
     case "flute":
     console.log("use - I'm in the flute case");
      if(mapLocation === 7) {
        gameMessage = "A man comes from inside with a sword. He sees your flute and drops his weapon from excitement. The man steals your flute and barricades himself in the temple.";
        //Remove the item from the player's backpack
        backpack.splice(backpackIndexNumber, 1);

        items.push("sword");
        itemLocations.push(mapLocation);
      }
      else if (mapLocation === 6){
        gameMessage = "You rest near the tree and play your flute. The leaves and roots around you start to glow and pulse to the sound of the music. It seems even plants can appreciate good music."
      }
      else if(mapLocation === 3){
        gameMessage = "You play your flute abruptly waking the dragon, you start sweating profusely as you try to calm it down with music. The dragon gets so bored by the music that it actually goes back to sleep. Whew that was close!"
      }
      else{
       gameMessage = "You play your dank flute. Hey, that's a nice jam!";
      }
     break;

     case "sword":
   console.log("use - I'm in the sword case");
       if(mapLocation === 3) {
         gameMessage = "You swing the sword and slay the dragon!";
         gameWon = true;
         endGame();
       }
       else{
         gameMessage = "You swing the sword like crazy just for fun. You get tired and you feel silly.";
       }
     break;

   case "stone":
   console.log("use - I'm in the stone case");
   if(mapLocation === 0){
     gameMessage = "You place the stone in the center of the obelisk. It starts moving and shaking and explodes. Even more puzzling than your expression is the fact that there is now a smoking flute on the ground.";
     //Remove the item from the player's backpack
     backpack.splice(backpackIndexNumber, 1);

     items.push("flute");
     itemLocations.push(mapLocation);
   }
   else if (mapLocation === 2){
      gameMessage = "While looking at the fascniating bridge you notice another stone, shinier and smoother than yours. You take the new stone and drop your old dusty one in the river.";
   }
   else if(mapLocation === 3){
     gameMessage = "You throw the stone at the sleeping dragon, it gets annoyed and eats you like a frog eats a fly, then it goes back to sleep."
     endGame();
   }
   else{
   gameMessage  = "You fumble with the stone in your pocket. It's pretty smooth.";
   }
   break;

   case "banana":
   console.log("use - I'm in the banana case");
   if (mapLocation === 5){
     gameMessage = "You give the monkey the banana. It gets angry because the banana is too green and throws a stone at you.";
     //Remove the item from the player's backpack
     backpack.splice(backpackIndexNumber, 1);

     items.push("stone");
     itemLocations.push(mapLocation);
   }
   else if(mapLocation === 0 ){
     gameMessage = "You put the banana in the obelisk's hole. You wait a bit but nothing happens and take the banana back.";
   }
   else if(mapLocation === 1){
     gameMessage = "You try to give the elephants the banana.They're usamused and throw it back to you.";
   }
   else if(mapLocation === 3){
     gameMessage = "You push the banana into one of the dragon's nostrils but it wakes up. Unfortunately it does not share your sense of humor and it blows fire out of it's nose burning both you and the banana into crisps. Pleased with itself the dragon goes back to sleep.";
     endGame();
   }

   else{
     gameMessage = "You look at the banana and decide that it's too green for you to eat.";
   }
   break;

   default:
     gameMessage = "You can't do that.";

    //switch
    }
  //if
  }
  console.log("use-- Item locations: " + itemLocations);
  console.log("use-- map location: " + mapLocation);
  console.log("use-- World items: " + items);
  console.log("use-- Items I know: " + itemsIknow);
  console.log("use-- Backpack contents: " + backpack);
//function
}



function render(){
  output.innerHTML = map[mapLocation];
  image.src = "../images/" + images[mapLocation];

  output.innerHTML = output.innerHTML + "<br/><em>" + gameMessage + "</em>";

  // display item at this location
  for(var i=0; i < itemsIknow.length; i++){
    if(mapLocation === itemLocations[i]){
      output.innerHTML = output.innerHTML + "<br/> You see a <strong>" +
      items[i] + "</strong>.";
    }
  }
}


function endGame(){
  //disable button input
  button.removeEventListener("click", clickHandler, false);
  button.disabled = true;
  //disable enter key input
  window.removeEventListener("keydown", keyHandler, false);
  //disable input field
  input.disabled = true;

  if (gameWon){
    gameMessage = gameMessage + "<br/><strong>Horay you won the game!</strong>";
  }
  else{
    gameMessage = gameMessage + "You died by the dragon.. slowly and painfully, Ouch!";
  }

}

}());
