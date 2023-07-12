import {
  ApiRequest,
  Url
} from '@/components/PostmanInterpreter/PostmanInterpreter.types';

function isArrayEmpty(value?: any[]) {
  if (!value) {
    return true;
  }
  return value.length === 0;
}

function generateCurlCommand(request: ApiRequest): string {
  let curlCommand = 'curl --location ';

  // Method
  curlCommand += `--request ${request.method.toUpperCase()} `;

  // Headers
  if (request.header) {
    request.header.forEach((header) => {
      if (header.type === 'text') {
        curlCommand += `--header '${header.key}: ${header.value}' `;
      }
    });
  }

  // Body
  if (request.body) {
    if (request.body.mode === 'formdata' && request.body.formdata) {
      request.body.formdata.forEach((param: any) => {
        curlCommand += `--form '${param.key}=${param.value}' `;
      });
    } else if (request.body.mode === 'graphql' && request.body.graphql) {
      const graphql = JSON.stringify(request.body.graphql);
      curlCommand += `--data '${graphql.replace(/'/g, "'\\''")}' `;
    } else if (request.body.mode === 'urlencoded' && request.body.urlencoded) {
      request.body.urlencoded.forEach((param: any) => {
        curlCommand += `--data-urlencode '${param.key}=${param.value}' `;
      });
    } else {
      curlCommand += `--data '${request.body.raw.replace(/'/g, "'\\''")}' `;
    }
  }

  // URL
  const url = generateURL(request.url);
  if (url.includes('{{')) {
    curlCommand += '--globoff ';
  }
  curlCommand = curlCommand.replace('--location', `--location '${url}'`);

  return '```bash\n' + curlCommand + '\n```';
}

function generateURL(url: Url): string {
  let generatedURL = '';

  if (url.protocol) {
    generatedURL += url.protocol + '://';
  }

  if (url.host) {
    generatedURL += url.host.join('.') + '/';
  }

  if (url.path) {
    generatedURL += url.path.join('/') + '/';
  }

  if (url.query) {
    url.query.forEach((query) => {
      generatedURL += '?' + query.key + '=' + query.value + '&';
    });
    generatedURL = generatedURL.slice(0, -1);
  }

  return generatedURL;
}

export { isArrayEmpty, generateCurlCommand };
