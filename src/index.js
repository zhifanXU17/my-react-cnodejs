import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Root from './routes/root';
import PostingList from './routes/postingList';
import Posting from './routes/posting';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <PostingList />,
      },
      {
        path: 'posting/:postingId',
        element: <Posting />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
