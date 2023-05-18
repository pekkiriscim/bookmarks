export const fetchLinkPreview = async (bookmark, setLinkPreview) => {
  const encodingReferance = {
    "%": "%25",
    "!": "%21",
    "*": "%2A",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    ";": "%3B",
    ":": "%3A",
    "@": "%40",
    "&": "%26",
    "=": "%3D",
    "+": "%2B",
    ",": "%2C",
    "/": "%2F",
    "?": "%3F",
    "#": "%23",
    "[": "%5B",
    "]": "%5D",
    $: "%24",
  };

  try {
    let encodedUrl = bookmark.url;

    Object.entries(encodingReferance).map(([character, replacement]) => {
      encodedUrl = encodedUrl.replaceAll(character, replacement);
    });

    const linkPreview = "https://rdl.ink/render/" + encodedUrl;

    const response = await fetch(linkPreview, {
      origin: "http://localhost:5173/",
    });

    if (response.status === 200) {
      const blob = await response.blob();

      setLinkPreview(URL.createObjectURL(blob));
    }
  } catch (error) {
    console.log(error);
  }
};
