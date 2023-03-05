function isDark(color) {
  // TODO
  // Добавить поддержку сокращенного формата цвета (#fff)

  let luma;

  if (color) {
    color = color.substring(1); // strip #
    const rgb = parseInt(color, 16); // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff; // extract green
    const b = (rgb >> 0) & 0xff; // extract blue
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  }

  return luma < 200;
}

export {isDark};
