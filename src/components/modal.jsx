import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { characterData } from "../utils/mock_data"; // Assuming this is your data source
import { Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ConfettiBackground } from "./ConfettiBackground";
import { EmailShare, WpShare } from "./share";


const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
    },
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};

export const Modal = ({ isModalOpen, handleCloseModal, selectedTag }) => {
  const [modalData, setModalData] = useState(null);
  const [playConfetti, setPlayConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  const handleDoItAgain = () => {
    setPlayConfetti(false); // Reset confetti animation
    setTimeout(() => {
      setPlayConfetti(true); // Trigger animation again after reset
    }, 100); // Small delay to ensure reset
  };
  const containerRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      setPlayConfetti(true); // Trigger confetti animation
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (selectedTag && selectedTag.length > 0) {
      // Collect IDs from selectedTag and filter data based on the IDs
      function getHighestFrequencyId(array) {
        // Step 1: Create a frequency map for the IDs
        const idFrequencyMap = array.reduce((acc, obj) => {
          const id = obj.id;
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {});

        // Step 2: Find the ID with the highest frequency
        const highestFrequencyId = Object.keys(idFrequencyMap)
          .map(Number) // Convert keys to numbers for comparison
          .reduce((highestId, currentId) => {
            // Compare frequencies
            if (idFrequencyMap[currentId] > (idFrequencyMap[highestId] || 0)) {
              return currentId;
            }
            return highestId;
          }, -1); // Initial value is -1

        return highestFrequencyId;
      }
      const data = getHighestFrequencyId(selectedTag);

      const filterData = characterData.filter((arr) => arr.id === data);
      setModalData(filterData);
    }
  }, [selectedTag]);

  return (
    <>
      {modalData && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-40 "
            style={{ backgroundColor: "rgba(242, 243, 243, 0.9)" }}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCloseModal}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex justify-center items-center"
          >
            <div
              className="bg-white rounded-lg shadow-lg relative"
              style={{
                width: "450px",
              }}
            >
              <div className="flex justify-end items-end w-full my-[10px] px-[10px]">
                <IconButton
                  onClick={handleCloseModal}
                  sx={{
                    backgroundColor: "#1776E5",
                    padding: "6px",
                    "&:hover": {
                      backgroundColor: "#1776E5", // Optional: Change color on hover
                    },
                  }}
                >
                  <CloseIcon sx={{ fill: "#ffffff", fontSize: "0.8rem" }} />
                </IconButton>
              </div>

              <div className="flex flex-col justify-center items-center text-center px-[18px] pb-[24px]">
                <div>
                  <h1
                    style={{
                      color: "#1776E5",
                      fontSize: "30px",
                      fontWeight: "bold",
                      margin: "0 0 4px 0"
                    }}
                  >
                    Congratulations
                  </h1>
                  <span className="text-[14px] text-[#17233A]">You’ve chosen your top traits, and we’ve found the perfect mascot to match</span>
                </div>

                <Grid
                  className="flex justify-center items-center relative z-10 py-[20px]"
                  ref={containerRef}
                >
                  <div className="animation z-[10]">
                    {playConfetti && (
                      <ConfettiBackground
                        key={confettiKey}
                        containerRef={containerRef}
                      />
                    )}
                  </div>

                  {modalData[0].position === "right" ?
                    <div className="z-[50] w-[180px] h-[180px] rounded-[50%] flex justify-center" style={{ backgroundColor: modalData[0].bgColor }}>
                      <div className="flex flex-col items-end relative left-[1.5rem] top-[2rem]">
                        <span className="text-[13px] font-medium">
                          Meet
                        </span>
                        <span className="text-[13px] font-medium leading-[10px]">
                          Your
                        </span>
                        <span className="text-[13px] font-medium">
                          Mascot
                        </span>

                        <span className="text-[20px] font-[900] ">{modalData[0].title.split(" ", 1).join('')}</span>
                        <p className="text-[14px] font-medium text-start leading-[4px]">
                          {modalData[0].title.split(" ").slice(1).join(" ")}
                        </p>
                      </div>
                      <div className="img relative left-[1.5rem]">
                        <img
                          src={modalData[0].image}
                          alt={modalData[0].title}
                          className="object-contain !w-[120px] !max-w-[120px]"
                        />
                      </div>
                    </div>
                    :
                    <div className="z-[50] w-[180px] h-[180px] rounded-[50%] flex justify-center" style={{ backgroundColor: modalData[0].bgColor }}>
                      <div className="img relative right-[1.5rem]">
                        <img
                          src={modalData[0].image}
                          alt={modalData[0].title}
                          className="object-contain !w-[120px] !max-w-[120px]"
                        />
                      </div>
                      <div className="flex flex-col items-start relative right-[1.5rem] top-[2rem]">
                        <span className="text-[13px] font-medium">
                          Meet
                        </span>
                        <span className="text-[13px] font-medium leading-[10px]">
                          Your
                        </span>
                        <span className="text-[13px] font-medium">
                          Mascot
                        </span>

                        <span className="text-[20px] font-[900] ">{modalData[0].title.split(" ", 1).join('')}</span>
                        <p className="text-[14px] font-medium text-start leading-[4px]">
                          {modalData[0].title.split(" ").slice(1).join(" ")}
                        </p>
                      </div>
                    </div>
                  }
                </Grid>
                
                <Grid className="flex gap-2 mt-4">
                  <button
                    onClick={handleDoItAgain}
                    style={{
                      backgroundColor: "#1776E5",
                      borderRadius: "5px",
                      color: "white",
                      fontSize: "14px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "4px 14px"

                    }}
                  >
                    Do it again
                  </button>

                  <WpShare modalData={modalData} />

                </Grid>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
