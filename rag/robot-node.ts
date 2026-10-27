import { ChatPromptTemplate } from "@langchain/core/prompts";
import { GEMINI_MODEL } from "./creative-model.ts";
import { RAGState, RobotSchema } from "./state.ts";

const promptRobot = ChatPromptTemplate.fromMessages([
  [
    "system",
    `Invent an original, memorable explorer robot that will be sent to the planet described.
Its personality should create an interesting contrast or affinity with that planet
(for example, a robot that hates heat sent to a scorching world, or one that collects
sunrises sent to a planet where a year lasts only a few days).
Avoid clichés like "the robot who wants to be human".
Write all fields in English.`,
  ],
  ["human", "Destination planet data:\n{context}"],
]);

export const robotChain = promptRobot.pipe(
  GEMINI_MODEL.withStructuredOutput(RobotSchema, { name: "create_robot" }),
);

export async function createRobot(state: typeof RAGState.State) {
  const robot = await robotChain.invoke({ context: state.context });
  return { robot };
}
