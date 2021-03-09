import { NextFunction } from "express"
import { Community } from "../../database"
import Async from "../../middleware/Async"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { ICommunityResponse } from "../../types/ResponseTypes"
import { InlineType } from "../../utils/InlineType"

interface ReqBody extends RequestContext {
  params: { id: string }
}

export const DeleteCommunityFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const id = parseInt(req.params.id)

  await Community.delete({
    where: { id },
  })

  res.status(200).json(
    InlineType<ICommunityResponse>({ message: "Community is deleted successfully!", success: true })
  )
})
