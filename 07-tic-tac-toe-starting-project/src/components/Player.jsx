import { useState } from "react";

export default function Player({initialName, symbol, isActive, onChangeName}){
    const [playerName, setPlayerName] = useState(initialName)
    const [isEdititng, setIsEdititng] = useState(false);

    function handleEditClick(){
         setIsEdititng((editing) => !editing);
         if(isEdititng){
            onChangeName(symbol, playerName);
         }
    }
    function handleChange(event){
        setPlayerName(event.target.value);
    }
    let editablePlayerName = <span className="player-name">{playerName}</span>
    let btnCaption = 'Edit';
    if(isEdititng){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
        btnCaption = 'save';
    }

    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
          </li>
    );
}