import { PostmanItemsApi } from '@/app/postman/[collections]/types';

export function mapItem(items: PostmanItemsApi[], level: number = 0): any {
  return items.map((item, index) => {
    // is folder
    if (item.item) {
      return {
        name: item.name,
        url: `#${level}_${index}_${encodeURIComponent(
          item.name.replaceAll('/', '_').replaceAll(/\s/gm, '_')
        )}`,
        items: mapItem(item.item, level + 1)
      };
    }
    // is request
    return {
      name: item.name,
      url: `#${level}_${index}_${encodeURIComponent(
        item.name.replaceAll('/', '_').replaceAll(/\s/gm, '_')
      )}`,
      method: item.request?.method
    };
  });
}