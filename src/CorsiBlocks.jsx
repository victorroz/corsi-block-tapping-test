import { useState, useEffect } from "react";
import { Container, SimpleGrid, Center, Button } from "@mantine/core";
import { saveAs } from "file-saver";
import useSound from "use-sound";
import { useGlobalContext } from "./GlobalProvider";

import { blocks } from "./data/blocks";
import { sequences } from "./data/sequences";
import go from "./go.mp3";
import Completion from "./Completion";

const CorsiBlocks = () => {
  const { participantId, setParticipantId } = useGlobalContext();
  const [play] = useSound(go);

  const numOfSequences = sequences.length;
  const [activeSequenceIndex, setActiveSequenceIndex] = useState(0);
  const [activeSequence, setActiveSequence] = useState([]);
  const [sequenceIndex, setSequenceIndex] = useState(-1);
  const [userSequence, setUserSequence] = useState([]);
  const [isSequenceActive, setIsSequenceActive] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [rerunSequence, setRerunSequence] = useState(false);
  const [reverseSequence, setReverseSequence] = useState(false);
  const [selectionsRecord, setSelectionsRecord] = useState([]);
  const [correctReplications, setCorrectReplications] = useState(0);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  // Update activeSequence when index, reverse flag, or rerun changes
  useEffect(() => {
    let seq = sequences[activeSequenceIndex] || [];
    if (reverseSequence) {
      seq = [...seq].reverse();
    }
    setActiveSequence(seq);
    setSequenceIndex(-1);
    setUserSequence([]);
    setIsSequenceActive(true);
  }, [activeSequenceIndex, reverseSequence, rerunSequence]);

  // Display sequence blocks, then play sound when finished
  useEffect(() => {
    if (!isSequenceActive || activeSequence.length === 0) return;

    let idx = 0;
    const interval = setInterval(() => {
      setSequenceIndex(activeSequence[idx]);
      idx++;
      if (idx >= activeSequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          setSequenceIndex(-1);
          setIsSequenceActive(false);
          // Signal user turn
          play();
        }, 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSequence, isSequenceActive, play]);

  const handleBlockClick = (id) => {
    if (isSequenceActive) return;
    if (userSequence.length >= activeSequence.length) return;
    setUserSequence((prev) => [...prev, id]);
  };

  const handleDownload = () => {
    const content = `Participant ID: ${participantId}\n\nCorsi Span: ${
      correctReplications + 1
    }\n\nSelections Record:\n${JSON.stringify(selectionsRecord, null, 2)}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${participantId}.txt`);
    setHasDownloaded(true);
  };

  const handleClick = () => {
    const isCorrect =
      userSequence.length === activeSequence.length &&
      userSequence.every((id, idx) => id === activeSequence[idx]);

    setSelectionsRecord((prev) => [
      ...prev,
      {
        shownSequence: [...activeSequence],
        userSequence: [...userSequence],
        isCorrect,
        attempt: attempts + 1,
      },
    ]);

    if (isCorrect) {
      setAttempts(0);
      setReverseSequence(false);
      setCorrectReplications((prev) => prev + 1);
      setActiveSequenceIndex((prev) => (prev + 1) % numOfSequences);
    } else {
      setAttempts((prev) => {
        const next = prev + 1;
        if (next === 1) {
          setReverseSequence(true);
          setRerunSequence((r) => !r);
        } else if (next >= 2) {
          handleDownload();
          setParticipantId("");
        }
        return next;
      });
    }

    setUserSequence([]);
  };

  if (hasDownloaded) {
    return <Completion />;
  }

  return (
    <Container fluid>
      <SimpleGrid cols={5} spacing="xl" verticalSpacing="xl">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={[
              block.active ? "block-container" : "block-container-hidden",
              block.id === sequenceIndex ? "block-container-active" : null,
              userSequence.includes(block.id) ? "block-container-active" : null,
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => block.active && handleBlockClick(block.id)}
          >
            {block.id}
          </div>
        ))}
      </SimpleGrid>
      <Center mt={100}>
        <Button
          onClick={handleClick}
          disabled={userSequence.length !== activeSequence.length}
        >
          Done
        </Button>
      </Center>
    </Container>
  );
};

export default CorsiBlocks;
