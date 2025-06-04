import { type FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './breadcrumbs.module.css';
import { type BreadcrumbsProps } from './breadcrumbs.types';
import { getItems } from './breadcrumbs-functions';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ categoryId, categoryTree, locale = 'en' }) => {
  const items = useMemo(() => getItems(categoryId, categoryTree, locale), [categoryId, categoryTree, locale]);

  if (items.length === 0) {
    console.log('No breadcrumbs available for this category');
    return null;
  }
  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.path} className={styles.breadcrumbItem}>
            {isLast ? (
              <span className={styles.current} aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.path} className={styles.link}>
                {item.label}
              </Link>
            )}
            {!isLast && <span className={styles.separator}>/</span>}
          </span>
        );
      })}
    </nav>
  );
};
