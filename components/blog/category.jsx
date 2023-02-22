import Link from "next/link";
import Label from './label';
import styles from '../../styles/Blogs.module.scss'


export default function CategoryLabel({ categories }) {

  // console.log('categories',categories);

  return (
    <div className={styles.categoryLabel}>
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          // <Link href="#" key={index}>
             <div key={index}>
              <Label color={category.color}>{category.title}</Label>
             </div>
          // </Link>
        ))}
    </div>
  );
}
