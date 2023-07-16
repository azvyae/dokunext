import { EssentialPostmanAPIResponse } from '@/app/postman/[collections]/types';
import { Environment } from '@/store/types';

export function extractData(collection: EssentialPostmanAPIResponse, environments: Environment[], activeEnv: string) {
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