import { Link } from 'react-router-dom';

import * as dayjs from 'dayjs';

function PostingLink({
  avatar,
  replyCount,
  visitCount,
  tab,
  title,
  postingId,
  lastReplyTime,
}) {
  let tag;

  if (tab === 'share') {
    tag = (
      <div className='badge badge-success text-white text-xs'>
        分享
      </div>
    );
  } else if (tab === 'job') {
    tag = (
      <div className='badge badge-primary text-white text-xs'>
        招聘
      </div>
    );
  } else if (tab === 'ask') {
    tag = (
      <div className='badge badge-info text-white text-xs'>
        问答
      </div>
    );
  }

  const timeTag = dayjs(lastReplyTime).fromNow();

  return (
    <li className='p-2.5 flex items-center justify-between gap-6'>
      <img
        alt=''
        src={avatar}
        className='w-12 h-12 rounded-full'
      />

      <div className='w-24 text-center'>
        <em className='text-base text-violet-800'>
          {replyCount}
        </em>
        /<em className='text-gray-400'>{visitCount}</em>
      </div>

      {tag}

      <Link
        className='text-link hover:text-blue-400 flex-1 line-clamp-1'
        to={`/posting/${postingId}`}
      >
        {title}
      </Link>

      <span className='text-gray-400'>{timeTag}</span>
    </li>
  );
}

export default PostingLink;
