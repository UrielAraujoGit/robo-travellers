import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { GEMINI_MODEL } from "./creative-model.ts";
import type { RAGState } from "./state.ts";

const promptStory = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a science fiction writer with scientific rigor. Write the story of the
described robot's mission, in first person, as its travel log. Write in English.

SCIENCE RULES
- Use the real data from the context and turn it into concrete experiences:
  the orbital period is the length of a year there; the temperature is what its
  sensors register; radius and mass suggest the gravity and whether the planet is
  rocky or gaseous; the distance from Earth determines how long the journey took and
  the delay of its messages home (1 parsec = 3.26 light-years).
- If the planet is likely gaseous, the robot cannot land: it explores from orbit
  or with probes.
- If a value says "no data", the robot couldn't measure it: turn that gap into part
  of the plot (a failing sensor, an unsolved mystery). Never make up numbers.

CHARACTER RULES
- Show its personality through actions, not descriptions. Its likes, hobbies and
  dislikes must appear in concrete situations.
- Include at least two anecdotes: one during the journey and one while exploring
  the planet.
- Its personal goal must advance, be fulfilled, or change by the end.

FORMAT: a title and between 500 and 700 words.`,
  ],
  ["human", "Planet data:\n{context}\n\nRobot profile:\n{robot}"],
]);

export const storyChain = promptStory
  .pipe(GEMINI_MODEL)
  .pipe(new StringOutputParser());

export async function createStory(state: typeof RAGState.State) {
  const story = await storyChain.invoke({
    context: state.context,
    robot: JSON.stringify(state.robot, null, 2),
  });
  return { story };
}
