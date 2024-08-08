import { useEffect, useState } from "react";
import { IKeywordResource, IMagicFeature, IResource, ISkillMasteryFeature } from "../../../types";
import { useCharacter } from "../../../context/NewCharContext";
import magic from "../../../utils/magic";
import KeywordResourceBuilder from "./KeywordResourceBuilder";

interface MagicBuilderProps {
  feature: Partial<IMagicFeature>,
  index: number,
  updateCallback: CallableFunction,
}

const MagicBuilder = (props: MagicBuilderProps) => {
  const isReady = (): boolean => {
    if (!featurePartial.name) return false;
    if (!featurePartial.resources) return false;
    if (!featurePartial.resources.every((resource) => isResourceComplete(resource))) return false;
    return true;
  }

  const isResourceComplete = (resource: IResource) => {
    if (resource.type !== 'Keyword') return true;
    const keywordResource = resource as IKeywordResource;
    return keywordResource.keywords.length === keywordResource.keywordSlots.length;
  }

  const [featurePartial, setFeaturePartial] = useState<Partial<IMagicFeature>>(props.feature);
  const [ready, setReady] = useState(isReady());

  const { character } = useCharacter();

  const updateFeaturePartial = (update: Partial<IMagicFeature>) => {
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

  const chooseMagicType = (magicType: Partial<IMagicFeature>) => {
    if (featurePartial.name === magicType.name) return;
    updateFeaturePartial(magicType);
  }

  const getMagicTypeByUnlockingSkill = (skillName: string): IMagicFeature | undefined => {
    return magic.find((magicType) => magicType.unlockingSkill?.name === skillName);
  }

  const getAvailableMagicTypes = (): IMagicFeature[] => {
    const wordsOfPower = magic[0];
    const magicTypes = [wordsOfPower];
    character.trainedSkills?.forEach((skill) => {
      const magicType = getMagicTypeByUnlockingSkill(skill);
      if (magicType) magicTypes.push(magicType);
    });
    character.features?.forEach((feature) => {
      const skillFeature = feature as ISkillMasteryFeature;
      if (skillFeature.skill) {
        const magicType = getMagicTypeByUnlockingSkill(skillFeature.skill.name);
        if (magicType) magicTypes.push(magicType);
      }
    });
    return magicTypes;
  }

  const chooseMagicSection = (optionsToShow: IMagicFeature[]) => {
    return (
      <div>
        <div className="justify-center">
          {optionsToShow.map((magicType, i) => (
            <div key={i}>
              <button onClick={() => chooseMagicType(magicType)}>
                <strong>{magicType.name}</strong>
                <div>{magicType.mainDescription}</div>
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const chooseKeywordsSection = () => (
    <div>
      <h3>{featurePartial.name}</h3>
      {featurePartial.resources?.filter((resource) => resource.type === 'Keyword').map((resource, i) => (
        <div key={i}>
          <KeywordResourceBuilder resource={resource as IKeywordResource} updateCallback={confirmKeywordResource} />
          <div>{resource.effectTexts}</div>
        </div>
      ))}
    </div>
  )

  const confirmKeywordResource = (completedResource: IKeywordResource) => {
    const index = featurePartial.resources?.findIndex((resource) => resource.name === completedResource.name);
    if (typeof index === 'number') {
      const newResources = [...featurePartial.resources!];
      newResources[index] = completedResource;
      updateFeaturePartial({ resources: newResources });
    }
  }

  const confirmFeature = () => {
    if (!ready) return;
    props.updateCallback({ ...featurePartial as IMagicFeature }, props.index);
  }

  const body = () => {
    if (!featurePartial.resources || featurePartial.resources.length === 0) return chooseMagicSection(getAvailableMagicTypes());
    return chooseKeywordsSection();
  }
  
  return (
    <div className="flex-col">
      <h2>Magic</h2>
      <div className="justify-center">
        {body()}
      </div>
      <button disabled={!ready} onClick={confirmFeature}>Done</button>

    </div>
  )
}

export default MagicBuilder;