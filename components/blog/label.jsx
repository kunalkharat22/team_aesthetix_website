import React from "react";
import styles from '../../styles/Blogs.module.scss'

export default function Label(props) {
  const color = {
    green: styles.labelGreen,
    blue: styles.labelBlue,
    orange: styles.labelOrange,
    purple: styles.labelPurple,
    pink: styles.labelPink
  }

  return (
    <span className={`${styles.label} ${color[props.color] || color.pink}`}>
      {props.children}
    </span>
  );
}