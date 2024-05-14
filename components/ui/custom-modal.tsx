"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface CustomModalProps {
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openBtn: React.ReactNode;
  modalTitle: string;
}

const CustomModal = ({
  children,
  openModal,
  setOpenModal,
  openBtn,
  modalTitle,
}: CustomModalProps) => {
  const [mounted, setMounted] = useState(false);

  const mainVariants: Variants = {
    open: { visibility: "visible", opacity: 1 },
    close: { opacity: 0, transitionEnd: { visibility: "hidden" } },
  };

  const sectionVariants: Variants = {
    open: { scale: 1 },
    close: { scale: 0.95 },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="w-fit" onClick={() => setOpenModal(true)}>
        {openBtn}
      </div>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {openModal && (
              <motion.main
                animate="open"
                exit="close"
                initial="close"
                variants={mainVariants}
                transition={{ duration: 0.2 }}
                onClick={() => setOpenModal(false)}
                className="bg-black/50 z-50 fixed filter backdrop-blur-sm inset-0 h-screen w-screen grid place-content-center"
              >
                <motion.section
                  animate="open"
                  exit="close"
                  initial="close"
                  variants={sectionVariants}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-[90vw] flex flex-col md:w-[40vw] min-h-60 rounded-xl shadow-md bg-white overflow-hidden"
                >
                  <div className="w-full bg-secondary/50 font-semibold flex items-center justify-between relative">
                    <h3 className="p-3 text-primary font-normal">{modalTitle}</h3>
                    <IoIosCloseCircleOutline
                      onClick={() => setOpenModal(false)}
                      className="absolute top-3 right-3 text-2xl cursor-pointer text-primary hover:text-accent"
                    />
                  </div>
                  <div className="flex items-center justify-center flex-1">
                    {children}
                  </div>
                </motion.section>
              </motion.main>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default CustomModal;
