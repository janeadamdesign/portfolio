// Package Imports
 import React, { useState, useEffect } from "react";

interface ProficiencyCellProps {
  proficiencies: string[];
  proficiencySelector: number;
}

export default function ProficiencyCell(
  props: ProficiencyCellProps
): React.ReactElement {
  const {
    proficiencies,
    proficiencySelector,
  }: { proficiencies: string[]; proficiencySelector: number } = props;
  const [proficientParas, setProficientParas]: [
    JSX.Element[],
    React.Dispatch<React.SetStateAction<JSX.Element[]>>
  ] = useState<JSX.Element[]>([]);
  const generateProficienciesParas = (
    proficiencies: string[]
  ): JSX.Element[] => {
    return proficiencies.map(
      (proficiency: string, index: number): JSX.Element => {
        return (
          <p
            key={index}
            className="welcome-subtitle canela text-limit canela-1"
          >
            {proficiency}
          </p>
        );
      }
    );
  };
  useEffect((): void => {
    setProficientParas(generateProficienciesParas(proficiencies));
  }, [proficiencies]);
  const [selectedPara, setSelectedPara]: [
    JSX.Element,
    React.Dispatch<React.SetStateAction<JSX.Element>>
  ] = useState<JSX.Element>(<></>);

  useEffect((): void => {
    setSelectedPara(proficientParas[proficiencySelector]);
  }, [proficientParas, proficiencySelector]);

  return (
    <div className="text-container flex-center flex-column fade-item">
      {selectedPara}
    </div>
  );
}
