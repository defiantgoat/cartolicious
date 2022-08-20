const useQueryString = () => {

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  return [...searchParams];
};

export default useQueryString;
