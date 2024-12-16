import CompanyImage from "./CompanyImage";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden" />
        <div className="absolute inset-0" onLoad={() => setImageLoaded(true)}>
          <CompanyImage />
        </div>
      </div>
      <AnimatePresence>
        {imageLoaded && (
          <motion.div
            initial={{ opacity: 0, y: +20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative z-10 flex items-center justify-center h-full">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex gap-2 items-center absolute bottom-5 left-0 w-full justify-center text-white">
        <img
          src="/public/icons/Wordmark.svg"
          alt="Medusa POS"
          className="w-20 h-20 lg:w-24 lg:h-24"
        />
      </div>
    </div>
  );
};
