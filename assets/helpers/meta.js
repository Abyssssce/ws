function setMeta(meta = null) {
  if (meta) {
    if (meta.description) {
      document.head.querySelector('meta[name="description"]').content = meta.description;
    }
    if (meta.keywords) {
      document.head.querySelector('meta[name="keywords"]').content = meta.keywords;
    }
    if (meta.og_title) {
      document.head.querySelector('[property="og:title"]').content = meta.og_title;
    }
    if (meta.og_description) {
      document.head.querySelector('[property="og:description"]').content = meta.og_description;
    }
    if (meta.og_image) {
      document.head.querySelector('[property="og:image"]').content = meta.og_image;
    }
    if (meta.title) {
      document.title = meta.title;
    }
  }
}

export {setMeta};
