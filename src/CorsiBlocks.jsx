import { useState, useEffect } from "react";
import { Container, SimpleGrid } from "@mantine/core";
import { saveAs } from "file-saver";
import { useGlobalContext } from "./GlobalProvider";

import { blocks } from "./data/blocks";
import { sequences } from "./data/sequences";

const CorsiBlocks = () => {
  const { participantId, setParticipantId } = useGlobalContext();
  const numOfSequences = sequences.length;
  const [activeSequenceIndex, setActiveSequenceIndex] = useState(0);
  const [activeSequence, setActiveSequence] = useState([]);
  const [sequenceIndex, setSequenceIndex] = useState(-1);
  const [userSequence, setUserSequence] = useState([]);
  const [isSequenceActive, setIsSequenceActive] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [rerunSequence, setRerunSequence] = useState(false);
  const [selectionsRecord, setSelectionsRecord] = useState([]);
  const [correctReplications, setCorrectReplications] = useState(1);

  useEffect(() => {
    setActiveSequence(sequences[activeSequenceIndex]);
    setSequenceIndex(-1);
    setUserSequence([]);
    setIsSequenceActive(true);
  }, [activeSequenceIndex]);

  useEffect(() => {
    if (activeSequence.length === 0) return;

    let currentSeqIndex = 0;

    const interval = setInterval(() => {
      setSequenceIndex(activeSequence[currentSeqIndex]);
      currentSeqIndex++;

      if (currentSeqIndex >= activeSequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          setSequenceIndex(-1);
          setIsSequenceActive(false);
        }, 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSequence, rerunSequence]);

  const handleBlockClick = (id) => {
    if (isSequenceActive) return;

    setUserSequence((prev) => [...prev, id]);
  };

  const handleClick = () => {
    const isCorrect = userSequence.every(
      (id, index) => id === activeSequence[index]
    );
    console.log(isCorrect ? "Correct sequence!" : "Incorrect sequence.");

    setSelectionsRecord((prev) => [
      ...prev,
      {
        shownSequence: [...activeSequence],
        userSequence: [...userSequence],
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setAttempts(0);
      setCorrectReplications((prev) => prev + 1);
      setActiveSequenceIndex((prev) => (prev + 1) % numOfSequences);
    } else {
      setAttempts((prev) => prev + 1);
      if (attempts + 1 >= 2) {
        console.log("Program stopped. Too many incorrect attempts.");
        console.log(`Correctly replicated sequences: ${correctReplications}`);
        handleDownload();
        setParticipantId("");
        return;
      }

      setRerunSequence((prev) => !prev);
      setSequenceIndex(-1);
      setIsSequenceActive(true);
    }
    setUserSequence([]);
  };

  const handleDownload = () => {
    const content = `
      Participant ID: ${participantId}
      
      Corsi Span: ${correctReplications}

      Selections Record:
      ${JSON.stringify(selectionsRecord, null, 2)}
    `;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${participantId}.txt`);
  };

  return (
    <Container fluid>
      <SimpleGrid cols={5} spacing="xl" verticalSpacing="xl">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`${
              block.active ? "block-container" : "block-container-hidden"
            } ${block.id === sequenceIndex ? "block-container-active" : ""}`}
            onClick={() => handleBlockClick(block.id)}
          >
            {block.id}
          </div>
        ))}
        <button className="button-container" onClick={handleClick}>
          Done
        </button>
      </SimpleGrid>
    </Container>
  );
};

export default CorsiBlocks;
