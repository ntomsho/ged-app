import { useState } from "react";
import { FeatureChoice, IFeatureChoice, IIntegerResource, IPerDayResource, IResource } from "../../../types";

interface FeatureChoiceMakerProps {
  choice: IFeatureChoice;
  currentChoice: number;
  confirmCallback: CallableFunction
}

const FeatureChoiceMaker = (props: FeatureChoiceMakerProps) => {
  const { choices } = props.choice;

  const [currentChoice, setCurrentChoice] = useState(props.currentChoice);

  const confirmChoice = () => {
    props.confirmCallback(currentChoice);
  }

  const choiceResource = (resource: IResource) => {
    return (
      <div key={resource.name}>
        <div>{resource.name} {typeof (resource as IIntegerResource).maxValue === 'number' ? (resource as IIntegerResource).maxValue : ''}</div>
        {typeof (resource as IPerDayResource).usesPerDay === 'number' ? `${typeof (resource as IPerDayResource).usesPerDay} times per day` : ''}
        {resource.effectTexts.map((text, i) => <div key={i}>{text}</div>)}
      </div>
    )
  }

  const choiceBlock = (choice: FeatureChoice, index: number) => {
    let choiceTexts;
    if (!!choice.alternateChoiceTexts) choiceTexts = choice.alternateChoiceTexts?.map((text) => <div>{text}</div>);
    else choiceTexts = <>
      {choice.effectsText?.map((text, i) => <div key={i}>{text}</div>)}
      {choice.resources?.map((resource) => !!resource ? choiceResource(resource) : '')}
    </>

    return <button onClick={() => setCurrentChoice(index)}>
      <div className="flex-col">
        {choiceTexts}  
      </div>
    </button>
  }

  const choicesSection = () => {
    return choices.map((choice, i) => <div key={i}>{choiceBlock(choice, i)}</div>);
  }

  const confirmButton = () => {
    if (currentChoice === -1) return <></>
    return (
      <button onClick={confirmChoice}>Confirm</button>
    )
  }

  return (
    <div>
      <h3>Choose One</h3>
      <div className="justify-content">{choicesSection()}</div>
      {confirmButton()}
    </div>
  )
}

export default FeatureChoiceMaker;