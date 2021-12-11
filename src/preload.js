function preload({dispatch}) {
  setTimeout(() => {
    dispatch('show svg background');
  }, 1000)

  setTimeout(() => {
    dispatch('activate menu');
  }, 1500)

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