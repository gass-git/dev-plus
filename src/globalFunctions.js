function preload({
  setShowGif, 
  setCastingSpells, 
  setCastCompleted, 
  setLoading,
  setShowComponentOne,
  setShowComponentTwo,
  setShowComponentThree,
  setShowComponentFour,
  setMenuActivated
  }) {
  // Remove horizontal scrollbar 
  document.body.classList.add("animation");
  
  setTimeout(() => {
    setShowGif(true);
  }, 500);

  setTimeout(() => {
    setCastingSpells(true);
  }, 1000);

  setTimeout(() => {
    setCastingSpells(false);
    setCastCompleted(true);
  }, 5300);

  setTimeout(() => {
    setCastCompleted(false);
  }, 7300);
  
  setTimeout(() => {
    setShowGif(false);
  }, 7500);

  setTimeout(() => {
    setLoading(false);
  }, 8000);

  setTimeout(() => {
    setShowComponentOne(true);
  }, 8500);

  setTimeout(() => {
    setShowComponentTwo(true);
  }, 9000);

  setTimeout(() => {
    setShowComponentThree(true);
  }, 9200);

  setTimeout(() => {
    setShowComponentFour(true);
  }, 9500);

  setTimeout(() => {
    setMenuActivated(true);
  }, 10800);

  setTimeout(()=>{
    // Re-activate horizontal scrollbar 
    document.body.classList.remove("animation");
  }, 13000)
}
function preloadMessages({castingSpells, castCompleted}){
  if(castingSpells) {
    return [
      <div className="text-wrapper">   
        <div className="typing effect-one">
          Casting spells to collect data
        </div> 
      </div>
    ]
  }
  else if(castCompleted){
    return [
      <div className="text-wrapper">
        <div className="typing effect-two">
          Fetch completed
        </div>
      </div>
    ]
  }
}

export {preloadMessages, preload};