
function preload({
  setShowGif, 
  setCastingSpells, 
  setCastCompleted, 
  setLoading,
  setShowComponentOne,
  setShowComponentTwo,
  setShowComponentThree,
  setShowComponentFour
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
  }, 9000);

  setTimeout(() => {
    setCastCompleted(false);
    setLoading(false);
  }, 9000);

  setTimeout(() => {
    setShowComponentOne(true);
  }, 10000);

  setTimeout(() => {
    setShowComponentTwo(true);
  }, 10600);

  setTimeout(() => {
    setShowComponentThree(true);
  }, 10800);

  setTimeout(() => {
    setShowComponentFour(true);
  }, 11000);

  setTimeout(()=>{
    // Re-activate horizontal scrollbar 
    document.body.classList.remove("animation");
  }, 14000)
}

export default preload;