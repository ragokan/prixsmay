import faker from "faker"
import { ITestUser } from "./types/TestUserType"

export const CreateFakeUser = (): ITestUser => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
})
