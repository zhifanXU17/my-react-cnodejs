import * as dayjs from 'dayjs';

function AuthorCard({
  avatarUrl,
  loginName,
  score,
  githubUsername,
  createAt,
}) {
  return (
    <div className='card w-80 p-5 flex flex-col gap-2 bg-base-100'>
      <div className='flex gap-4 items-center'>
        <img
          src={avatarUrl}
          alt='avatar_url'
          className='w-12 h-12'
        />
        <span className='text-link hover:text-blue-400 hover:cursor-pointer'>
          {loginName}
        </span>
      </div>

      <span>
        积分：<span>{score}</span>
      </span>
      <span>
        Github：
        <a
          className='link link-accent'
          href={`https://github.com/${githubUsername}`}
        >
          {githubUsername}
        </a>
      </span>
      <span>
        注册时间：
        <span>{dayjs(createAt).fromNow()}</span>
      </span>
    </div>
  );
}

export default AuthorCard;
