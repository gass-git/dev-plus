function preload({dispatch}) {
  // Remove horizontal scrollbar 
  document.body.classList.add("animation");
  
  setTimeout(() => {dispatch('show gif')}, 500);
  setTimeout(() => {dispatch('show msg one')}, 1000);
  setTimeout(() => {dispatch('remove message')}, 5200);
  setTimeout(() => {dispatch('show msg two')}, 5300);
  setTimeout(() => {dispatch('remove message')}, 7300);
  setTimeout(() => {dispatch('remove gif')}, 7500);
  setTimeout(() => {dispatch('turn off loading')}, 8000);
  setTimeout(() => {dispatch('show component one')}, 8500);
  setTimeout(() => {dispatch('show component two')}, 9000);
  setTimeout(() => {dispatch('show component three')}, 9200);
  setTimeout(() => {dispatch('show component four');}, 9500);
  setTimeout(() => {dispatch('activate menu')}, 10500);

  setTimeout(() => {
    // Re-activate horizontal scrollbar 
    document.body.classList.remove("animation");
  }, 13000)
}
function preloadMessages({message, msgNumber}){
  if(message) {
    return [
      <div className="text-wrapper">   
        <div className={`typing effect-${msgNumber}`}>
          {message}
        </div> 
      </div>
    ]
  }
  else return null;
}

export {preloadMessages, preload};