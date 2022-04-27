import Link from "next/link";
import styles from "./SideBar.module.scss";
import categoryJson from "../../public/exts/categories.json";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ isOpen, setIsOpen }: Props) => {
  const close = () => {
    setIsOpen(false);
  };
  return (
    <nav
      className={styles[`side_bar__wrapper${isOpen ? "--open" : "--close"}`]}
    >
      <Link href="/">
        <a
          onClick={close}
          className={styles.side_bar__li}
          tabIndex={isOpen ? 1 : -1}
        >
          Home
        </a>
      </Link>
      <Link href="/tags">
        <a
          className={styles.side_bar__li}
          onClick={close}
          tabIndex={isOpen ? 1 : -1}
        >
          Tags
        </a>
      </Link>
      {categoryJson.map((category: any) => (
        <Link href={`/categories/${category.name}`} key={category.name}>
          <a
            className={styles.side_bar__li}
            onClick={close}
            tabIndex={isOpen ? 1 : -1}
          >
            {category.name}
            <span className={styles.side_bar__li__cnt}>
              ({category.post_cnt})
            </span>
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default SideBar;
