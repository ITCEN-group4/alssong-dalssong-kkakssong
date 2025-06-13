import React from 'react';
import styles from './Footer.module.css';
import logo from "../../assets/footer_logo.svg";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>
                <img src={logo} alt="logo"/>
            </div>

            <div className={styles.members}>
                <div><p>mirageoasis</p><p>neokimhw0820@gmail.com</p></div>
                <div><p>eunalove</p><p>etroppe88@gmail.com</p></div>
                <div><p>PES113</p><p>dmsktd113@gmail.com</p></div>
                <div><p>happygirlll</p><p>lbm000314@gmail.com</p></div>
                <div><p>Baesukju</p><p>ssmm825@gmail.com</p></div>
                <div><p>Jordan0216</p><p>jordandan216@gmail.com</p></div>
            </div>

        </footer>


    );
}
