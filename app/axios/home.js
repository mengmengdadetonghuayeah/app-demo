import { get } from "../service/utils";
// 获取轮播图
export async function getCarouselList(params) {
  const url = `ui/info/list/content/${params.parent}/${params.language}?sort=${
    params.orderBy
  }`;
  const rs = await get(url);
  return rs || {};
}
// getCarsouel = async () => {
//   const params = {
//       parent: 'carousel',
//       language: this.lang,
//       orderBy: 'orderBy'
//   }
//   const res = await getCarouselList(params);
//   const { status, data } = res;
//   if(status == 200){
//       data.content.forEach((item, index) => {
//           this.img.push({
//               url: item.url
//           })
//       })
//       this.forceUpdate()
//   }
// }
