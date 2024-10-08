import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

const ShareButton = ({ modalData }) => {
  const [isShareSupported, setIsShareSupported] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);
  const clipboardItemRef = useRef(null);

  const capitalizeFirstLetter = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  const name = capitalizeFirstLetter(Cookies.get("name"));
  const message = `${name}, we’ve found the perfect mascot to match`;

  const imageMapping = {
    Astro: "/Astro.png",
    Cat: "/Bobcat.png",
    Dog: "/Dog.png",
    Einstien: "/Einstien.png",
    Elephant: "/Ruth-Elephant.png",
  };

  useEffect(() => {
    // Check if Web Share API is supported when the component mounts
    setIsShareSupported(navigator.canShare && !!navigator.share);
    fetchImage();

    const handleOrientationChange = () => {
      // You can add any logic that should be executed when orientation changes
      fetchImage(); // Re-fetch the image in case of orientation change
    };

    // Add event listener for orientation change
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      // Clean up event listener
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  function getImg(imgName) {
    return imageMapping[imgName] || null;
  }

  // Function to download the image from the public folder and prepare it for sharing
  async function fetchImage() {
    const imgName = modalData[0]?.name;
    console.log(imgName, "imgName")

    if (!imgName) {
      console.error("Image name not found in modal data.");
      return;
    }

    const imageUrl = getImg(imgName);
    console.log(imageUrl, "imageURL")
    if (!imageUrl) {
      console.error("Image URL not found.");
      return;
    }

    try {
      const response = await fetch(imageUrl);
      console.log(response, "responseofimage")

      if (!response?.ok) {
        throw new Error(`Image not found at ${imageUrl}`);
      }

      const blob = await response?.blob();
      clipboardItemRef.current = blob;
      setIsImageReady(true);
    } catch (error) {
      console.error("Error fetching image:", error);
      alert(error);
    }
  }

  // Function to share the image
  async function copyAndSend() {
    if (!isImageReady || !clipboardItemRef.current) {
      console.error("No image blob available or image is not ready");
      alert("Image is not ready for sharing. Please try again.");
      return;
    }

    const title = modalData[0]?.title;

    const filesArray = [
      new File([clipboardItemRef.current], `${title}.jpg`, {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      }),
    ];

    const shareData = { files: filesArray, title: title };

    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        console.log("Image shared successfully!");
      } catch (error) {
        console.error("Sharing failed:", error);
        alert("Failed to share the image. Please try again.");
      }
    } else {
      console.error("Sharing is not supported for this data.");
      alert("Sharing is not supported on this device.");
    }
  }

  return (
    <div>
      {isShareSupported ? (
        <button
          style={{
            backgroundColor: "#1776E5",
            borderRadius: "5px",
            color: "white",
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 18px",
          }}
          onClick={copyAndSend}
          disabled={!isImageReady}
        >
          Share
        </button>
      ) : (
        <p>Sharing is not supported on this browser.</p>
      )}
    </div>
  );
};

export default ShareButton;