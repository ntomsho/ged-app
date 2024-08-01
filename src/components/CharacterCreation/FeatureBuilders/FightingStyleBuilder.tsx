import { useEffect, useState } from "react";
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
  const isReady = (): boolean => {
    if (!featurePartial.name) return false;
    if (!featurePartial.skill) return false;
    if (featurePartial.upgraded && !featurePartial.mastery) return false;
    return true;
  }
  
  const [featurePartial, setFeaturePartial] = useState<Partial<IFightingStyleFeature>>(props.feature);
  const [ready, setReady] = useState(isReady());

  const { character } = useCharacter();

  const updateFeaturePartial = (update: Partial<IFightingStyleFeature>) => {
    const newFeature = {
      ...featurePartial,
      ...update,
    };
    setFeaturePartial(newFeature);
    setReady(isReady());
  }

  useEffect(() => {
    setReady(isReady());
  }, [featurePartial])

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
      <div className="justify-center">
        {fightingSkills.map((skill, ind) => (
          <div key={ind} className='flex-col'>
            <button className={`${featurePartial.skill === skill ? 'bg-teal-100' : ''}`} onClick={() => chooseSkill(skill)}>
              <div className="flex-col">
                <strong>{skill.emoji} {skill.name}</strong>
                <div>Used For</div>
                <ul className='text-sm'>
                  {skill.usedFor.map((use, i) => <li key={i}>{use}</li>)}
                </ul>
              </div>
            </button>
            <div className='flex flex-col'>
              {(!featurePartial.upgraded || featurePartial.skill !== skill) ? '' : skill.masteries.map((mastery, i) => (
                <button className={featurePartial.mastery === mastery ? 'bg-teal-100' : ''} key={i} onClick={() => updateFeaturePartial({ mastery, upgraded: true })} >{mastery}</button>
              ))}
            </div>
            {/* Starting equipment list */}
            {ind < fightingSkills.length - 1 ? <br /> : ''}
          </div>
        ))}
      </div>
      <button disabled={!ready} onClick={confirmFeature}>Done</button>

    </div>
  )

}

export default FightingStyleBuilder;