import { useEffect, useState } from "react";
import { useCharacter } from "../../../context/NewCharContext";
import { IArtifactFeature, IArtifactWeaponFeature, IKeywordResource, IResource, IWeapon, WeaponType } from "../../../types";
import Random from "../../../utils/random";
import artifacts from "../../../utils/artifacts";
import { getRandomWeapon, weaponTypes } from "../../../utils/equipment";
import FeatureChoiceMaker from "./FeatureChoiceMaker";
import KeywordResourceBuilder from "./KeywordResourceBuilder";

interface ArtifactBuilderProps {
  feature: Partial<IArtifactFeature>,
  index: number,
  updateCallback: CallableFunction,
}

const ArtifactBuilder = (props: ArtifactBuilderProps) => {
  const isReady = (): boolean => {
    const feature = getFeature(featurePartial);
    if (!feature.name) return false;
    if (feature.choice && feature.choice.chosenIndex === -1) return false;
    if (feature.resources) return feature.resources.some((resource) => {
      const kwResource = resource as IKeywordResource;
      if (!kwResource.keywordSlots) return true;
      if (kwResource.keywordSlots.length !== kwResource.keywords.length) return false;
      return true;
    });
    return true;
  }

  const getFeature = (feature: Partial<IArtifactFeature>): Partial<IArtifactFeature> => {
    if (!feature.choice || feature.choice.chosenIndex === -1) return feature;
    const featureReturn = { ...featurePartial };
    const chosenChoice = feature.choice.choices[feature.choice.chosenIndex];
    if (chosenChoice.effectsText) featureReturn.effectTexts = chosenChoice.effectsText;
    if (chosenChoice.resources) featureReturn.resources = chosenChoice.resources.map((resource, i) => !!resource ? resource : featureReturn.resources![i]);
    return featureReturn;
  }

  const [featurePartial, setFeaturePartial] = useState<Partial<IArtifactFeature>>(getFeature(props.feature));
  const [ready, setReady] = useState(isReady());

  const { character } = useCharacter();

  const updateFeaturePartial = (update: Partial<IArtifactFeature>) => {
    const newFeature = {
      ...featurePartial,
      ...update,
    };
    setFeaturePartial(newFeature);
    setReady(isReady());
  }

  useEffect(() => {
    setReady(isReady());
  }, [featurePartial]);

  const chooseSubtype = (subType: 'Magic Garb' | 'Magic Object' | 'Magic Weapon') => {
    const assertedSubtype = subType!;
    updateFeaturePartial({ subType: assertedSubtype });
  }

  const rollArtifact = () => {
    const rolledArtifact = Random(artifacts.filter((artifact) => artifact.subType === featurePartial.subType));
    if ((featurePartial as IArtifactWeaponFeature).weaponType) (rolledArtifact as IArtifactWeaponFeature).weaponType = (featurePartial as IArtifactWeaponFeature).weaponType;
    updateFeaturePartial({ ...rolledArtifact });
  }

  const chooseWeaponType = (weapon: IWeapon) => {
    const weaponPartial: IArtifactWeaponFeature = { ...featurePartial as IArtifactWeaponFeature };
    weaponPartial.weaponType = weapon;
    updateFeaturePartial({...weaponPartial});
  }

  const confirmFeature = () => {
    if (!ready) return;
    // Add artifact item for starting inventory
    props.updateCallback({ ...featurePartial as IArtifactFeature }, props.index);
  }

  const chooseSubtypeSection = () => {
    const subtypes: ('Magic Garb' | 'Magic Object' | 'Magic Weapon')[] = ['Magic Garb', 'Magic Object', 'Magic Weapon'];
    const subtypeEmojis = ['👕', '🔮', '🗡'];
    return subtypes.map((subtype, i) => (
      <button key={i} onClick={() => chooseSubtype(subtype)}>
        <div>{subtypeEmojis[i]}</div>
        <div>{subtype}</div>
      </button>
    ));
  }

  const rollArtifactSection = () => {
    const readyToRoll = !(featurePartial.subType !== 'Magic Weapon' || !!(featurePartial as IArtifactWeaponFeature).weaponType);
    return (
      <div>
        <h3>{featurePartial.subType}</h3>
        <button disabled={readyToRoll} onClick={rollArtifact}>{featurePartial.name ? 'Reroll' : 'Roll'} Artifact</button>
        {featurePartial.subType === 'Magic Weapon' ? chooseWeaponSection() : ''}
        {featurePartial.name ? artifactMainSection() : ''}
      </div>
    )
  }

  const chooseWeaponSection = () => {
    const weaponPartial = featurePartial as IArtifactWeaponFeature;
    return (
      <div>
        {(weaponPartial.weaponType ? <h3>{weaponPartial.weaponType.name} ({weaponPartial.weaponType.weaponType})</h3> : '')}
        {(weaponPartial.weaponType ? <button onClick={() => chooseWeaponType(getRandomWeapon(weaponPartial.weaponType.weaponType))}>Roll new {weaponPartial.weaponType.weaponType}</button> : '')}
        {Object.keys(weaponTypes).map((weaponType, i) => <button key={i} onClick={() => chooseWeaponType(getRandomWeapon(weaponType as WeaponType))}>
          {(weaponPartial.weaponType?.name === weaponType ? 'Reroll ' : '') + weaponType}
        </button>)}
      </div>
    )
  }

  const resourceSection = (resource: IResource) => {
    if (resource.type === 'Keyword') return <KeywordResourceBuilder resource={resource as IKeywordResource} updateCallback={confirmKeywordResource} />
    return (
      <div>
        <h3>{resource.name}</h3>
        {resource.effectTexts.map((text, i) => <div key={i}>{text}</div>)}
      </div>
    )
  }

  const confirmKeywordResource = (completedResource: IKeywordResource) => {
    const index = featurePartial.resources?.findIndex((resource) => resource.name === completedResource.name);
    if (typeof index === 'number') {
      const newResources = [...featurePartial.resources!];
      newResources[index] = completedResource;
      updateFeaturePartial({ resources: newResources });
    }
  }

  const confirmChoice = (chosenIndex: number) => {
    if (!featurePartial.choice || typeof chosenIndex !== 'number') return;
    updateFeaturePartial({ choice: { choices: featurePartial.choice.choices, chosenIndex } });
  }

  const artifactMainSection = () => {
    const feature = getFeature(featurePartial);
    if (featurePartial.name === 'Boomerang / Manyshots Weapon') return boomerangMultishotMainSection();
    const hasChoice = featurePartial.choice && featurePartial.choice.chosenIndex === -1;
    return (
      <div>
        <h3>{featurePartial.name}</h3>
        {feature.effectTexts?.map((text, i) => <div key={i}>{text}</div>)}
        {feature.resources?.map((resource, i) => <div key={i}>{resourceSection(resource)}</div>)}
        {hasChoice ? <FeatureChoiceMaker choice={featurePartial.choice!} currentChoice={featurePartial.choice!.chosenIndex} confirmCallback={confirmChoice} /> : ''}
      </div>
    )
  }

  const boomerangMultishotMainSection = () => {
    const boomerang = ['Heavy Melee', 'Light Melee'].includes((featurePartial as IArtifactWeaponFeature).weaponType.name);
    let artifactTypeName = 'Boomerang / Manyshots Weapon';
    if (!!(featurePartial as IArtifactWeaponFeature).weaponType) artifactTypeName = boomerang ? 'Boomerang Weapon' : 'Manyshots Weapon';
    return (
      <div>
        <h3>{artifactTypeName}</h3>
        {boomerang ? featurePartial.effectTexts?.slice(0,1).map((text, i) => <div key={i}>{text}</div>) :
        <div>{featurePartial.effectTexts![2]}</div>}
        {boomerang ? '' : resourceSection(featurePartial.resources![0])}
      </div>
    )
  }

  const body = () => {
    if (!featurePartial.subType) return chooseSubtypeSection();
    return rollArtifactSection();
  }
  
  return (
    <div className="flex-col">
      <h2>Artifact</h2>
      <div className="justify-center">
        {body()}
      </div>
      <button disabled={!ready} onClick={confirmFeature}>Done</button>

    </div>
  )
}

export default ArtifactBuilder;