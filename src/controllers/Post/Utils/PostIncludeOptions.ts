export const postIncludeOptions = {
  author: { select: { email: true, name: true, id: true } },
  votes: { select: { id: true, type: true, userId: true } },
  comments: true,
}
