import styles from './style.module.css'; 

const Logo = () => {
    return(
        <h1 id="logo" className='text-center'>
            <span className={styles.blue}>S</span>
            <span className={styles.red}>e</span>
            <span className={styles.orange}>a</span>
            <span className={styles.blue}>r</span>
            <span className={styles.green}>c</span>
            <span className={styles.red}>h</span>
            <span className={styles.blue}>X</span>
        </h1>
    )
}

export default Logo;