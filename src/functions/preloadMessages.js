function handlePreloadMessages({castingSpells, castCompleted}){
  if(castingSpells) {
    return [
      <div className="text-wrapper">   
        <div className="typing effect-one">
          Casting spells to retrieve data...
        </div> 
      </div>
    ]
  }
  else if(castCompleted){
    return [
      <div className="text-wrapper">
        <div className="typing effect-two">
          Data retrieve completed...
        </div>
      </div>
    ]
  }
}

export default handlePreloadMessages;