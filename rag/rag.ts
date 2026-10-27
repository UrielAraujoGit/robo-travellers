import { END, START, StateGraph } from "@langchain/langgraph";
import { createRobot } from "./robot-node.ts";
import { createStory } from "./story-node.ts";
import { RAGState } from "./state.ts";

async function retrieve(state: typeof RAGState.State) {
  return { context: state.planet };
}

export const rag = new StateGraph(RAGState)
  .addNode("retrieve", retrieve)
  .addNode("createRobot", createRobot)
  .addNode("createStory", createStory)
  .addEdge(START, "retrieve")
  .addConditionalEdges("retrieve", (s) => (s.context ? "createRobot" : END))
  .addEdge("createRobot", "createStory")
  .addEdge("createStory", END)
  .compile();
