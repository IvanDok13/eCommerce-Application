import React, { type FC, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './breadcrumbs.module.css';
import { type BreadcrumbsProps } from './breadcrumbs.types';
import { findPathById, getItems } from './breadcrumbs-functions';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ categoryId, categoryTree, locale = 'en' }) => {
  const navigate = useNavigate();

  const items = useMemo(() => getItems(categoryId, categoryTree, locale), [categoryId, categoryTree, locale]);

  const path = useMemo(() => findPathById(categoryId, categoryTree), [categoryId, categoryTree]);
  const currentCategory = path?.[path.length - 1] ?? null;
  const children = currentCategory?.children ?? [];

  if (items.length === 0) {
    console.log('No breadcrumbs available for this category');
    return null;
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedSlug = event.target.selectedOptions[0].dataset.slug;
    if (selectedSlug) {
      navigate(`/catalog/${selectedSlug}`);
    }
  };

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

      {/* Subcategories list */}
      <select className={styles.dropdown} onChange={handleSelectChange} disabled={children.length === 0} value="">
        <option value="" disabled>
          {children.length === 0 ? 'No more categories' : 'Select categories'}
        </option>
        {children.map(child => (
          <option key={child.id} value={child.id} data-slug={child.slug?.[locale] ?? child.slug?.['en-US'] ?? child.id}>
            {child.name?.[locale] ?? child.name?.['en-US'] ?? 'Unnamed'}
          </option>
        ))}
      </select>
    </nav>
  );
};
