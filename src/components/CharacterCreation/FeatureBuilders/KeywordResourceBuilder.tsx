import { IKeywordResource, Keyword, keywordType } from "../../../types";
import animals from "../../../utils/keywords/animals";
import bases from "../../../utils/keywords/bases";
import elements from "../../../utils/keywords/elements";
import forms from "../../../utils/keywords/forms";
import verbs from "../../../utils/keywords/verbs";
import Random from "../../../utils/random";

interface KeywordResourceBuilderProps {
  resource: IKeywordResource;
  updateCallback: CallableFunction;
}

const KeywordResourceBuilder = (props: KeywordResourceBuilderProps) => {
  const { resource, updateCallback } = props;
  const { keywords } = resource;

  const keywordsByType = {
    'Element': elements,
    'Form': forms,
    'Verb': verbs,
    'Animal': animals,
    'Base': bases,
  };

  const rollKeyword = (possibleTypes: keywordType[]) => {
    const type = Random(possibleTypes);
    return Random(keywordsByType[type]);
  }

  const updateKeywords = (newKeywords: Keyword[]) => {
    const newResource = { ...resource };
    newResource.keywords = newKeywords;
    updateCallback(newResource);
  }

  const rollAllKeywords = () => {
    updateKeywords(resource.keywordSlots.map((slot) => rollKeyword(slot.types)));
  }

  const rerollKeyword = (index: number) => {
    const newKeywords = [...keywords];
    const slot = resource.keywordSlots[index];
    newKeywords[index] = rollKeyword(slot.types);
    updateKeywords(newKeywords);
  }

  const keywordsSection = () => {
    if (keywords.length === 0) return <></>
    return keywords.map((keyword, i) =>(
      <div key={i}>
        <div className={'border-2'}>
          {keyword.emoji} {keyword.word} ({keyword.type})
        </div>
        <button onClick={() => rerollKeyword(i)}>Reroll</button>
      </div>
    ));
  }
  
  return (
    <div>
      <h3>{resource.name}</h3>
      <div>{keywordsSection()}</div>
      <button onClick={rollAllKeywords}>{keywords.length === 0 ? 'Roll Keywords' : 'Reroll All'}</button>
    </div>
  )
}

export default KeywordResourceBuilder;