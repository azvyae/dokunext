import { EssentialPostmanAPIResponse, PostmanItemsApi } from '@/app/postman/[collections]/types';
import { Environment } from '@/store/types';

function mapItem(items: PostmanItemsApi[], level: number = 0): any {
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

function extractData(collection: EssentialPostmanAPIResponse, environments: Environment[], activeEnv: string) {
  let infoText = collection.info;
  let itemText = collection.item;
  let authText = collection.auth;
  collection.variable?.forEach((variable) => {
    infoText = infoText.replaceAll(`{{${variable.key}}}`, variable.value);

    itemText = itemText.replaceAll(`{{${variable.key}}}`, variable.value);

    if (authText) {
      authText = authText.replaceAll(`{{${variable.key}}}`, variable.value);
    }
  });

  collection.globals.forEach((variable) => {
    infoText =
      variable.type === 'secret'
        ? infoText.replaceAll(`{{${variable.key}}}`, '***')
        : infoText.replaceAll(`{{${variable.key}}}`, variable.value);
    itemText =
      variable.type === 'secret'
        ? itemText.replaceAll(`{{${variable.key}}}`, '***')
        : itemText.replaceAll(`{{${variable.key}}}`, variable.value);
    if (authText) {
      authText =
        variable.type === 'secret'
          ? authText.replaceAll(`{{${variable.key}}}`, '***')
          : authText.replaceAll(`{{${variable.key}}}`, variable.value);
    }
  });

  environments[parseInt(activeEnv) - 1]?.values.forEach((variable) => {
    infoText =
      variable.type === 'secret'
        ? infoText.replaceAll(`{{${variable.key}}}`, '***')
        : infoText.replaceAll(`{{${variable.key}}}`, variable.value);
    itemText =
      variable.type === 'secret'
        ? itemText.replaceAll(`{{${variable.key}}}`, '***')
        : itemText.replaceAll(`{{${variable.key}}}`, variable.value);
    if (authText) {
      authText =
        variable.type === 'secret'
          ? authText.replaceAll(`{{${variable.key}}}`, '***')
          : authText.replaceAll(`{{${variable.key}}}`, variable.value);
    }
  });

  const { info, item, auth } = {
    info: JSON.parse(infoText),
    item: JSON.parse(itemText),
    auth: JSON.parse(authText ?? '{}')
  };
  return { info, item, auth };
}

async function getCollection(token: string | null, collection: string) {
  const res = await fetch(
    `/postman/api?` +
    new URLSearchParams({
      collection: collection
    }),
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return res;
}

export {extractData, mapItem, getCollection}