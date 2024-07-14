import { Container, SimpleGrid } from "@mantine/core";
import { blocks } from "./data/blocks";
import { sequences } from "./data/sequences";

const CorsiBlocks = () => {
  return (
    <Container fluid>
      <SimpleGrid cols={5} spacing="xl" verticalSpacing="xl">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={
              block.active ? "block-container" : "block-container-hidden"
            }
          >
            {block.id}
          </div>
        ))}
        <button className="button-container">Done</button>
      </SimpleGrid>
    </Container>
  );
};

export default CorsiBlocks;
