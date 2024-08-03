import React, { useEffect, useState } from "react";
import Random from "../../utils/random";
import { useCharacter } from "../../context/NewCharContext";
import { ICharacterFeature, IArtifactFeature, IFightingStyleFeature, IMagicFeature, ISkillMasteryFeature, ISpecialAncestryFeature, ISkill } from "../../types";
import fightingStyles from "../../utils/fightingStyles";
import { update } from "firebase/database";
import FightingStyleBuilder from "./FeatureBuilders/FightingStyleBuilder";
import SkillMasteryBuilder from "./FeatureBuilders/SkillMasteryBuilder";
import MagicBuilder from "./FeatureBuilders/MagicBuilder";

const FeaturesPage = () => {
  const getIsReady = () => character.features!.length === 2;

  const { character, updateCharacter, rerolls, chargenStage, setChargenStage } = useCharacter();

  const [skillRoll, setSkillRoll] = useState<string>('')
  // const [features, setFeatures] = useState<ICharacterFeature[]>([]);
  const [ready, setReady] = useState(getIsReady());
  const [featureBuild, setFeatureBuild] = useState<React.ReactElement | null>(null);


  const skillRolls = [
    'Brute Force',
    'Ocular Prowess',
    'Rad Moves',
    'None',
    'None',
    'None',
  ];

  const featureTypes = [
    'Artifact',
    'Fighting Style',
    'Magic',
    'Skill Mastery',
    'Special Ancestry',
  ];

  const getFeatureBuilder = (index: number, newFeature?: Partial<ICharacterFeature>) => {
    const feature = newFeature ?? character.features![index];
    /* */
    return <MagicBuilder feature={feature as IMagicFeature} index={index} updateCallback={setFeature} />;
    /* */
    switch (feature.type) {
      case 'Artifact': return <></>;
      case 'Fighting Style': return <FightingStyleBuilder feature={feature as IFightingStyleFeature} index={index} updateCallback={setFeature} />
      case 'Magic': return <MagicBuilder feature={feature as IMagicFeature} index={index} updateCallback={setFeature} />;
      case 'Skill Mastery': return <SkillMasteryBuilder feature={feature as ISkillMasteryFeature} index={index} updateCallback={setFeature} />;
      case 'Special Ancestry': return <></>;
      default:
        console.log('Invalid feature type');
        return <></>
    }
  }

  const getSkillRoll = () => {
    setSkillRoll(Random(skillRolls));
  };

  const getRandomFeature = (): Partial<ICharacterFeature> => {
    const featureType = Random(featureTypes);
    switch (featureType) {
      case 'Artifact':
        const artifact: Partial<IArtifactFeature> = { type: 'Artifact' };
        return artifact;
      case 'Fighting Style':
        const fightingStyle: Partial<IFightingStyleFeature> = { type: 'Fighting Style'};
        return fightingStyle;
      case 'Magic':
        const magic: Partial<IMagicFeature> = { type: 'Magic' };
        return magic;
      case 'Skill Mastery':
        const skillMastery: Partial<ISkillMasteryFeature> = { type: 'Skill Mastery' };
        return skillMastery;
      // case 'Special Ancestry':
      default:
        const ancestry: Partial<ISpecialAncestryFeature> = { type: 'Special Ancestry' };
        return ancestry;
    }
  }

  const setFeature = (feature: ICharacterFeature, index: number) => {
    const features = [ ...character.features! ];
    features[index] = feature;
    updateCharacter({ features });
    setFeatureBuild(null);
  }

  useEffect(() => {
    if (['Brute Force', 'Ocular Prowess', 'Rad Moves'].includes(skillRoll)) {
      updateCharacter({ features: [fightingStyles.find((style) => style.name === skillRoll)!] });
    } else {
      updateCharacter({ features: [] });
    }
  }, [skillRoll]);

  const skillRollSection = <button onClick={getSkillRoll}>Roll Feature Set</button>;

  const featureBlock = (feature: ICharacterFeature | null, index: number) => {
    if (feature) {
      return (
        <div className='flex-col'>
          <h3>{feature.type}</h3>
          <div>{feature.name}</div>
          <button onClick={() => setFeatureBuild(getFeatureBuilder(index, feature))}>Edit Feature</button>
        </div>
      )
    }
    return (
      <button onClick={() => setFeatureBuild(getFeatureBuilder(index, getRandomFeature()))}>Roll Feature</button>
    )
  }

  const featuresSection = <div>
    <ul>
      <li>{ featureBlock(character.features![0], 0) }</li>
      <br/>
      <li>{ featureBlock(character.features![1], 1) }</li>
    </ul>
  </div>

  const body = () => {
    if (!skillRoll) return skillRollSection;
    if (featureBuild) return featureBuild;
    return featuresSection;
  }
  
  return (
    <>
      <h1>Features</h1>
      {body()}
    </>
  )
}

export default FeaturesPage;