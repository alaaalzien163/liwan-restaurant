"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/images/Liwan-removebg-preview.png";
import { useEffect, useState } from "react";

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onFinish, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.0 }}
          className="bg-surface fixed inset-0 z-[100] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <Image src={logo} alt="Liwan" width={120} height={120} priority />
            <h1 className="text-primary-500 text-3xl font-bold">Liwan</h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
