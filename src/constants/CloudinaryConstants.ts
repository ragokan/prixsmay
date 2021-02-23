import { FindImageName } from "../utils/FindImageNameRegex"

export const defaultUserPictureUrl: string[] = [
  "https://res.cloudinary.com/ragokan/image/upload/v1612791907/user_kkhvsb.png",
  "https://res.cloudinary.com/ragokan/image/upload/v1614075129/256_16_zskznd.png",
  "https://res.cloudinary.com/ragokan/image/upload/v1614075129/256_14_mbgmp7.png",
  "https://res.cloudinary.com/ragokan/image/upload/v1614075129/256_15_wmwu4e.png",
  "https://res.cloudinary.com/ragokan/image/upload/v1614075128/256_10_jmq8ne.png",
  "https://res.cloudinary.com/ragokan/image/upload/v1614075128/256_12_hnwsjo.png",
  "https://res.cloudinary.com/ragokan/image/upload/v1614075128/256_9_ba7ipk.png",
  "https://res.cloudinary.com/ragokan/image/upload/v1614075128/256_1_fcrjxb.png",
  "https://res.cloudinary.com/ragokan/image/upload/v1614075128/256_5_hjdyix.png",
  "https://res.cloudinary.com/ragokan/image/upload/v1614075128/256_7_dflaty.png",
]

export const defaultUserPictureConstants: string[] = defaultUserPictureUrl.map((item) => FindImageName(item))
