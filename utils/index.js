import Cheerio from 'cheerio';

export const loadList = (res) => {
  const $ = Cheerio.load(res)
  const arr = []
  $(".manga-i-list").find(".manga-i-list-item").each((index, item) => {
    const obj = {}
    for (let mItem of item.children) {
      if (mItem.name == "a") {
        obj.url = mItem.attribs["href"]
        obj.imageUrl = mItem.children[0].attribs["src"]
      }

      if (mItem.name == "p") {
        if (mItem.attribs["class"] === "manga-i-list-title") {
          obj.name = mItem.children[0].data
        }
        break
      }
    }
    arr.push(obj)
  })

  return arr
}

export const loadInfo = (res) => {
  const $ = Cheerio.load(res)

  /* 海报 */
  const imageUrl = $(".detail-main-top-cover-img")[0].attribs["src"]

  /* 漫画名 */
  const title = $(".detail-main-top-info-title")[0].children[0].data

  /* 作者 */
  const author = $(".detail-main-top-info-author-item")[0].children[0].data

  /* 类型标签*/
  const types = []
  $(".detail-main-top-info-class-item").each((index, item) => {
    types.push(item.children[0].data)
  })

  /* 详情 */
  const detail = $("#long")[0].children[0].data

  /* 状态 */
  const status = $(".detail-list-left")[0].children[0].data

  /* 页数 */
  const pages = []
  $(".detail-list-item").each((index, item) => {
    const url = item.children[0].attribs["href"]
    const pageNum = item.children[0].children[0].data.trim()
    pages.push({
      pageNum,
      url
    })
  })

  /* 推荐 */
  const recommendList = []
  $(".manga-i-list").find(".manga-i-list-item").each((index, item) => {
    const obj = {}
    for (let childrenItem of item.children) {
      if (childrenItem?.name === "a") {
        obj.url = childrenItem.attribs["href"]
        obj.imageUrl = childrenItem.children[0].attribs["src"]
      }

      if (childrenItem?.name === "p" && childrenItem.attribs["class"] === "manga-i-list-title") {
        obj.name = childrenItem.children[0].data
      }
    }
    recommendList.push(obj)
  })

  return {
    title,
    author,
    imageUrl,
    types,
    detail,
    status,
    pages,
    recommendList
  }
}

export const loadImage = async (data) => {}