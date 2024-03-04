import { useState } from 'react';
import useSWR from 'swr';

import PostingLink from '../components/PostingLink';

const ENTPOINT = 'https://cnodejs.org/api/v1/topics';

async function fetcher(endpoint) {
  const response = await fetch(endpoint);
  const json = await response.json();

  return json;
}

function PostingList() {
  const [key, setKey] = useState('');
  let content = null;

  let endpoint = '';
  if (key === '') {
    endpoint = `${ENTPOINT}?limit=20`;
  } else {
    endpoint = `${ENTPOINT}?limit=20&tab=${key}`;
  }
  const { data, isLoading, error } = useSWR(
    endpoint,
    fetcher
  );

  console.log(data);

  const handleChangeKey = (param) => {
    if (key === param) {
      return;
    }

    setKey(param);
  };

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
    content = (
      <ul>
        {data.data.map((item) => (
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

  return (
    <div className='max-w-4xl mx-auto p-5 shadow-xl'>
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
