import useSWR from 'swr';
import {
  ENDPOINT,
  fetcher,
  renderMarkdownToHTML,
} from '../utils/helpers';
import { useParams } from 'react-router-dom';

import ReplyList from '../components/ReplyList';

import * as dayjs from 'dayjs';

function Posting() {
  const { postingId } = useParams();
  const { data, isLoading, error } = useSWR(
    `${ENDPOINT}/topic/${postingId}`,
    fetcher
  );

  let content;

  if (isLoading) {
    content = (
      <div className='flex flex-col gap-4'>
        <div className='skeleton h-8 w-full'></div>
        <div className='skeleton h-8 w-full'></div>
        <div className='skeleton h-8 w-full'></div>
        <div className='skeleton h-8 w-full'></div>
      </div>
    );
  }

  if (error) {
    console.log(error);
    content = (
      <div
        role='alert'
        className='alert alert-error flex items-start'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='stroke-current shrink-0 h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <div className='flex flex-col  gap-4'>
          <span>Oops! 帖子加载失败！</span>
          <div>
            <span>{error.status}</span>
            <span>原因：{error.info}</span>
          </div>
        </div>
      </div>
    );
  }

  if (data) {
    const postingDetail = data.data;

    console.log(postingDetail);

    content = (
      <article className='max-w-4xl mx-auto p-5 shadow-xl'>
        <header className='border-b border-b-gray-300 pb-6'>
          <h2 className='text-2xl font-bold mb-2'>
            {postingDetail.title}
          </h2>
          <div className='flex gap-2 text-xs text-gray-400'>
            <span>
              {dayjs(postingDetail.create_at).fromNow()}
            </span>
            •<span>作者:</span>
            <span className='text-link hover:text-blue-400 hover:cursor-pointer'>
              {postingDetail.author.loginname}
            </span>
            •<span>{postingDetail.visit_count}次浏览</span>{' '}
            •<span>来自:</span>
            <span>分享</span>
          </div>
        </header>

        <section className='py-6'>
          <div
            dangerouslySetInnerHTML={renderMarkdownToHTML(
              postingDetail.content
            )}
          />
          {/* <Markdown rehypePlugins={rehypeRaw}>
            {postingDetail.content}
          </Markdown> */}
        </section>

        <ReplyList
          replies={postingDetail.replies}
          replyCount={postingDetail.reply_count}
        />
      </article>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-5'>{content}</div>
  );
}

export default Posting;
