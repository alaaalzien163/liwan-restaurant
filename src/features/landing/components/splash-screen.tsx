"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logoImage from "@/assets/images/Liwan-removebg-preview.png";
import Image from "next/image";

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onFinish, 300);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="bg-surface fixed inset-0 z-50 flex items-center justify-center"
      animate={show ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-24 w-24">
          <Image
            src={logoImage}
            alt="Liwan"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        <motion.h1
          className="text-text-primary text-3xl font-bold tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 2.0 }}
        >
          Liwan
        </motion.h1>
      </div>
    </motion.div>
  );
}
