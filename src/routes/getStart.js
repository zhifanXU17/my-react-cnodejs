import { useState, useRef } from 'react';

import Modal from '../components/Modal';

function GetStart() {
  const [isShow, setIsShow] = useState(false);
  const linkRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    linkRef.current = e.target.href;
    setIsShow(true);
  };

  const handleVisit = () => {
    window.open(linkRef.current, '_blank');

    setIsShow(false);
  };

  return (
    <>
      {isShow && (
        <Modal
          title='即将离开本站'
          handleDismiss={() => setIsShow(false)}
        >
          <p>您即将离开本站，请注意您的账号和财产安全。</p>
          <p>{linkRef.current}</p>
          <button
            className='self-end w-fit btn btn-outline'
            onClick={handleVisit}
          >
            继续访问
          </button>
        </Modal>
      )}

      <section className='max-w-6xl h-full rounded-2xl bg-base-100 mx-auto'>
        <div className='card-body'>
          <h2 className='card-title'>Node.js 入门</h2>
          <h4>《汇智网 Node.js 课程》</h4>
          <a
            className='link'
            href='http://www.hubwiz.com/course/?type=nodes'
            target='_blank'
            rel='noreferrer'
            onClick={handleClick}
          >
            http://www.hubwiz.com/course/?type=nodes
          </a>
          <h4>《快速搭建 Node.js 开发环境以及加速 npm》</h4>
          <a
            className='link'
            href='http://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html'
            target='_blank'
            rel='noreferrer'
            onClick={handleClick}
          >
            http://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html
          </a>
          <h4>《Node.js 包教不包会》</h4>
          <a
            className='link'
            href='https://github.com/alsotang/node-lessons'
            target='_blank'
            rel='noreferrer'
            onClick={handleClick}
          >
            https://github.com/alsotang/node-lessons
          </a>
          <h4>《ECMAScript 6入门》</h4>
          <a
            className='link'
            href='http://es6.ruanyifeng.com/'
            target='_blank'
            rel='noreferrer'
            onClick={handleClick}
          >
            http://es6.ruanyifeng.com/
          </a>
          <h4>《七天学会NodeJS》</h4>
          <a
            className='link'
            href='https://github.com/nqdeng/7-days-nodejs'
            target='_blank'
            rel='noreferrer'
            onClick={handleClick}
          >
            https://github.com/nqdeng/7-days-nodejs
          </a>
          <h4>《Node入门-一本全面的Node.js教程》</h4>
          <a
            className='link'
            href='http://www.nodebeginner.org/index-zh-cn.html'
            target='_blank'
            rel='noreferrer'
            onClick={handleClick}
          >
            http://www.nodebeginner.org/index-zh-cn.html
          </a>
        </div>
      </section>
    </>
  );
}

export default GetStart;
