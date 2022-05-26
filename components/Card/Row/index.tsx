import Link from "next/link";
import Image from "next/image";

import styles from "./RowCard.module.scss";
import { DEFAULT_THUMBNAIL_SOURCE } from "../../../lib/constants";
import { useEffect, useState } from "react";
import { formateDate } from "../../../lib/utils";

interface Props {
  thumbnailSrc?: string;
  time: string;
  slug: string;
  title: string;
  tags?: string[];
}

const mobileWidth = Number(styles.mobileWidth.split("px")[0]);

const RowCard = ({
  thumbnailSrc = DEFAULT_THUMBNAIL_SOURCE,
  time,
  title,
  tags = [],
  slug,
}: Props) => {
  const [thumbSize, setThumbSize] = useState<string>(styles.thumbnailSize);
  useEffect(() => {
    const onResize = () => {
      if (document.body.clientWidth <= mobileWidth) {
        setThumbSize(styles.mobileThumbnailSize);
      } else {
        setThumbSize(styles.thumbnailSize);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <div className={styles.row_card__wrapper}>
      <Link href={`/posts/${slug}`}>
        <a className={styles.row_card__thumbnail__wrapper}>
          <Image
            className={styles.row_card__thumbnail}
            src={thumbnailSrc}
            alt="thumbnail"
            width={thumbSize}
            height={thumbSize}
            layout="fixed"
            objectFit="cover"
          />
        </a>
      </Link>
      <div className={styles.row_card__tray}>
        <Link href={`/posts/${slug}`}>
          <a className={styles.row_card__tray__title} tabIndex={-1}>
            {title}
          </a>
        </Link>
        <div className={styles.row_card__tray__date}>{formateDate(time)}</div>
        <ul className={styles.row_card__tray__tag}>
          {tags?.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <a className={styles.row_card__tray__tag__li} tabIndex={-1}>
                # {tag}
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RowCard;
