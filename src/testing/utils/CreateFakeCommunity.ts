import faker from "faker"
import { ITestCommunity } from "./types/TestCommunityType"

export const CreateFakeCommunity = (): ITestCommunity => ({
  name: faker.lorem.words(3),
  description: faker.lorem.word(8),
})
