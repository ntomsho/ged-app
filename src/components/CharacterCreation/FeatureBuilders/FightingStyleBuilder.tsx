import React, { useState } from "react";
import { IFightingStyleFeature, ISkill } from "../../../types";
import { fightingSkills } from "../../../utils/skills";
import { useCharacter } from "../../../context/NewCharContext";
import fightingStyles from "../../../utils/fightingStyles";

interface FightingStyleBuilderProps {
  feature: Partial<IFightingStyleFeature>,
  index: number,
  updateCallback: CallableFunction,
}

const FightingStyleBuilder = (props: FightingStyleBuilderProps) => {
  const [featurePartial, setFeaturePartial] = useState<Partial<IFightingStyleFeature>>(props.feature);
  const [ready, setReady] = useState(false);

  const { character, updateCharacter, rerolls } = useCharacter();

  const updateFeaturePartial = (update: Partial<IFightingStyleFeature>) => {

    const newFeature = {
      ...featurePartial,
      ...update,
    };
    if (character.features?.filter((feature) => feature.type === 'Fighting Style' && feature !== props.feature)) {
      newFeature.upgraded = true;
    }
    setFeaturePartial(newFeature);
  }

  const getIsSkillAlreadyTrained = (skill: ISkill): boolean => {
    const matchingFeatures = character.features?.filter((feature, index) => feature.type === 'Fighting Style' && (feature as IFightingStyleFeature).skill === skill && index !== props.index);
    return (!!matchingFeatures && matchingFeatures.length > 0);
  }

  const chooseSkill = (skill: ISkill) => {
    if (featurePartial.skill === skill) return;
    const newFeature: Partial<IFightingStyleFeature> = fightingStyles.find((fightingStyle) => fightingStyle.skill === skill)!;
    newFeature.upgraded = getIsSkillAlreadyTrained(skill);
    updateFeaturePartial(newFeature);
  }

  const confirmFeature = () => {
    if (!ready) return;
    props.updateCallback({ ...featurePartial as IFightingStyleFeature }, props.index);
  }

  return (
    <div className="flex-col">
      <h2>Fighting Style</h2>
      <div>
        {fightingSkills.map((skill) => (
          <div className='flex-col'>
            <button onClick={() => chooseSkill(skill)}>{skill.emoji} {skill.name}</button>
            {!featurePartial.upgraded ? '' : skill.masteries.map((mastery) => (
              <button onClick={() => updateFeaturePartial({ mastery, upgraded: true })} >{mastery}</button>
            ))}
            {/* Starting equipment list */}
          </div>
        ))}
      </div>
      <button disabled={!ready} onClick={confirmFeature}>Done</button>

    </div>
  )

}

export default FightingStyleBuilder;