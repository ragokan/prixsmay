export const Paginate = <T>(array: T[], limit: number, page: number): T[] =>
  array.slice((page - 1) * limit, page * limit)
