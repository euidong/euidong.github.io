import Link from "next/link";
import { formatIndex } from "../../lib/utils";
import styles from './TableOfContents.module.scss';

interface Props {
  indexes: string[]
}

const TableOfContents = ({ indexes }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['table-of-contents']}>
        <h2 className={styles.title}>목차</h2>
        {indexes?.map((index: string) => (
          <Link href={`#${formatIndex(index)}`} scroll={false} key={index} shallow={true} replace={true}>
            <a className={styles.index} onClick={() => setTimeout(() => window.scrollTo(0, window.scrollY + 1), 500)}>
              {`🔗 ${index}`}
            </a>
          </Link>
        ))}
      </div>
    </div>);
}

export default TableOfContents;