import React, { createContext, useContext, useState } from 'react';
import { ICharacter } from '../types';

interface CharacterContextProps {
  character: Partial<ICharacter>;
  rerolls: number;
  chargenStage: number;
  updateCharacter: (updatedCharacter: Partial<ICharacter>) => void;
  useReroll: () => void;
  setChargenStage: (value: number) => void;
}

const NewCharacterContext = createContext<CharacterContextProps | undefined>(undefined);

export const useCharacter = () => {
  const context = useContext(NewCharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};

export const NewCharacterProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [chargenStage, setChargenStage] = useState(0);
  
  const [character, setCharacter] = useState<Partial<ICharacter>>({
    characterName: '',
    playerId: '',
    currentHealth: 0,
    maxHealth: 0,
    currentDerpPoints: 0,
    trainedSkills: [],
    features: [],
  });

  const [rerolls, setRerolls] = useState(5);

  const updateCharacter = (updatedCharacter: Partial<ICharacter>) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      ...updatedCharacter,
    }));
  };

  const useReroll = () => {
    if (rerolls > 0) setRerolls(rerolls - 1);
  }

  return (
    <NewCharacterContext.Provider value={{ character, rerolls: 5, chargenStage, updateCharacter, useReroll, setChargenStage }}>
      {children}
    </NewCharacterContext.Provider>
  );
};

export const NewChar = () => {
  return useContext(NewCharacterContext);
}