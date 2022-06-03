import Link from "next/link";
import styles from "./ColumnCard.module.scss";
import Image from "next/image";
import { DEFAULT_THUMBNAIL_SOURCE } from "../../../lib/constants";

interface Props {
  thumbnailSrc?: string;
  title: string;
  tags?: string[];
  slug: string;
}

const ColumnCard = ({
  thumbnailSrc = DEFAULT_THUMBNAIL_SOURCE,
  title,
  tags = [],
  slug,
}: Props) => {
  return (
    <div className={styles.column_card__wrapper}>
      <Link href={`/posts/${slug}`}>
        <a className={styles.column_card__thumbnail__wrapper}>
          <Image
            className={styles.column_card__thumbnail}
            src={thumbnailSrc}
            alt={title}
            width={styles.cardWidth}
            height={styles.cardWidth}
            objectFit="cover"
          />
        </a>
      </Link>
      <div className={styles.column_card__tray}>
        <Link href={`/posts/${slug}`}>
          <a className={styles.column_card__tray__title} tabIndex={-1}>
            {title}
          </a>
        </Link>
        <ul className={styles.column_card__tray__tag}>
          {tags?.map((tag, idx) => (
            <Link key={idx} href={`/tags/${tag}`}>
              <a tabIndex={-1} className={styles.column_card__tray__tag__li}>
                # {tag}
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ColumnCard;
