export const FindImageName = (url: string) => {
  const foundImageName = url.match(/upload\/(?:v\d+\/)?([^\.]+)/)?.find((_, i) => i === 1)
  return foundImageName || ""
}
