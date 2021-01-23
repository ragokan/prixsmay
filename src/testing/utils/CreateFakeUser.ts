import faker from "faker";
import { TestUserType } from "./types/TestUserType";

export const CreateFakeUser = (): TestUserType => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});
