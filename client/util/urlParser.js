const parse = url => {
  if (url.slice(0, 4) === "http") {
    return url;
  } else {
    return "http://" + url;
  }
};

export default parse;
