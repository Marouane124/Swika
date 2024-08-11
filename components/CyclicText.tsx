import React, { useState, useEffect } from 'react';

const CyclicText: React.FC<{ texts: string[]; interval?: number }> = ({ texts, interval = 2000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(cycle);
  }, [texts, interval]);

  return <span>{texts[index]}</span>;
};

export default CyclicText;
