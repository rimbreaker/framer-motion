import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import Loader from './Loader';

const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.3,
      yoyo: Infinity
    }
  }
}

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1.5 }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
}

const Listitem = ({ title, setYeses }) => {
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-100, 100],
    ["rgba(4, 207, 49, 1)", "rgba(255, 0, 140, 1)"]
  )
  const switcher = useTransform(
    x,
    [-100, 0, 100],
    [-1, 0, 1]
  )
  const handleDrag = () => {

    console.log(background.get());
    switch (switcher.get()) {
      case 1:
        setYeses((prev) => {
          return prev.filter((yes) => yes !== title)
        })
        break;
      case -1:
        alert("lol");
        break;
      default:
        return
    }

  }
  return (
    <motion.li
      style={{ background, padding: 0, display: "flex" }}
    >delete
      <motion.div
        drag="x"
        dragElastic={0.7}
        dragConstraints={{ left: 0, right: 0 }}
        exit={{
          x: '100vw'
        }}
        transition={{ ease: 'easeInOut' }}
        style={{ x, width: "100%", position: 'absolute', left: 0 }}
        onTap={handleDrag}
      ><div
        style={{ background: "white", color: "black" }}>{title}</div></motion.div><div style={{ position: "absolute", right: 0 }}>edit</div></motion.li>
  )
}

const Home = () => {
  const [yeses, setYeses] = useState(["yep", "yup", "yipie"])
  return (
    <motion.div className="home container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2>Welcome to Pizza Joint</h2>
      <Link to="/base">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
        >
          Create Your Pizza
        </motion.button>
      </Link>

      <Loader />

      <ul style={{ position: "absolute", left: 0, width: "100%" }} ><AnimatePresence>
        {yeses.map((yes) => {
          return (
            <Listitem key={yes} title={yes} setYeses={setYeses} />
          )
        })}</AnimatePresence>
      </ul>
    </motion.div>
  )
}

export default Home;