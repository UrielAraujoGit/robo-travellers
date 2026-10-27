import { Annotation } from "@langchain/langgraph";
import { z } from "zod";

export const RobotSchema = z.object({
  robot_name: z.string().describe("The robot's name"),
  robot_model: z.string().describe("Technical designation, e.g. EXR-7"),
  personality: z.string().describe("2 or 3 strong character traits"),
  likes: z.array(z.string()).describe("3 things it loves"),
  hobbies: z.array(z.string()).describe("2 or 3 hobbies"),
  dislikes: z.array(z.string()).describe("3 things it can't stand"),
  objective: z
    .string()
    .describe("Its personal goal, beyond the scientific mission"),
});

export type Robot = z.infer<typeof RobotSchema>;

export const RAGState = Annotation.Root({
  planet: Annotation<string>,
  context: Annotation<string>,
  robot: Annotation<Robot>,
  story: Annotation<string>,
});
