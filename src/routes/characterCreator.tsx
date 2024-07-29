import React, { useEffect, useState } from "react";
import { UserAuth } from '../context/AuthContext';
import { getDatabase, ref, onValue } from "firebase/database";
import { ICharacter } from "../types";
import { NewCharacterProvider, useCharacter } from "../context/NewCharContext";
import TraitsPage from "../components/CharacterCreation/TraitsPage";
import StartingSkillPage from "../components/CharacterCreation/StartingSkillPage";

function CharacterCreator() {
    // Stages of character creation
    // Navbar - Name, Rerolls Counter, Restart Button, Cancel Button 
    // Stage 1: Landing page - click to start
    // Stage 2: Traits - Background, Style, Derp
    // Stage 3: Starting Skill
    // Stage 3: Roll for Features
    // Stage 4: Configure Features
    // Stage 5: Starting Equipment
    // Stage 6: Finishing touches - Name, flavor text, Click to confirm

    const { chargenStage, setChargenStage } = useCharacter();
    const stages = [
        <TraitsPage />,
        <StartingSkillPage />,
    ]

    return (
        <div>
            { chargenStage > 0 ? <button onClick={() => setChargenStage(chargenStage - 1)}>{'<'}</button> : '' }
            {stages[chargenStage]}
        </div>
    )
}

export default CharacterCreator;