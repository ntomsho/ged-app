import { useEffect, useState } from "react";
import { IKeywordResource, IResource, ISpecialAncestry, ISpecialAncestryFeature } from "../../../types";
import { useCharacter } from "../../../context/NewCharContext";
import Random from "../../../utils/random";
import ancestries from "../../../utils/ancestries";
import FeatureChoiceMaker from "./FeatureChoiceMaker";
import KeywordResourceBuilder from "./KeywordResourceBuilder";

interface AncestryBuilderProps {
  feature: Partial<ISpecialAncestryFeature>,
  index: number,
  updateCallback: CallableFunction,
}

const AncestryBuilder = (props: AncestryBuilderProps) => {
  const isReady = (): boolean => {
    if (!featurePartial.ancestries || featurePartial.ancestries.length !== 2) return false;
    for (let i = 0; i < featurePartial.ancestries!.length; i++) {
      const ancestry = getAncestry(i);
      if (!ancestry.name) return false;
      if (ancestry.choice && ancestry.choice.chosenIndex === -1) return false;
      if (ancestry.resources && ancestry.resources.some((resource) => {
        const kwResource = resource as IKeywordResource;
        if (!kwResource.keywordSlots) return true;
        if (kwResource.keywordSlots.length !== kwResource.keywords.length) return false;
      })) return false;
    }
    return true;
  }
  
  const getAncestry = (index: number): Partial<ISpecialAncestry> => {
    const ancestry = featurePartial.ancestries![index];
    if (!ancestry || !ancestry.choice || ancestry.choice.chosenIndex === -1) return ancestry;
    const ancestryReturn = { ...ancestry };
    const chosenChoice = ancestry.choice.choices[ancestry.choice.chosenIndex];
    if (chosenChoice.effectsText) ancestryReturn.effectTexts = chosenChoice.effectsText;
    if (chosenChoice.resources) ancestryReturn.resources = chosenChoice.resources.map((resource, i) => !!resource ? resource : ancestryReturn.resources![i]);
    return ancestryReturn;
  }

  const [featurePartial, setFeaturePartial] = useState<Partial<ISpecialAncestryFeature>>(props.feature);
  const [ready, setReady] = useState(isReady());
debugger;
  const { character } = useCharacter();

  const updateFeaturePartial = (update: Partial<ISpecialAncestryFeature>) => {
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

  const rollAncestry = (index: number) => {
    const newAncestry = Random(ancestries, featurePartial.ancestries);
    const newFeature = {...featurePartial};
    if (!newFeature.ancestries) newFeature.ancestries = [];
    newFeature.ancestries![index] = newAncestry;
    updateFeaturePartial(newFeature);
  }

  const rollAncestrySection = (ancestry: ISpecialAncestry | null, index: number) => {
    return (
      <button onClick={() => rollAncestry(index)}>{!!ancestry ? 'Reroll' : 'Roll'} Ancestry</button>
    )
  }

  const confirmChoice = (ancestryIndex: number, chosenIndex: number) => {
    const ancestry = featurePartial.ancestries![ancestryIndex];
    if (!ancestry.choice || typeof chosenIndex !== 'number') return;
    const featureCopy = { ...featurePartial };
    featureCopy.ancestries![ancestryIndex].choice = { choices: ancestry.choice.choices, chosenIndex };
    updateFeaturePartial(featureCopy);
  }

  const confirmKeywordResource = (completedResource: IKeywordResource, ancestryIndex: number) => {
    const ancestry = featurePartial.ancestries![ancestryIndex];
    const index = ancestry.resources!.findIndex((resource) => resource.name === completedResource.name);
    if (typeof index === 'number') {
      const newResources = [...ancestry.resources!];
      newResources[index] = completedResource;
      const featureCopy = { ...featurePartial };
      featureCopy.ancestries![ancestryIndex].resources = newResources;
      updateFeaturePartial(featureCopy);
    }
  }

  const resourceSection = (resource: IResource, index: number) => {
    if (resource.type === 'Keyword') return <KeywordResourceBuilder resource={resource as IKeywordResource} updateCallback={(resource: IKeywordResource) => confirmKeywordResource(resource, index)} />
    return (
      <div>
        <h3>{resource.name}</h3>
        {resource.effectTexts.map((text, i) => <div key={i}>{text}</div>)}
      </div>
    )
  }

  const ancestryMainSection = (index: number) => {
    const ancestry = getAncestry(index);
    const hasChoice = ancestry.choice && ancestry.choice.chosenIndex === -1;
    return (
      <>
        <h3>{ancestry.name}</h3>
        {hasChoice ? <FeatureChoiceMaker choice={ancestry.choice!} currentChoice={ancestry.choice!.chosenIndex} confirmCallback={(choiceIndex: number) => confirmChoice(index, choiceIndex)} /> : ''}
        {ancestry.effectTexts?.map((text, i) => <div key={i}>{text}</div>)}
        {ancestry.resources?.map((resource, i) => <div key={i}>{resourceSection(resource, index)}</div>)}
      </>
    )
  }

  const confirmFeature = () => {
    if (!ready) return;
    props.updateCallback({ ...featurePartial as ISpecialAncestryFeature }, props.index);
  }

  const ancestryBody = (ancestry: ISpecialAncestry | null, index: number) => {
    return (
      <div>
      {!!ancestry ? ancestryMainSection(index) : ''}
      {rollAncestrySection(ancestry, index)}
      </div>
    )
  }
  
  return (
    <div className="flex-col">
      <h2>SpecialAncestry</h2>
      <div className="justify-center">
        {ancestryBody(featurePartial.ancestries ? featurePartial.ancestries![0] : null, 0)}
        {ancestryBody(featurePartial.ancestries ? featurePartial.ancestries![1] : null, 1)}
      </div>
      <button disabled={!ready} onClick={confirmFeature}>Done</button>

    </div>
  )
}

export default AncestryBuilder;