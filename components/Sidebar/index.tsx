import Link from "next/link";
import styles from "./SideBar.module.scss";
import useSWR from "swr";
import { fetcher } from "../../lib/utils";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ isOpen, setIsOpen }: Props) => {
  const { data } = useSWR("/api/categories", fetcher);
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
      {data?.data &&
        Array.isArray(data.data) &&
        data.data.map((category: any) => (
          <Link href={`/categories/${category.name}`} key={category.name}>
            <a
              className={styles.side_bar__li}
              onClick={close}
              tabIndex={isOpen ? 1 : -1}
            >
              {category.name}
            </a>
          </Link>
        ))}
    </nav>
  );
};

export default SideBar;
