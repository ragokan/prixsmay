import { Prisma } from "@prisma/client"
import { userSelectOptions } from "../../../User/Utils/UserIncludeOptions"

// What a dirty code, right?
// At the time I am doing this, there are no way to handle multiple nested includes in CommentToComment
// If you know any better way, please do help!

const commentInCommentInclude: Prisma.CommentInclude = {
  votes: true,
  user: { select: userSelectOptions },
  comments: true,
}
export const commentIncludeOptions: Prisma.CommentInclude = {
  ...commentInCommentInclude,
  comments: {
    include: {
      ...commentInCommentInclude,
      comments: {
        include: {
          ...commentInCommentInclude,
          comments: {
            include: {
              ...commentInCommentInclude,
              comments: {
                include: {
                  ...commentInCommentInclude,
                  comments: {
                    include: {
                      ...commentInCommentInclude,
                      comments: {
                        include: { ...commentInCommentInclude, comments: { include: { ...commentInCommentInclude } } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
