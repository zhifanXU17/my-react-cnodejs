import * as DOMPurify from 'dompurify';

export const ENDPOINT = 'https://cnodejs.org/api/v1/';

export async function fetcher(endpoint) {
  const response = await fetch(endpoint);

  if (response.ok === false) {
    const error = new Error('获取数据失败');
    error.info = response.statusText;
    error.status = response.status;

    throw error;
  }

  return response.json();
}

export function renderMarkdownToHTML(markdown) {
  const renderedHTML = DOMPurify.sanitize(markdown);

  return {
    __html: renderedHTML,
  };
}
