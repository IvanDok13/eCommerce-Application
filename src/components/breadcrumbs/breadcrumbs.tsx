import { type FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './breadcrumbs.module.css';
import { type BreadcrumbsProps } from './breadcrumbs.types';
import { findPathById, getItems } from './breadcrumbs-functions';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ categoryId, categoryTree, locale = 'en' }) => {
  const items = useMemo(() => getItems(categoryId, categoryTree, locale), [categoryId, categoryTree, locale]);

  if (items.length === 0) {
    console.log('No breadcrumbs available for this category');
    return null;
  }

  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <span key={item.path} className={styles.breadcrumbItem}>
          <Link to={item.path} className={styles.link}>
            {item.label}
          </Link>
          {index < items.length - 1 && <span className={styles.separator}>/</span>}
        </span>
      ))}
    </nav>
  );
};
