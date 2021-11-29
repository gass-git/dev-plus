
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
  }, 6000);

  setTimeout(() => {
    setShowGif(false);
  }, 8500);

  setTimeout(() => {
    setCastCompleted(false);
    setLoading(false);
  }, 8500);

  setTimeout(() => {
    setShowComponentOne(true);
  }, 9500);

  setTimeout(() => {
    setShowComponentTwo(true);
  }, 10000);

  setTimeout(() => {
    setShowComponentThree(true);
  }, 10200);

  setTimeout(() => {
    setShowComponentFour(true);
  }, 10500);

  setTimeout(() => {
    setMenuActivated(true);
  }, 11400);

  setTimeout(()=>{
    // Re-activate horizontal scrollbar 
    document.body.classList.remove("animation");
  }, 13000)
}

export default preload;