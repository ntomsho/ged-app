import { useCharacter } from "../context/NewCharContext";
import TraitsPage from "../components/CharacterCreation/TraitsPage";
import StartingSkillPage from "../components/CharacterCreation/StartingSkillPage";
import FeaturesPage from "../components/CharacterCreation/FeaturesPage";

function CharacterCreator() {
    // Stages of character creation
    // Navbar - Name, Rerolls Counter, Restart Button, Cancel Button 
    // Stage 1: Landing page + Traits - click to start / Background, Style, Derp
    // Stage 2: Starting Skill
    // Stage 3: Roll for Features
    // Stage 4: Configure Features
    // Stage 5: Starting Equipment
    // Stage 6: Finishing touches - Name, flavor text, Click to confirm

    const { chargenStage, setChargenStage } = useCharacter();
    const stages = [
        <TraitsPage />,
        <StartingSkillPage />,
        <FeaturesPage />,
    ]

    return (
        <div>
            { chargenStage > 0 ? <button onClick={() => setChargenStage(chargenStage - 1)}>{'<'}</button> : '' }
            {stages[chargenStage]}
        </div>
    )
}

export default CharacterCreator;