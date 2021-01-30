import faker from "faker";
import { ITestUser } from "./types/ITestUser";

export const CreateFakeUser = (): ITestUser => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});
