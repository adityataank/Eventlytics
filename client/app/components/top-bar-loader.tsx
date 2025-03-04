import { useEffect, useState } from "react";
import { useNavigation } from "react-router";

const TopbarLoader = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId: number;

    const startProgress = () => {
      setProgress(5); // Start quickly
      const animate = () => {
        setProgress((prev) => (prev < 90 ? prev + Math.random() * 5 : prev));
        frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
    };

    const completeProgress = () => {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
      }, 300);
    };

    if (navigation.state === "loading") {
      startProgress();
    } else {
      completeProgress();
    }

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [navigation.state]);

  return (
    <div
      className="fixed top-0 left-0 h-1 w-full bg-blue-600 transition-all ease-out duration-300 z-50"
      style={{
        transform: `translateX(${progress - 100}%)`,
        opacity: progress ? 1 : 0,
      }}
    />
  );
};

export default TopbarLoader;
