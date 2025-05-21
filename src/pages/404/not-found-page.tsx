import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';
import './not-found.module.css';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <div className="not-found-buttons">
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={() => navigate('/')}>Home</button>
      </div>
    </div>
  );
};
