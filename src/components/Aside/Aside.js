import { ENDPOINT, fetcher } from '../../utils/helpers';
import useSWR from 'swr';

import AuthorCard from '../AuthorCard';

function Aside({ loginName }) {
  const { data, error, isLoading } = useSWR(
    `${ENDPOINT}/user/${loginName}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const author = data.data;

  return (
    <aside className='flex flex-col gap-4'>
      <AuthorCard
        avatarUrl={author.avatar_url}
        loginName={author.loginname}
        score={author.score}
        githubUsername={author.githubUsername}
        createAt={author.create_at}
      />

      <div className='card w-80 bg-base-100'>
        <div className='card-body'>
          <h2 className='card-title'>最近创建的话题</h2>
          <ul>
            {author.recent_topics.map((topic) => (
              <li key={topic.id}>
                <a
                  className='link link-accent line-clamp-1 mt-2'
                  href={topic.id}
                >
                  {topic.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='card w-80 bg-base-100'>
        <div className='card-body'>
          <h2 className='card-title'>最近参与的话题</h2>
          <ul>
            {author.recent_replies.map((topic) => (
              <li key={topic.id}>
                <a
                  className='link link-accent line-clamp-1 mt-2'
                  href={topic.id}
                >
                  {topic.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
