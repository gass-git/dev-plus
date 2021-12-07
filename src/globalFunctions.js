function preload({
  dispatchOne
  }) {
  // Remove horizontal scrollbar 
  document.body.classList.add("animation");
  
  setTimeout(() => {
    dispatchOne('show gif');
  }, 500);

  setTimeout(() => {
    dispatchOne('show msg one');
  }, 1000);

  setTimeout(() => {
    dispatchOne('remove message');
  }, 5200);

  setTimeout(() => {
    dispatchOne('show msg two');
  }, 5300);

  setTimeout(() => {
    dispatchOne('remove message');
  }, 7300);
  
  setTimeout(() => {
    dispatchOne('remove gif');
  }, 7500);

  setTimeout(() => {
    dispatchOne('turn off loading');
  }, 8000);

  setTimeout(() => {
    dispatchOne('show component one');
  }, 8500);

  setTimeout(() => {
    dispatchOne('show component two');
  }, 9000);

  setTimeout(() => {
    dispatchOne('show component three');
  }, 9200);

  setTimeout(() => {
    dispatchOne('show component four');
  }, 9500);

  setTimeout(() => {
    dispatchOne('activate menu');
  }, 10500);

  setTimeout(()=>{
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