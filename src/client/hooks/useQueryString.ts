interface CartoliciousQueryParams {
  curation?: string;
}

const useQueryString = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const params = [...searchParams];
  const paramsObj = {} as CartoliciousQueryParams;

  if (params.length > 0) {
    for (const paramSet of params) {
      const [key, value] = paramSet;
      paramsObj[key] = value;
    }
  }

  return paramsObj;
};

export default useQueryString;
