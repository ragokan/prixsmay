import { Paginate } from "../../../utils/PaginateFunction"

export const PaginatePosts = <T>(allPosts: T[], limit?: number, page?: number): T[] => {
  const sortedPosts = allPosts.sort(
    (a: any, b: any) =>
      b.votes.reduce((prev: any, current: any) => prev + (current.type === "up" ? 1 : -1), 0) +
      b.comments.length -
      a.votes.reduce((prev: any, current: any) => prev + (current.type === "up" ? 1 : -1), 0) +
      a.comments.length
  )

  return Paginate<T>(sortedPosts as any, limit || 10, page || 1)
}
