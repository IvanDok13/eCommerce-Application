import { type Category } from '@commercetools/platform-sdk';

export type CategoryTreeItem = Category & { children: CategoryTreeItem[] };
