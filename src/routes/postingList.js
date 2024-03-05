import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import PostingLink from '../components/PostingLink';

import { ENDPOINT, fetcher } from '../utils/helpers';

const PAGE_SIZE = 20;

function PostingList() {
  const [key, setKey] = useState('');
  const { data, size, setSize, isLoading, error } =
    useSWRInfinite(
      (index) =>
        `${ENDPOINT}/topics/?page=${
          index + 1
        }&limit=${PAGE_SIZE}&tab=${key}`,
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
    content = (
      <div className=''>Oops,something wrong...</div>
    );
  }

  if (data) {
    let list = [];
    const formatData = (result) => {
      result.forEach((item) => {
        list = list.concat(item.data);
      });
    };
    formatData(data);

    content = (
      <ul>
        {list.map((item) => (
          <PostingLink
            key={item.id}
            avatar={item.author.avatar_url}
            replyCount={item.reply_count}
            visitCount={item.visit_count}
            tab={item.tab}
            title={item.title}
            postingId={item.id}
            lastReplyTime={item.last_reply_at}
          />
        ))}
      </ul>
    );
  }

  const handleChangeKey = (param) => {
    if (key === param) {
      return;
    }

    setKey(param);
  };

  useEffect(() => {
    const handleScrollFetch = () => {
      if (
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
        document.documentElement.scrollHeight
      ) {
        setSize(size + 1);
      }
    };
    document.addEventListener('scroll', handleScrollFetch);

    return () => {
      document.removeEventListener(
        'scroll',
        handleScrollFetch
      );
    };
  }, [size, setSize]);

  return (
    <div className='max-w-6xl h-full card bg-base-100 mx-auto p-5'>
      <ul
        role='tablist'
        className='tabs tabs-bordered mb-4'
      >
        <li
          role='tab'
          className={key === '' ? 'tab tab-active' : 'tab'}
          onClick={() => handleChangeKey('')}
        >
          全部
        </li>
        <li
          role='tab'
          className={
            key === 'good' ? 'tab tab-active' : 'tab'
          }
          onClick={() => handleChangeKey('good')}
        >
          精华
        </li>
        <li
          role='tab'
          className={
            key === 'share' ? 'tab tab-active' : 'tab'
          }
          onClick={() => handleChangeKey('share')}
        >
          分享
        </li>
        <li
          role='tab'
          className={
            key === 'ask' ? 'tab tab-active' : 'tab'
          }
          onClick={() => handleChangeKey('ask')}
        >
          问答
        </li>
        <li
          role='tab'
          className={
            key === 'job' ? 'tab tab-active' : 'tab'
          }
          onClick={() => handleChangeKey('job')}
        >
          工作
        </li>
      </ul>

      {content}
    </div>
  );
}

export default PostingList;
