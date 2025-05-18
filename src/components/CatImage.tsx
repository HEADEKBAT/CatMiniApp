import styles from "../styles/CatImage.module.css";

interface Props {
  url: string | null;
}

export const CatImage = ({ url }: Props) => {
  if (!url) return null;
  return <img className={styles.cat} src={url} alt="Cat" />;
};
