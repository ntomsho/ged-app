import { useEffect, useState } from "react";
import { ISkillMasteryFeature, ISkill } from "../../../types";
import { normalSkills } from "../../../utils/skills";
import { useCharacter } from "../../../context/NewCharContext";
import Random from "../../../utils/random";
import skillMasteries from "../../../utils/skillMasteries";

interface SkillMasteryBuilderProps {
  feature: Partial<ISkillMasteryFeature>,
  index: number,
  updateCallback: CallableFunction,
}

const SkillMasteryBuilder = (props: SkillMasteryBuilderProps) => {
  const isReady = (): boolean => {
    if (!featurePartial.name) return false;
    if (!featurePartial.skill) return false;
    if (!featurePartial.effectsText && !featurePartial.resources) return false;
    return true;
  }
  
  const [featurePartial, setFeaturePartial] = useState<Partial<ISkillMasteryFeature>>(props.feature);
  const [ready, setReady] = useState(isReady());

  const { character } = useCharacter();

  const updateFeaturePartial = (update: Partial<ISkillMasteryFeature>) => {
    let newFeature;
    newFeature = update;
    setFeaturePartial(newFeature);
    setReady(isReady());
  }

  useEffect(() => {
    setReady(isReady());
  }, [featurePartial])

  const getIsSkillAlreadyTrained = (skill: ISkill): boolean => {
    const matchingFeatures = character.features?.filter((feature, index) => feature.type === 'Skill Mastery' && (feature as ISkillMasteryFeature).skill === skill && index !== props.index);
    const matchingTraining = character.trainedSkills?.includes(skill.name);
    return ((!!matchingFeatures && matchingFeatures.length > 0) || (!!matchingTraining));
  }

  const rollSkillSection = () => {
    const rolledSkill = Random(normalSkills);
    return (
      <div>
        <button onClick={() => updateFeaturePartial({ type: 'Skill Mastery', skill: rolledSkill, upgraded: getIsSkillAlreadyTrained(rolledSkill) })}>Roll Skill</button>
      </div>
    )
  }

  const chooseMastery = (mastery: ISkillMasteryFeature) => {
    if (featurePartial.name === mastery.name) return;
    updateFeaturePartial(mastery);
  }

  const chooseMasterySection = () => {
    if (!featurePartial.skill) return <></>;
    const masteries = skillMasteries.filter((mastery) => mastery.skill === featurePartial.skill);
    return (
      <div>
        <h3>{featurePartial.skill.emoji} {featurePartial.skill.name}</h3>
        <div className="justify-center">
          {masteries.map((mastery, i) => (
            <button key={i} onClick={() => chooseMastery(mastery)}>
              <strong>{mastery.name}</strong>
              {mastery.effectsText.map((text, i) => <div key={i}>{text}</div>)}
              {mastery.resources?.map((resource) => resource.effectTexts.map((text, i) => <div key={i}>{text}</div>))}
            </button>
          ))}
        </div>
      </div>
    )
  }
  
  const confirmFeature = () => {
    if (!ready) return;
    props.updateCallback({ ...featurePartial as ISkillMasteryFeature }, props.index);
  }

  const body = () => {
    if (!featurePartial.skill) return rollSkillSection();
    return chooseMasterySection();
  }

  return (
    <div className="flex-col">
      <h2>Skill Mastery</h2>
      <div className="justify-center">
        {body()}
      </div>
      <button disabled={!ready} onClick={confirmFeature}>Done</button>

    </div>
  )

}

export default SkillMasteryBuilder;