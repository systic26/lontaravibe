"use client";
import { useState, useEffect } from "react";

export function TypewriterText({ text, delay = 50, startDelay = 1000 }: { text: string, delay?: number, startDelay?: number }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setIsStarted(true), startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (isStarted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, isStarted, text]);

  return (
    <span className="font-semibold text-teal-700">
      {currentText}
      {isStarted && currentIndex < text.length ? (
        <span className="inline-block w-1.5 h-5 ml-0.5 bg-teal-500 animate-pulse relative top-1"></span>
      ) : (
        isStarted && <span className="inline-block w-1.5 h-5 ml-0.5 bg-transparent relative top-1"></span>
      )}
    </span>
  );
}
