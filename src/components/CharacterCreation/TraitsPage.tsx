import { useEffect, useState } from "react";
import { useCharacter } from "../../context/NewCharContext";
import { IDerpTrait } from "../../types";
import * as Traits from '../../utils/derpTraits';
import Random from "../../utils/random";

const TraitsPage = () => {
    const getHasBeenModified = () => (!!character.traits?.Background || !!character.traits?.Style || !!character.traits?.Derp);
    const getIsReady = () => (!!character.traits?.Background && !!character.traits.Style && !!character.traits.Derp);

    const { character, updateCharacter, rerolls, chargenStage, setChargenStage } = useCharacter();
    const [started, setStarted] = useState(getHasBeenModified());
    const [ready, setReady] = useState(getIsReady());
    
    const setAllTraits = () => {
        const traits = {
            Background: Random(Traits.backgrounds),
            Style: Random(Traits.styles),
            Derp: Random(Traits.derps),
        };
        updateCharacter({ traits });
    }

    const setTrait = (trait: 'Background' | 'Style' | 'Derp', value: IDerpTrait) => {
        const currentTraits = { ...character.traits };
        currentTraits[trait] = value;
        // @ts-ignore
        updateCharacter({ traits: currentTraits });
    }

    useEffect(() => {
        if (started && !getHasBeenModified()) setAllTraits();
    }, [started]);

    useEffect(() => {
        setReady(getIsReady());
    }, [character]);

    return (
        <>
            {started ?
                <>
                <h1>Traits</h1>
                <div className={'justify-center'}>
                    <div className={'flex-col align-center'}>
                        <h3>Background</h3>
                        <div>
                            <span>{ character.traits?.Background.emoji }</span>
                            <span>{ ' ' + character.traits?.Background.name }</span>
                        </div>
                        <button disabled={rerolls <= 0} onClick={() => setTrait('Background', Random(Traits.backgrounds))}>Reroll</button>
                    </div>
                    <div className={'flex-col align-center'}>
                        <h3>Style</h3>
                        <div>
                            <span>{ character.traits?.Style.emoji }</span>
                            <span>{ ' ' + character.traits?.Style.name }</span>
                        </div>
                        <button disabled={rerolls <= 0} onClick={() => setTrait('Style', Random(Traits.styles))}>Reroll</button>
                    </div>
                    <div className={'flex-col align-center'}>
                        <h3>Derp</h3>
                        <div>
                            <span>{ character.traits?.Derp.emoji }</span>
                            <span>{ ' ' + character.traits?.Derp.name }</span>
                        </div>
                        <button disabled={rerolls <= 0} onClick={() => setTrait('Derp', Random(Traits.derps))}>Reroll</button>
                    </div>
                </div>
                </>
                :
                <>
                <h1>Create New Character</h1>
                <button onClick={() => setStarted(true)}>Start</button>
                </>
            }
            { ready ? <button onClick={() => setChargenStage(chargenStage + 1)}>{'>'}</button> : '' }
        </>
    )
}

export default TraitsPage;