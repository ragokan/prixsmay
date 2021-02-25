import faker from "faker";
import { ITestPost } from "./types/TestPostType";

export const CreateFakePost = (): ITestPost => ({
  title: faker.lorem.words(3),
  content: faker.lorem.word(8),
});
