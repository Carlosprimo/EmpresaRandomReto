import styles from './styles.module.css'

export const LoadingView = () => {
  return (
    <div className="w-full h-full">
      <div className="fixed top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute top-0 left-0 w-8 h-8">
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
        </div>
      </div>
    </div>
  )
}
