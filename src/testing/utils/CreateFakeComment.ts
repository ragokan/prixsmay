import faker from "faker"
import { ITestComment } from "./types/TestCommentType"

export const CreateFakeComment = (): ITestComment => ({
  text: faker.lorem.words(5),
})
