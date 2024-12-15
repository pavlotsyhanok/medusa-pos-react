import CompanyImage from "./CompanyImage";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-85 overflow-hidden" />
        <div onLoad={() => setImageLoaded(true)}>
          <CompanyImage />
        </div>
      </div>
      <AnimatePresence>
        {imageLoaded && (
          <motion.div
            initial={{ opacity: 0, y: +20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative z-10 flex items-center justify-center h-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};