const useSmoothScroll = () => {
  const smoothScroll = (id: string, delay: number) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, delay);
  };

  return smoothScroll;
};

export default useSmoothScroll;
