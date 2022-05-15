import { useState, useEffect } from "react";

const useInfiniteScroll = (elem, callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (elem && elem.current) {
      let element = elem.current;
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  function handleScroll() {
    if (
      elem.current.scrollHeight - elem.current.scrollTop !==
        elem.current.clientHeight ||
      isFetching
    )
      return;

    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
