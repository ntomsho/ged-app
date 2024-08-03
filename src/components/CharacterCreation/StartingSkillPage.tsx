import { useEffect, useState } from "react";
import { normalSkills } from '../../utils/skills';
import { useCharacter } from "../../context/NewCharContext";
import Random from "../../utils/random";

const StartingSkillPage = () => {
  const getIsReady = () => character.trainedSkills!.length > 0;
  
  const { character, updateCharacter, rerolls, chargenStage, setChargenStage } = useCharacter();
  const [ready, setReady] = useState(getIsReady());

  const setSkill = (skill: 'Brute Force' | 'Ocular Prowess' | 'Rad Moves' | 'Creepin\'' | 'Friendshippery' | 'Macgyver' | 'Man vs. Wild' | 'Thinkiness') => {
    updateCharacter({ trainedSkills: [skill] });
  };

  useEffect(() => {
    if (!ready) setSkill(Random(normalSkills).name);
  }, []);

  useEffect(() => {
    setReady(getIsReady());
  }, [character]);

  return (
    <>
    <h1>Starting Skill</h1>
    {normalSkills.map((skill, index) => (
      <div key={index}>
        <div className={character.trainedSkills?.includes(skill.name) ? 'border-2' : ''}>
          <span>{skill.emoji}</span>
          <span className={character.trainedSkills?.includes(skill.name) ? 'font-bold' : ''} >{' ' + skill.name}</span>
        </div>
      </div>
    ))}
    <button onClick={() => setSkill(Random(normalSkills).name)}>Reroll</button>
    { ready ? <button onClick={() => setChargenStage(chargenStage + 1)}>{'>'}</button> : '' }
    </>
  )
};

export default StartingSkillPage;