import React from 'react';
import { blogPostsData } from '../data/blogPosts';

export const Blog: React.FC = () => {
  return (
    <div className="container mb-5">
      <div className="mb-4 mt-2 text-center">
        <h1 className="custom-title">Blog Mecánico Cuchau</h1>
        <p className="text-muted">Consejos, guías y tips para mantener tu motor rugiendo al máximo.</p>
      </div>

      <div className="row justify-content-center g-4 mt-2">
        {blogPostsData.map((post) => (
          <div className="col-md-6" key={post.id}>
            <div className="card h-100 border-0 shadow-sm product-card-hover">
              <img
                src={post.image}
                className="card-img-top"
                alt={post.title}
                style={{
                  height: '250px',
                  objectFit: 'contain',
                  padding: '20px',
                  backgroundColor: '#fff',
                }}
              />
              <div className="card-body p-4 d-flex flex-column">
                <p className="text-muted small mb-1">{post.category}</p>
                <h4 className="card-title fw-bold">{post.title}</h4>
                <p className="card-text text-muted flex-grow-1">{post.excerpt}</p>
                <p className="text-muted small mb-0">{post.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
